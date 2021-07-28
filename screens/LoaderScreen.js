import React from 'react'
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {Dimensions, View, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width-32;
const windowHeight = Dimensions.get('window').height;

const CardLoader = () => (
    <ContentLoader width={windowWidth}
    height={200}
    viewBox={`0 0 ${windowWidth} 200`}
    backgroundColor="#f3f3f3" 
    foregroundColor="#ecebeb">
        <Circle cx={40} cy="40" r="40" />

        <Rect x={windowWidth-150} y="0" rx="20" ry="20" width='110' height="40" />  
        <Rect x='0' y="110" rx="3" ry="3" width='90' height="22" />  
    </ContentLoader>
)

  const InputLoader = () => (
    <ContentLoader width={windowWidth}
    height={80}
    viewBox={`0 0 ${windowWidth} 80`}
    backgroundColor="#f3f3f3" 
    foregroundColor="#ecebeb">

        <Rect x='0' y="10" rx="20" ry="20" width={windowWidth-100} height="40" />

        <Rect x={windowWidth-80} y="10" rx="20" ry="20" width='80' height="40" />  
          
    </ContentLoader>
  )

  export default LSLoader=()=>{
      return(
          <View style={{flex:1}}>
            <View style={{height: 80, paddingHorizontal: 16}}>
                <InputLoader />
            </View>
            <View style={styles.card}>
                <CardLoader />
            </View>
            <View style={[styles.card,{backgroundColor: "#A99985"}]}>
                <CardLoader />
            </View>
            <View style={[styles.card,{backgroundColor: "#6BA292"}]}>
                <CardLoader />
            </View>
          </View>
      )
  }

const styles= StyleSheet.create({
    card: {
        height: 200,
        padding: 20,
        marginHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#7F95D1",
        marginBottom: 30
    }
})