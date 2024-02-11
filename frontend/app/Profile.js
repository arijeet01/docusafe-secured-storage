import React from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {images,COLORS} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, Stack } from 'expo-router';
import Restart from 'react-native-restart';
import { Updates } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


const ProfileScreen = () => {

    const router = useRouter();

    const handlePress = () =>{
        router.push('/EditProfile');
    }
    const [storedValue, setStoredValue] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [size, setSize] = useState(0);

    useEffect(() => {
        // Retrieve the stored value using the same key that you used to save it
        AsyncStorage.getItem('storedValue').then((value) => {
          setStoredValue(value);
        });
        AsyncStorage.getItem('lastName').then((value) => {
          setLastName(value);
        });
        AsyncStorage.getItem('mobile').then((value) => {
          setMobile(value);
        });
        AsyncStorage.getItem('email').then((value) => {
          setEmail(value);
        });
        AsyncStorage.getItem('noOfDocs').then((value) => {
          setSize(parseInt(value));
        });
      }, []);

      console.log(storedValue);
      console.log(lastName);
      console.log(mobile);
      console.log(email);

      const handleLogout = () => {
         router.push('')
      }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={require("../assets/images/avatar.png")}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{storedValue} {lastName}</Title>
            <Caption style={styles.caption}>@{storedValue.toLowerCase()}_{lastName.toLowerCase()}</Caption>
          </View>
          <Icon name="account-edit-outline" color="#777777" size={28} style={{
            marginLeft: 12,
            marginTop: 11
          }} onPress={handlePress}/>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Kolkata, India</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-{mobile}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{size}</Title>
            <Caption>Documents uploaded</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>29-03-2023</Title>
            <Caption>Recent upload</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color='#AD40AF' size={25}/>
            <Text style={styles.menuItemText}>Your Important Documents</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color='#AD40AF' size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color='#AD40AF' size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between'  }}>
        <TouchableOpacity style={styles.commandButton} onPress={handleLogout}>
          <Text style={styles.panelButtonTitle}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton2} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Login Details</Text>
        </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10, 
    backgroundColor: '#D21312',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 25,
    width: 170,
  },
  commandButton2: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#5D9C59',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 22,
    width: 170,
  },
});
