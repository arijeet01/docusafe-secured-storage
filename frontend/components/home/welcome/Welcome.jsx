import { React, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { icons, SIZES } from '../../../constants';
import styles from './welcome.style'

const jobTypes = ["All","Personal", "Government", "Education"]

const Welcome = ({ setActiveJobType, storedValue, handleSearchChange }) => {

  const router = useRouter();

  const [searchInput, setSearchInput] = useState("")
  const [activeJobTypeIndex, setActiveJobTypeIndex] = useState(0)

  const handleSearch = () => {
    setSearchInput(searchInput);
    handleSearchChange(searchInput);
  }
  
  const handleJobTypeSelect = async (index) => {
    setActiveJobType(jobTypes[index]);
    setActiveJobTypeIndex(index);
    // router.push(`/search/${jobTypes[index]}`);
   
  }
  // console.log(searchInput.toString());
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {storedValue}</Text>
        <Text style={styles.welcomeMessage}>Store and view your document</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchInput}
            onChangeText={(text) => {setSearchInput(text)
              handleSearchChange(text);
            }}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch} >
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.tab(activeJobTypeIndex, index)}
              onPress={() => handleJobTypeSelect(index)}
            >
              <Text style={styles.tabText(activeJobTypeIndex, index)}>{item}</Text>
            </TouchableOpacity>
          )}

          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>

    </View>

  )
}

export default Welcome;
