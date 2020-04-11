import React, { Component } from "react";
import firebase from '../../firebase'
import Dashboard from "./Chatdashboard/dashboard" ;
require('firebase/auth')

class ChatDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : true,
            email : localStorage.email,
            password: localStorage.email
        };

    }

    componentDidMount() {
        console.log(this.state.email)
        console.log(this.state.password)
        this.createChat()

    }
    
    createChat = ()=>{
        console.log("start Init")
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
         console.log("yes chat run")
        }, err => {
          this.setState({ isLogin: false });
          console.log('Error logging in: ', err);
        });

        
    }

    render() {
        if(this.state.isLogin)
        return <Dashboard user={this.state.email}></Dashboard>
        else
        return <p> No isLogin == false </p>
    }
    
}

export default ChatDashboard;