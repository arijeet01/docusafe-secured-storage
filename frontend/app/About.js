import React from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Card,
} from 'react-native-paper';
import {images,COLORS} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, Stack } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const About = () => {

    const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
            options={{
                headerShown:false}}
        />

        <Title style={[styles.title, {
          marginTop: 65,
          marginBottom: 10,
          textAlign: 'center',
          color: '#AD40AF',
        }]}>
          DocuSafe
        </Title>
        <Caption style={styles.below}>Secured Storage System</Caption>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={require("../assets/images/profile.jpg")}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>Arijeet Kumar Nayak</Title>
            <Caption style={styles.caption}>@arijeet_nayak</Caption>
          </View>
        </View>
        
      </View>

      <View style={{flexDirection: 'row'}}>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Kolkata, India</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-8825209748</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>arijeetnayak2912@gmail.com</Text>
        </View>
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleLinkedInPress()}>
          <Icon name="linkedin" type="font-awesome" color="#777777" size={25}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleFacebookPress()}>
          <Icon name="facebook" type="font-awesome" color="#777777" size={25}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleInstagramPress()}>
          <Icon name="instagram" type="font-awesome" color="#777777" size={25}/>
        </TouchableOpacity>
      </View>
      
      </View>
      
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 180
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  userInfoSection2: {
    paddingHorizontal: 30,
    marginBottom: 10,
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
  below: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 10,
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
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 55,
  },
  socialButton: {
    marginHorizontal: 10,
  },
});
