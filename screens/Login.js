import * as React from "react";
import {Text,View,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Image, TextInputBase, Alert} from "react-native";
export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId:"",
            password:""
        }
    }

    login=async(email,password)=>{
        if(email && password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate("Transaction")
                }
            }

            catch(error){
                switch(error.code){
                    case "auth/user-not-found":
                    Alert.alert("User does not exist");
                    break;
                    case "auth/invalid-email":
                        Alert.alert("Enter a Valid Email");
                        break;
                }
            }



        }
        else {
            Alert.alert("Enter Email and PassWord");
        }
    }

    render(){
        return(
            <KeyboardAvoidingView>
                <View>
                    <Image 
                        source={require('../assets/booklogo.jpg')}
                        style = {styles.image}/>
                    <Text style={styles.text}>Wily</Text>
                </View>

                <View>
                    <TextInput 
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.input}
                    onPress={(text)=>{
                        this.setState({
                            emailId:text,
                        })
                    }}
                    />
                </View>

                <View>
                    <TextInput 
                    placeholder="PassWord"
                    secureTextEntry={true}
                    style={styles.input}
                    onPress={(text)=>{
                        this.setState({
                            password:text,
                        })
                    }}
                    />
                </View>

            <TouchableOpacity style={styles.button} 
            onPress={()=>{
                this.login(this.state.emailId,this.state.password)
            }}>
                <Text>Login</Text>
            </TouchableOpacity>

            </KeyboardAvoidingView>
        )

    }
}

const styles = StyleSheet.create({
    image:{
        width:100,
        height:100,
        alignSelf:"center"
    },

    input:{
        marginTop:20,
        borderWidth:2,
        alignSelf:"center",
        width:250,
        height:50
    },

    button:{
        marginTop:20,
        borderWidth:2,
        borderRadius:20,
        alignSelf:"center",
        width:100,
        height:60
    },
    text:{
      marginLeft:170,
      fontSize:50
    }


})
