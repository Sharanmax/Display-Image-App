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

const screenWidth= Dimensions.get("window").width;
const INPUT_WIDTH= screenWidth-132

const CARD =({item})=> {
    const image = { uri: item["image_uri"] };
    const fName= item['file-name'].split('_')[0];
    const lName= item['file-name'].split('_')[1] || '';
    const Name= fName +" "+lName;

    return(
        <ImageBackground style={styles.card} source={image} key={item.id} resizeMode='cover'>
            <Text style={styles.name}>{Name}</Text>
        </ImageBackground>
    )
}

export const ListScreen= ()=>{
    const [items,setItem]= useState([]);
    const [isLoading, setIsLoading]= useState(true);
    const [id,setId]= useState('');

    useEffect(() => {
        getData();
    }, [id]);

    const getData = async () => {

        try {
          const response = await fetch(
            `https://acnhapi.com/v1a/fish/${id}`
          );
          const json = await response.json();
          console.log(json);
          setItem(json);
        } catch (error) {
          console.error(error);
        }
        finally{
            setIsLoading(false);
        }
    };

    
    const displayCards=(items)=>{
        if(items.length>=1){
            return(
                items.map((item)=> <CARD item={item}/>)
            )
        }
        else{
            return(
                <CARD item={items}/>
            )
        }
    }

    if(isLoading){
        return(
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#d1dede" />
            </View>
        )
    }


    return (
        <ScrollView style={{ paddingTop: 30}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16}}>
                <View style={styles.input}>
                    <TextInput
                        onChangeText={(text)=>setId(text)} 
                        value={id}
                        placeholder={`enter a id between 1 and ${items.length}`}
                        placeholderTextColor='black'
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>getData()}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
            {items && displayCards(items)}
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    card: {
        backgroundColor: "rgba(0,0,0,1)", 
        marginHorizontal: 16,
        height: 200, 
        borderRadius: 12, 
        marginBottom: 30,
        padding: 20,
        overflow: "hidden",
        shadowColor: '#a5a299',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 7
    },
    input: {
        height: 40,
        marginBottom: 30,
        borderRadius: 20,
        paddingLeft: 20,
        backgroundColor: "#ead2ac",
        width: INPUT_WIDTH
    },
    btn: {
        height: 40,
        backgroundColor: "#d1dede",
        padding: 10,
        marginLeft: 20,
        borderRadius: 20,
        width: 80,
        alignItems: "center"
    },
    name: {
        color: "white",
        textTransform: "capitalize",
        fontSize: 16,
        fontWeight: "bold"
    },
    loaderContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    }
})

