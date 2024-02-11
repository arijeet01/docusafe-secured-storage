import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import CheckBox from 'react-native-checkbox';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import RegistrationSVG from '../assets/images/misc/registration.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import { Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import axios from 'axios';
import { log } from 'react-native-reanimated';


const CustomCheckbox = ({ label, onPress }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onPress && onPress(!isChecked);
  };

  return (
    
   
    <TouchableOpacity style={styles.container} onPress={handleCheckboxChange}>
       <View style={{ flexDirection: 'row'}}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && (
          <Ionicons name="checkmark-outline" size={12} color="#fff" />
        )}
      </View>
      <Text>{label}</Text>
      </View>
    </TouchableOpacity>
    
  );
};


const RegisterScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const router = useRouter();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [user_mobile, setUserMobile] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [user_password, setUserPassword] = useState('');

  const handleRegister = async () => {
    const data = {
      input: {
        fname,
        lname,
        user_mobile,
        user_email,
        user_password,
      },
    };


    console.log(data);
    // make API call to register user using data
    const response = await axios.post('https://0857-103-114-225-177.ngrok-free.app/auth/user/signup', data)

    const responseJson = response.data
    // assume the response JSON has a "status" field indicating success or failure
    // const responseJson = {status: 'success'};
    console.log(responseJson);
    if (responseJson.status === 'success') {
      // registered successfully
      Alert.alert('Success', `Hi, ${fname}! You are registered successfully. You can Login now.`);
      router.push('login')
    } else {
      // registration failed
      Alert.alert('Error', `Failed to register : ${responseJson.msg}`);
    }
  };

  const handleCheckboxChange = (isChecked) => {
    // Handle checkbox change
  };


  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff',}}>
       <Stack.Screen
            options={{
                headerShown:false}}
        />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center', marginTop: 100}}>
        <Image
            source={require('../assets/images/register.png')}
            style={{
                transform: [{rotate: '-5deg'}], 
                 height: 180,
                width: 200
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}> */}
          {/* <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity> */}
        {/* </View>

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with email ...
        </Text> */}

        <View style={{
          flexDirection:'row', 
          alignItems:'center'
        }}>
        <View style={{
          width: 180,
          marginRight: 10
        }}>
        <InputField
          label={'First Name*'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={fname}
          onChangeText={text => setFname(text)}
        />
        </View>
        
        <View style={{
          width: 180
        }}>
        <InputField
          label={'Last Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={lname}
          onChangeText={text => setLname(text)}
        />
        </View>
        </View>
        {/* <InputField
          label={'Profile Image*'}
          icon={
            <MaterialIcons
              name="image"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType={Image}
        /> */}
        <InputField
          label={'Mobile*'}
          icon={
            <MaterialIcons
              name="phone"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={user_mobile}
          onChangeText={text => setUserMobile(text)}
          inputType={Number}
        />
        <InputField
          label={'Email ID*'}
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
          label={'Password*'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          value={user_password}
          onChangeText={text => setUserPassword(text)}
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

      <CustomCheckbox
        label="I hereby accept all the terms and conditions of Docusafe"
        onPress={handleCheckboxChange}
      />

        <CustomButton label={'Register'} onPress={handleRegister} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => router.push('login')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#666',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#AD40AF',
  },
});

export default RegisterScreen;