import { useRouter, Stack } from 'expo-router';
import React from 'react'
import { SafeAreaView, View,Image, Text, TouchableOpacity, LogBox } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const OnboardingScreen = ({navigation}) => {

  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
        <Stack.Screen
            options={{
                headerShown:false}}
        />
      <View style={{marginTop: 120}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#AD40AF',
          }}>
          DocuSafe
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 30, alignItems: 'center'}}>
       <Image source={require("../assets/images/docusafe.png")}
        //transform: [{rotate: '-15deg'}]
        style={{
          height: 80,
          width: 80
        }}
       />
      </View>
      <View style={{marginBottom: 0,  alignItems: 'center'}}>
      <Image source={require("../assets/images/icon.png")}
        //transform: [{rotate: '-15deg'}]
        style={{
          height: 250,
          width: 250
        }}
       />
      </View>
      <View style={{marginBottom: 180}}>
      <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#AD40AF',
          }}>
          Keep it Safe with DocuSafe!
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
      <Text
          style={{
            fontWeight: 'normal',
            fontSize: 15,
            color: '#00000070',
          }}>
          To continue with the app, please login/signup
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#AD40AF',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => router.push('login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Let's Login
        </Text>
        
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;