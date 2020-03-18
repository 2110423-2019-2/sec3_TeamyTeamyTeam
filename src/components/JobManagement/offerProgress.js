import React, { Component } from "react";
import Home from "../home";
import axios from "axios";

class OfferProgress extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : false
        }
    }

    runProgress = () => {
        
    }

    render(){
        if(this.state.redirect) return (<Home/>);
        else return(<p>running...</p>);
    }
}

export default OfferProgress;