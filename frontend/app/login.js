import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { useRouter, Stack } from 'expo-router';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {

    const router = useRouter();

    const [user_email, setUserEmail] = useState('');
    const [user_password, setUserPassword] = useState('');
  
    const handleLogin = async () => {
      const data = {
        input: {
          user_email,
          user_password,
        },
      };
  
      // router.push('home')
      console.log(data);
      // make API call to register user using data
      const response = await axios.post('https://0857-103-114-225-177.ngrok-free.app/auth/user/signin', data)
  
      const responseJson = response.data
      // assume the response JSON has a "status" field indicating success or failure
      // const responseJson = {status: 'success'};
      // console.log(responseJson);
      if (responseJson.status === 'success') {
        // registered successfully
        Alert.alert('Success', `Hi, ${responseJson.first_name}! You are Logged in.`);
        console.log(responseJson);
        await AsyncStorage.setItem('storedValue', responseJson.first_name);
        await AsyncStorage.setItem('lastName', responseJson.last_name);
        await AsyncStorage.setItem('mobile', responseJson.mobile);
        await AsyncStorage.setItem('email', responseJson.email);
        await AsyncStorage.setItem('user', responseJson.user.toString());
        router.push('home')
      } else {
        // registration failed
        Alert.alert('Error', `Failed to Login : ${responseJson.msg}`);
      }
    };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center',  backgroundColor: '#fff'}}>
         <Stack.Screen
            options={{
                headerShown:false}}
        />
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/images/login.png')}
            style={{
                transform: [{rotate: '-5deg'}], 
                 height: 220,
                width: 200
            }}
          />
        </View>

        <Text
          style={{
            // fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
          value={user_email}
          onChangeText={text => setUserEmail(text)}
        />

<InputField
          label={'Password'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          fieldButtonLabel={"Forgot Password?"}
          fieldButtonFunction={() => {}}
          value={user_password}
          onChangeText={text => setUserPassword(text)}
        />
        
        <CustomButton label={"Login"} onPress={handleLogin} />

        {/* <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, login with ...
        </Text> */}

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}> */}
            {/* <GoogleSVG height={24} width={24} /> */}
          {/* </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}> */}
            {/* <FacebookSVG height={24} width={24} /> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" data-name="Ebene 1" viewBox="0 0 1024 1024"><path fill="#1877f2" d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"/><path fill="#fff" d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"/></svg> */}
          {/* </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}> */}
            {/* <TwitterSVG height={24} width={24} /> */}
          {/* </TouchableOpacity>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => router.push('register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;