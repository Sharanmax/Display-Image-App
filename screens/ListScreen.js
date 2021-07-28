import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  FlatList
} from 'react-native';
import LSLoader from './LoaderScreen'
import { useNavigation, DarkTheme } from '@react-navigation/native';
import { SeenDetailsStore } from '../store/SeenDetails';
import { observer } from 'mobx-react';
import {InputComponent} from '../components/InputComponent'


const screenWidth= Dimensions.get("window").width;
const INPUT_WIDTH= screenWidth-132

const COLORS= ['#FF6663', '#7F95D1', '#A99985', '#6BA292', '#7E8987', '#631A86' ]


const CARD =({item, onPress})=> {
    const image = { uri: item["icon_uri"] };
    const fName= item['file-name'].split('_')[0];
    const lName= item['file-name'].split('_')[1] || '';
    const Name= fName +" "+lName;

    const bgColor= COLORS[item['id'] % 6];

    return(
        <View style={[styles.card,{backgroundColor: bgColor}]}>
            <View style={{flexDirection: "row", marginBottom: 30, justifyContent: "space-between"}}>
                <Image source={image} style={styles.icon} resizeMode='cover'/>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.btn}>
                    <Text style={styles.btnTxt}>View Details</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{Name}</Text>
        </View>
    )
}


const ListScreen= observer(()=>{
    const [items,setItem]= useState([]);
    const [isLoading, setIsLoading]= useState(true);
    const [id,setId]= useState('');

    const navigation = useNavigation();

    useEffect(() => {
        getData();
    }, [id]);

    const updateData=(data)=>{
        setId(data.id)
    }

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

    const onViewDetails=(item)=>{
    
        SeenDetailsStore.addSeen({
            name: item['file-name'],
            image: { uri: item["icon_uri"] },
            id: item.id
        });
        navigation.navigate('Details',{item});
    }

    const renderCard=useCallback(
        ({item})=><CARD item={item} onPress={()=>onViewDetails(item)}/>,
        []
    )

    
    const displayCards=(items)=>{
        if(items.length>=1){
            return(
                <FlatList
                    data={items}
                    renderItem={renderCard}
                    keyExtractor={item => item.id}
                />
            )
        }
        else{
            return(
                <CARD item={items} onPress={()=>onViewDetails(items)}/>
            )
        }
    }

    if(isLoading){
        return(
            <LSLoader />
        )
    }


    return (
        <View style={{flex: 1}}>
            <InputComponent onPress={updateData} max={items.length}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                {items && displayCards(items)}
            </ScrollView>
        </View>
    )
})

export default ListScreen;

const styles= StyleSheet.create({
    card: {
        backgroundColor: "#DCB8CB", 
        marginHorizontal: 16,
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
    loaderContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
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
    }
})

