import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const screenWidth= Dimensions.get("window").width;
const INPUT_WIDTH= screenWidth-132

const SubmitBtn=({onPress})=>{
    return (
        <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
            <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>
    )
}

export const InputComponent=({onPress, max}) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log("data",data);
    onPress(data)
  };

  console.log('errors', errors);

  return (
    <View style={{height: 80}}>
      <View style={styles.topBar}>
            <View style={styles.input}>
            <Controller
              control={control}
              rules={{
              required: false,
              maxLength: 2,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{color: "black"}}
                  placeholder={`enter a id between 1 and ${max}`}
                  placeholderTextColor='black'
                  keyboardType='numeric'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="id"
              defaultValue=""
            />
            </View>
            <SubmitBtn onPress={handleSubmit(onSubmit)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginHorizontal: 16,
        marginTop: 10
    },
    submitTxt: {
        color: "white", 
        fontSize: 14, 
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#0e101c',
    },
    input: {
        height: 40,
        marginBottom: 30,
        borderRadius: 20,
        paddingLeft: 20,
        backgroundColor: "#EFF6EE",
        width: INPUT_WIDTH
    },
    submitBtn: {
      height: 40,
      backgroundColor: "#9197AE",
      padding: 10,
      marginLeft: 20,
      borderRadius: 20,
      width: 80,
      alignItems: "center"
    },
});
