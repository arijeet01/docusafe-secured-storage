import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './alldocuments.style';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/alldocs/AllDocumentsCard';
import useFetch from '../../../hook/useFetch';
import data from '../../../data.json';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const AllDocuments = (activeJobType, searchInput) => {


  const router = useRouter();
  const [user, setUser]=useState('')
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          setUser(value);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
 
  console.log(user+" hi from all");
  const {data, isLoading, error} = useFetch(user);  
   
  // console.log(data.files[0].filename+"from all docs");
  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <Text style={styles.headerTitle}>Your Documents</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Scroll down to see all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
           <ActivityIndicator size="large" color={COLORS.primary} />
        ) :(
        // <Text>Hi got it</Text>
          <DelayedText data = {data}  activeJobType={activeJobType} searchInput={activeJobType.searchInput} user={user}/>
        )}
      </View>
    </View>
  )
}

export default AllDocuments;

const DelayedText = ({data, activeJobType, searchInput, user}) => {
  // Define a state variable to hold the job data and a flag for delay
const [jobData, setJobData] = useState(null);
const [isDelayed, setIsDelayed] = useState(true);
const [filteredJobs, setFilteredJobs] = useState(null);
 const [dataSize, setDataSize] = useState(0);

const handleCardPress = async (job) => {
  console.log("handleCardPress called with job:", job);
  console.log("comingggggg");
  try {
    const url = `https://0857-103-114-225-177.ngrok-free.app/download/${job.id}`;
    const fileUri = `${FileSystem.documentDirectory}${job.filename}`;

    const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);

    const { uri } = await downloadResumable.downloadAsync();

    console.log('File downloaded to:', uri);
    // WebBrowser.openBrowserAsync(uri);
    // console.log('File saved to media library');

    await Sharing.shareAsync(uri);
   
  } catch (error) {
    console.error(error);
  }
 };
// Load the job data and set a delay flag
useEffect(() => {
  // Load the job data here using axios or another fetch method
  // ...

  // Set a delay flag to hold off rendering for 5 seconds
  const delayTimeout = setTimeout(() => {
    setIsDelayed(false);
  }, 3000); // Change the delay time here

  // Update the job data in state
  
  setJobData(data);

  // Clear the delay timeout when the component unmounts
  return () => clearTimeout(delayTimeout);
}, [data]);

useEffect(() => {
  if (jobData) {
    const filteredByJobType = activeJobType.activeJobType === "All" ? jobData : jobData.filter(job => job.category === activeJobType.activeJobType);
    const filteredBySearchInput = searchInput ? filteredByJobType.filter(job => job.filename.toLowerCase().includes(searchInput.toLowerCase())) : filteredByJobType;
    const filteredByUser = filteredBySearchInput.filter(job => job.user === parseInt(user));
    // filteredBySearchInput.forEach(element => {
    //     console.log(element.user+" compare with "+parseInt(user));

    // });
    // console.log(filteredByUser);
      if (filteredByUser) {
        setDataSize(filteredByUser.length);
        AsyncStorage.setItem('noOfDocs', filteredByUser.length.toString());
      } 
    setFilteredJobs(filteredByUser);
  }
}, [jobData, activeJobType, searchInput, user]);
// console.log(jobData);
// console.log(filteredJobs);
// const filteredJobs = activeJobType==="All" ? jobData : jobData.filter(job => job.category===(activeJobType)) ;
// Render the NearbyJobCard components after the delay
return (
  <View style={styles.cardsContainer}>
    {isDelayed || !filteredJobs ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ) : (
    filteredJobs.map((job) => (
        <NearbyJobCard 
          job={job}
          key={`nearby-job-${job.id}`}
          handleCardPress={handleCardPress}
        />
      ))
    )}
  </View>
);

};