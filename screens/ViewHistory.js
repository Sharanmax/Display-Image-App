import { Observer } from 'mobx-react-lite';
import React,{useCallback} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { SeenDetailsStore } from '../store/SeenDetails';

const COLORS= ['#FF6663', '#7F95D1', '#A99985', '#6BA292', '#7E8987', '#631A86' ]


const CARD =({item, onPress})=> {
    const {image} = item;
    const fName= item.name.split('_')[0];
    const lName= item.name.split('_')[1] || '';
    const Name= fName +" "+lName;

    const bgColor= COLORS[item.id % 6];

    return(
        <View style={[styles.card,{backgroundColor: bgColor}]}>
            <View style={{flexDirection: "row", marginBottom: 30, justifyContent: "space-between"}}>
                <Image source={image} style={styles.icon} resizeMode='cover'/>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.btn}>
                    <Text style={styles.btnTxt}>Delete</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{Name}</Text>
        </View>
    )
}

const History=()=>{

  if(SeenDetailsStore.SeenList.length==0){
    <View style={styles.none}>
        <Text style={{color:"white", fontSize: 16}}>Nothing to Show</Text>
    </View>
  }

  const renderCard=useCallback(
    ({item})=><CARD item={item} onPress={()=>SeenDetailsStore.deleteSeen(item.id)}/>,
    []
)
  
  return(
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Observer>
        {()=>
          <FlatList
              data={SeenDetailsStore.SeenList}
              renderItem={renderCard}
              keyExtractor={item => item.id}
          />
        }
      </Observer>
    </ScrollView>
  )
}

const styles= StyleSheet.create({
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
    name: {
      color: "white",
      textTransform: "capitalize",
      fontSize: 20,
      fontWeight: "bold"
    },
    icon: {
      height: 80,
      width: 80,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: "white",
      backgroundColor: 'black'
    },
    btn: {
        height: 40,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 12,
        width: 110,
        alignItems: "center",
        justifyContent: "center"
    },
    btnTxt: {
        color: "black", 
        fontSize: 14, 
        fontWeight: "bold",
    },
    none: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
})

export default History;