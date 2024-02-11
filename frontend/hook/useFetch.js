import { useState, useEffect } from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = ({refreshData}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
url ='https://0857-103-114-225-177.ngrok-free.app//files';
// const [user, setUser] = useState('');
 
  console.log(refreshData+" refresh flag from useFetch");
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://0857-103-114-225-177.ngrok-free.app/files`);
        // console.log(response.data+" hi there ok from useFetch");
        // console.log(response); // log the entire response object
        // console.log(response.data); // log the response data
        // console.log(response.data.files); // log the files array
        // const filename = response.data.files[0].filename;
        // console.log(filename);
        setData(response.data.files);
        setLoading(false);
      } catch (error) {
        console.log(error+"hi there error from useFetch");
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshData]);

  // console.log(loading);
  // console.log(data.files[0].filename+"54654654");

  return { data, loading, error };
};

export default useFetch;
