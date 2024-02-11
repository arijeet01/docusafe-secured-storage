import React from 'react';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import * as ExpoFileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  TouchableOpacity, 
  Dimensions, 
  TouchableWithoutFeedback,
  PermissionsAndroid // add PermissionsAndroid import
} from 'react-native';
import { Platform } from 'react-native';
import { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 292;

const AddDocuments = ({changeModalVisibility , handleRefreshData}) =>{

  
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [blob, setBlob] = useState();
  const [flag, setFlag] = useState("false");
  const [refreshData, setRefreshData] = useState(false);
  // console.log(flag+"112");
// const fileToByteArray = async (fileUri) => {
//   let response = await fetch(fileUri);
//   let blob = await response.blob();

//   return new Promise((resolve, reject) => {
//     let reader = new FileReader();
//     reader.onload = () => {
//       resolve(reader.result);
//     };
//     reader.onerror = reject;
//     if (Platform.OS === 'android') {
//       reader.readAsArrayBuffer(blob);
//     } else {
//       reader.readAsBinaryString(blob);
//     }
//   });
// };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setSelectedFile(result);
      } else {
        setSelectedFile(null);
      }
    } catch (err) {
      console.log('Error occurred:', err);
    }
  };

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

  // console.log(user+" : user id comingggggg");
  const handleSave = async () => {
    try {
      const file = selectedFile;
      setFlag("true");
      await AsyncStorage.setItem('flag', "true");
      // Download the file as a Blob
      // console.log(file);
      // console.log(blob);
  
      // // Convert the Blob to a byte array
      // const byteContent = await FileSystem.readAsStringAsync(blob.uri, { encoding: 'base64' });
      // const byteArray = Uint8Array.from(atob(byteContent), (c) => c.charCodeAt(0));
      // console.log(byteArray);
      // console.log();
      // const formData = new FormData();
      // formData.append('file', {
      //   uri: file.uri,
      //   name: file.name,
      //   type: file.type,
      //   data: byteArray,
      // });
      // console.log(blob);
      const data = {
          name, 
          category,
          user
      }
      console.log(data);
      changeModalVisibility(false);
      const response = await axios.post("https://0857-103-114-225-177.ngrok-free.app/uploadfake", data);
      console.log(response);
      handleRefreshData(!refreshData);
      console.log(refreshData+ " flag from add");
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setName("");
    setCategory("");
    changeModalVisibility(false);
  };

  return (
    <TouchableOpacity
      disabled={true}
      style={styles.container}
    >
      <View style={styles.modal}>
        <View style={{
          marginTop: 10,
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'  }}>
          <Text style={{
            fontWeight: 'bold',
            borderRadius:10,
            width: 200,
            height: 30,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: 'purple',
            fontSize: 20
          }}>Add Document</Text>
          <TouchableOpacity onPress={handleCancel}>
                <View style={{
                 height: 30,
                 width: 30,
                 backgroundColor: '#AD40AF',
                 borderRadius: 10
               }}>
                 <Text style={{
                   marginTop: 6,
                   textAlign: 'center',
                   textAlignVertical: 'center',
                   color: 'white',
                     fontSize: 15,
                   }}>X</Text>
                </View>
              </TouchableOpacity>
              </View>
          <View style={{
            marginTop:20,
            width: 300,
          }}>
            <TextInput 
              placeholder="Name of your document" 
              style={{
                fontSize: 20,
                marginBottom: 10
              }}
              value={name}
              onChangeText={setName}
            />
            <TextInput 
              placeholder="Category" 
              style={{
                fontSize: 20,
                marginBottom: 10
              }}
              value={category}
              onChangeText={setCategory}
            />
            <TouchableOpacity onPress={pickDocument}>
              <View style={{
                height: 40,
                backgroundColor: '#AD40AF',
                alignItems:'center',
                borderRadius: 10,
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10
              }}>
                <Text style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 15,
                }}>Select Document</Text>
              </View>
            </TouchableOpacity>
            {selectedFile &&
              <Text style={{
                fontSize: 12,
                color: 'red',
                marginBottom: 4,
                marginTop: 4
                }}>
                Selected file: {selectedFile.name}
              </Text>
            }
           
            <TouchableOpacity
              onPress={handleSave}
            >
              <View style={{
                height: 40,
                marginTop: 12,
                backgroundColor: '#AD40AF',
                alignItems:'center',
                borderRadius: 10
              }}>
                <Text style={{
                  marginTop: 10,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: 'white',
                    fontSize: 15,
                  }}
                >
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH - 80,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});