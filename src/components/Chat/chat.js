import React, { Component } from "react";

class ChatDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : true,
        };

    }

    componentWillMount() {
		this.initSocket()
    }
    
    initSocket = ()=>{
        console.log("start Init")
    }

    render() {
        const {isStart} = this.state
        return (
            <div className="container">
                {
                    !isStart ?	
                    <p> Yes isLogin == True </p>
                    :
                    <p> No isLogin == false </p>
                }
            </div>
          );

    
    }
}

export default ChatDashboard;