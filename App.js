import * as React from 'react';
import TransactionScreen from './screens/TransactionScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/Login'
import { createAppContainer,createSwitchNavigator} from 'react-navigation'; 
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image} from "react-native";


export default class App extends React.Component {
  render() {
    return (
        <AppContainer/>
    );
  }
}


var TabNavigator = createBottomTabNavigator({
  TransactionScreen:{screen:TransactionScreen},
  SearchScreen : {screen:SearchScreen}
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({})=>{
      const routeName = navigation.state.routeName

      if (routeName==="TransactionScreen"){
          return(
            <Image
            source = {require("./assets/book.png")}
            style={{width:30,height:30}}
            />
          )
      }else if(routeName==="SearchScreen"){
          return(
            <Image
            source = {require("./assets/searchingbook.png")}
            style={{width:30,height:30}}
            />
          )
      }
    }

  })
})

var AppNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  TabNavigator:{screen:TabNavigator}
})

const AppContainer = createAppContainer(AppNavigator)
