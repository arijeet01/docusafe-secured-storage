import { useState, useEffect, useLayoutEffect } from 'react';
import {View, Text, ScrollView, SafeAreaView, AppState, Button, useWindowDimensions  } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {COLORS, icons, images, SIZES} from '../constants';
import {AllDocuments, RecentDocuments, ScreenHeaderBtn, Welcome} from '../components'
import styles from '../components/common/header/screenheader.style';
import {FAB} from 'react-native-elements';
import {Ionicons} from "@expo/vector-icons";
import { Modal } from 'react-native-paper';
import AddDocuments from './AddDocument';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';



const Home = ( ) => {
     
    const router = useRouter();
    const [isModalVisible, setModalVisible] = useState(false);
    const [activeJobType, setActiveJobType] = useState("All");
    const [storedValue, setStoredValue] = useState('');
    const [searchInputHome, setSearchInputHome] = useState("");
    const [ refreshData, setRefreshData ] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    const [key, setKey] = useState(0);
  const windowDimensions = useWindowDimensions();

    useEffect(() => {
      const handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // App has come to the foreground, perform reload here
          reloadPage();
        }
        setAppState(nextAppState);
      };
  
      AppState.addEventListener('change', handleAppStateChange);
  
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    }, []);

    useEffect(() => {
        // Retrieve the stored value using the same key that you used to save it
        AsyncStorage.getItem('storedValue').then((value) => {
          setStoredValue(value);
        });
      }, []);

    console.log(storedValue);      
    const handleJobTypeChange = async (jobType) => {
      setActiveJobType(jobType);
      await AsyncStorage.setItem('activeJob', jobType);
      // Do something with the active job type
    };

    const handleSearchChange=  (search) =>{
        console.log(search+"data searching++++++++");
        setSearchInputHome(search)
    };
    // console.log(searchInputHome+"5445");
    const changeModalVisibility = (bool) => {
       // console.log(bool+"8888888888888888888888888");
        setModalVisible(bool);
    }

    const handleRefreshData = (bool) => {
        console.log(bool+" flag from home");
        setKey((prevKey) => prevKey + 1);
        setRefreshData(bool);
    }
//     const reloadPage = () => {
//     // Reload the entire page or perform any necessary actions
//     setKey((prevKey) => prevKey + 1);
//   };
    
    const handlePress = () =>{
        router.push('/Profile');
    }
    const handlePressMenu = () =>{
        router.push('/About');
    }

    return (
       
       <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}} key={key}>
        
        <Stack.Screen
            options={{ 
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl = {icons.menu} dimension="75%" handlePress={handlePressMenu}/>
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" handlePress={handlePress}/>
                ),
                headerTitle: ""
            }}
            
        />
    
            <ScrollView showsVerticalScrollIndicator={false}>
                <View 
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >

                    <Welcome 
                        setActiveJobType={handleJobTypeChange} 
                        storedValue={storedValue}
                        handleSearchChange={handleSearchChange}
                    />
                    {/* <Button title="Refresh" onPress={reloadPage} /> */}
                    <RecentDocuments activeJobType={activeJobType} searchInput={searchInputHome} refreshData={refreshData}/>
                    <AllDocuments activeJobType={activeJobType} searchInput={searchInputHome}/>
                </View>
               
            </ScrollView>
            
             <FAB placement="right" size="large" icon={<Ionicons name="add-circle" size={24} color='white'/>} 
                buttonStyle={{
                    backgroundColor: '#AD40AF',
                    width: 75,
                    height: 75,
                    borderRadius: 48,
                }}
                style={styles.TouchableOpacityStyle}
                onPress={()=> changeModalVisibility(true)}
             ></FAB>
             <Modal
                transparent={true} 
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={()=> changeModalVisibility(true)}
                 >
                    <AddDocuments changeModalVisibility={changeModalVisibility} handleRefreshData={handleRefreshData}></AddDocuments>
                 </Modal>
       </SafeAreaView>
       
    )
}

export default Home;