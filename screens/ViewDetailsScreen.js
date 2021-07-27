import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions
} from 'react-native';

export const ViewDetails=({ route, navigation })=>{
  
  const {item}= route.params;
  const image = { uri: item["image_uri"] };

  const fName= item['file-name'].split('_')[0];
  const lName= item['file-name'].split('_')[1] || '';
  const Name= fName +" "+lName;

  return(
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.card}>
      </ImageBackground>
      <View style={{flexDirection: "row",}}>
        <Text style={styles.headingTxt}>Name :</Text>
        <Text style={styles.name}>{Name}</Text>
      </View>
      <Text style={styles.headingTxt}>Description :</Text>
      <Text style={styles.descriptionTxt}>{item["museum-phrase"]}</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  name: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    marginHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#DCB8CB", 
    height: 200, 
    borderRadius: 16, 
    marginBottom: 30,
    padding: 20,
  },
  headingTxt: {
    color: "#8A8D91",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 20,
    marginBottom: 15
  },
  descriptionTxt:{
    color: "white",
    fontSize: 14,
    lineHeight: 16
  }
})