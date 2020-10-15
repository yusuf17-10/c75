import  React from  'react';
import {View,Text,FlatList,TextInput,StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import db from "../config";

export default class SearchScreen extends React.Component{
    
    constructor(){
        super();
        this.state={
            allTransactions:[],
            lastVisibleTransaction:null,
            search:""

        }
    }
    componentDidMount=async()=>{
        var query = await db.collection("transaction").get();
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()],
                lastVisibleTransaction:doc
            });
        })
    }

    searchTransactions=async(text)=>{
        var enteredText=text.split("")
        var text=text.toUpperCase();
        if(enteredText[0].toUpperCase()==="B"){
            const transaction=await db.collection("transactions").where("bookId","==",text).get();
            transaction.docs.map((doc)=>{

                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })

            })
        }
        else if(enteredText[0].toUpperCase()==="S"){
            const transaction=await db.collection("transactions").where("studentId","==",text).get();
            transaction.docs.map((doc)=>{

                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })

            })
        }
    }

        fetchMoreTransactions=async()=>{
            var text =this.state.search.toUpperCase();
            var enteredText=text.split("");
            if(enteredText[0].toUpperCase()==="B"){
                const query =await db.collection("transactions").where("bookId","==",text).startAfter(this.state.visibleTransaction).limit(10).get()
                query.docs.map((doc)=>{
    
                    this.setState({
                        allTransactions:[...this.state.allTransactions,doc.data()],
                        lastVisibleTransaction:doc
                    })
    
                })
            }
            else if(enteredText[0].toUpperCase()==="S"){
                const query=await db.collection("transactions").where("studentId","==",text).startAfter(this.state.visibleTransaction).limit(10).get()
                query.docs.map((doc)=>{
    
                    this.setState({
                        allTransactions:[...this.state.allTransactions,doc.data()],
                        lastVisibleTransaction:doc
                    })
    
                })
            }
        }
    render(){
        return(
            <View>
            <View>
                <TextInput placeholder="Enter A Book iD OR Student ID"
                
                onChangeText={text=>{this.setState({
                    search:text
                })}}/>
                
                <TouchableOpacity
                onPress={()=>{
                    this.searchTransactions(this.state.search)

                }}
                >
                    <Text>Search Inbetween</Text>
                </TouchableOpacity>
            </View>

        <FlatList
            data = {this.state.allTransactions}
            renderItem={({item})=>(
                <View>
                    <Text>{"BookId: "+item.BookId}</Text>
                    <Text>{"StudentId :"+item.StudentId}</Text>
                    <Text>{"TransactionType :"+item.TransactionId}</Text>
                    <Text>{"date :"+item.date.toDate()}</Text>
                </View>
            )}
            keyExtractor={(item,index)=>index.toString()}
            onEndReached={this.fetchMoreTransactions}
            onEndReachedThreshold={0.7}
        />
        </View>
        )
    }
}