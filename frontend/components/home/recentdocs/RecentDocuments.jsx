import {React, useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import styles from './recentdocuments.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/recentdocs/RecentDocumentsCard';
import useFetch from '../../../hook/useFetch';
import data from '../../../data.json';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import * as mime from 'react-native-mime-types';
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const RecentDocuments = ({refreshData}) => {

  const router = useRouter();
 
  const [flag, setFlag] = useState('false');
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

  console.log(refreshData+" flag from recent");
  const [delayedData, setDelayedData] = useState(null);
  const {data, isLoading, error} = useFetch(refreshData);

  
//  console.log(data+"----------------");
 const [selectedJob, setSelectedJob] = useState();
 

  //  console.log(user+"hi from recent");

 const handleCardPress = async (item) => {
  // console.log("comingggggg");
  try {
    const url = `https://0857-103-114-225-177.ngrok-free.app/download/${item.id}`;
    const fileUri = `${FileSystem.documentDirectory}${item.filename}`;

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
 
 useEffect(() => {
  const timer = setTimeout(() => {
    const dataSend = data?.filter(job => job.user === parseInt(user)).reverse()
    setDelayedData(dataSend);
  }, 3000);
  return () => clearTimeout(timer);
}, [data]);


// useEffect(() => {
//   const filteredByUser = ;
//   // Use the filteredByUser array for further processing or rendering
//   setDelayedData(filteredByUser)
// }, [user]);


 return (
   <View style={styles.container}>
     <View style={styles.header}> 
       <Text style={styles.headerTitle}>Recently Added</Text>
       <TouchableOpacity>
         <Text style={styles.headerBtn}>Slide to See all</Text>
       </TouchableOpacity>
     </View>

     <View style={styles.cardsContainer}>
       {isLoading || !delayedData ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
       ) 
       // : error ? (
       //   <Text>Something went wrong</Text>
       // )
       :(
         <FlatList
           data={delayedData}
           renderItem={({item})=>(
             <PopularJobCard 
               item={item}
               selectedJob={selectedJob}
               handleCardPress={handleCardPress}
             />
           )}
           keyExtractor={item => item?.id}
           contentContainerStyle={{columnGap:SIZES.medium}}
           horizontal
         />
       )}
     </View>
   </View>
 )
}

export default RecentDocuments;