import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './alldocumentscard.style';
import { checkImageURL } from '../../../../utils';

const NearbyJobCard = ({job, handleCardPress }) => {
  // console.log(job[0].filename+"saudhahsj");
  
  return (
    <TouchableOpacity style={styles.container}  onPress={()=> handleCardPress(job)}>
      <TouchableOpacity style={styles.logoContainer} >
        <Image 
          source={{uri: 
            // checkImageURL("data:image/jpeg;base64,"+job.filecoverimage)
            // ? 
            "data:image/jpeg;base64,"+job.filecoverimage 
            // :
            // "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
          />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.filename}
        </Text>
        <Text style={styles.jobType}>{job.category}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard;