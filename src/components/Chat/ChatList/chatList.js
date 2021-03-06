import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationsActive';
import "../../../stylesheets/chat.css";

class ChatListComponent extends React.Component {

  render() {

    const { classes } = this.props;
    console.log("Chat list",this.props.chats.length )
    console.log("Chat list *this.props.chats*",this.props.chats)
    if(this.props.chats.length > 0) {
      return(
        <div className="root">
            <Button variant="contained" 
              fullWidth 
              color='primary' 
              onClick={this.newChat} 
              className="newChatBtn">
                New Message
            </Button>
            <List>
              {
                this.props.chats.map((_chat, _index) => {
                  console.log("_chat.message*s",_chat.messages)
                  console.log("_chat.message*",_chat.messages[0])
                  console.log("_index",_index)
                  return (
                    <div key={_index}>
                      <ListItem onClick={() => this.selectChat(_index)} 
                        className="listItem" 
                        selected={this.props.selectedChatIndex === _index} 
                        alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp">{_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                
                                  {_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}
                              </Typography>
                            </React.Fragment>
                          }/>
                          {
                            _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
                            <ListItemIcon><NotificationImportant className="unreadMessage"></NotificationImportant></ListItemIcon> :
                            null
                          }
                      </ListItem>
                      <Divider/>
                    </div>
                  )
                })
              }
            </List>
        </div>
      );
    } else {
      return(
        <div className="root">
          <Button variant="contained" 
            fullWidth 
            color='primary' 
            onClick={this.newChat} 
            className="newChatBtn">
              New Message
          </Button>
          <List></List>
        </div>
      );
    }
  }
  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
}

export default ChatListComponent;













// import React from 'react';
// import './chatList.css';

// class ChatListComponent extends React.Component {
//   render() {
//     if(this.props.chats.length > 0) {
//       return(
//         <div className='chat-list-container'>
//           <button onClick={this.newChat} className='add-new-chat-button'>New Message</button>
//           {
//             this.props.chats.map((_chat, _index) => {
//               return (
//                 <div onClick={() => this.selectChat(_index)} key={_index} className={`individual-chat-container ${this.props.selectedChatIndex === _index ? 'selected-chat' : ''}`}>
//                   <h5>{_chat.users.filter(_user => _user !== this.props.userEmail)[0]}</h5>
//                   <p>{_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}</p>
//                 </div>
//               )
//             })
//           }
//         </div>
//       );
//     } else {
//       return(
//         <div className='chat-list-container'>
//           <button onClick={this.newChat} className='add-new-chat-button'>New Message</button>
//         </div>
//       );
//     }
//   }
//   newChat = () => this.props.newChatBtnFn();
//   selectChat = (index) => this.props.selectChatFn(index);
// }

// export default ChatListComponent;