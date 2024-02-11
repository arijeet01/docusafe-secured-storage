import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './recentdocumentscard.style';
import { checkImageURL } from '../../../../utils';

const PopularJobCard = ({item, selectedJob, handleCardPress}) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={()=> handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)} >
        <Image 
          source={{uri: 
            // checkImageURL("data:image/jpeg;base64,"+job.filecoverimage)
            // ? 
            "data:image/jpeg;base64,"+item.filecoverimage 
            // :
            // "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
          />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1} >{item.filename.split('.').pop().toUpperCase()}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob,item)} numberOfLines={1}>
          {item.filename}
        </Text>
        <Text style={styles.location}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard