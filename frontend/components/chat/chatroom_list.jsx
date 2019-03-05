import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Cable from 'actioncable';

class ChatroomList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchChatrooms(this.props.currentUser.id)
        .then(chatrooms => this.subscribeToAllChats());
    }

    componentDidUpdate(previousProps) {
    }


    subscribeToAllChats() {
        this.props.chatrooms.forEach( chatroom => {
            this.createSocket(chatroom.id);
        });
    }

    unsubscribe(chatroom){
        // debugger
        this.props.unsubscribeFromChatroom(chatroom);
    }


    createSocket(chatroomId) {
        let cable;
        if (process.env.NODE_ENV !== 'production') {
            cable = Cable.createConsumer('http://localhost:3000/cable');
        } else {
            cable = Cable.createConsumer('wss://get-hype-chat.herokuapp.com/cable');
        }
        this.chats = cable.subscriptions.create(
            {   channel: 
                    'MessagesChannel',
                room: 
                    chatroomId
            },  
            {   connected: () => { console.log(`Connected to channel ${chatroomId}`); },
                disconnected: () => { console.log(`Disconnected to channel ${chatroomId}`); },
                received: message => {
                    if (message.deleted){
                        this.props.removeMessage(message.id);
                    } else {
                    this.props.receiveMessage(message);
                    if (!("Notification" in window)) {
                    } else if (Notification.permission === "granted") {
                        // debugger
                        let notification = new Notification(`${message.author_name}: ${message.body}`);
                    } else if (Notification.permission !== "denied") {
                        Notification.requestPermission().then(function (permission) {
                            if (permission === "granted") {
                                let notification = new Notification(`${message.body}`);
                          }
                        });
                      }
                    }},
                create: function(message) {
                    this.perform(
                        'create', { 
                        body: message.body,
                        author_id: message.author_id,
                        chatroom_id: message.chatroom_id,
                        parent_id: message.parent_id,
                        }
                    );
                    }
            }
        );
    }


        
    render () {

        let channels = [];
        let directMessages = [];
        
        this.props.chatrooms.forEach( chatroom => {
            if (chatroom.chatroom_type === 'channel'){
                channels.push(chatroom);
            } else if (chatroom.chatroom_type === 'direct_message'){
                directMessages.push(chatroom);
            };
        });
        
        let channelList;
        let directMessageList;

        if (channels){
            channelList = (
            <>
                <div className="chatroom-category chatroom-channels"><h3> Channels </h3></div>
                <ul>
                    { channels.map( chatroom => (
                        <NavLink key={chatroom.id} to={`/chatrooms/${chatroom.id}`} className="active-chatroom">
                            <li className="chatroom-name chatroom-channel-names flex">
                            <div>
                                #  { chatroom.title.replace(/\s+/g, '-').toLowerCase() }
                            </div>
                            <div>
                                    <i className="message-icons far fa-times-circle"></i>
                                </div>
                            </li>
                        </NavLink>
                    ))
                    }
                </ul>
            </>
            );
        }
        if (directMessages){
            directMessageList = (
            <>
                <div className="chatroom-category chatroom-direct-messages flex">
                    <h3> Direct Messages </h3>
                            <i className="fas fa-plus" onClick={ this.props.openDirectMessageModal } ></i>
                    </div>
                <ul>
                { directMessages.map( chatroom => (
                    <NavLink key={chatroom.id} to={`/chatrooms/${chatroom.id}`} className="active-chatroom">
                            <li className="chatroom-name">
                                    ◦ { chatroom.users.join(", ") }
                                    <i className="message-icons far fa-times-circle" onClick={ () => this.unsubscribe(chatroom) }></i>
                            </li>
                    </NavLink>
                    ))
                }
                </ul>
            </>
            );
        }

        return (
                <div className="chatroom-skeleton flex">
                <div className="chatroom-all-threads">  
                    <div className="chatroom-category chatroom-jump-to flex">
                        <i className=" fas fa-search"></i><h3> Jump To... </h3>
                    </div>
                    <div className="chatroom-category chatroom-all-threads-text flex"><i className="far fa-comment-alt"></i><h3> All Threads </h3></div>
                    { channelList }
                    <div className="add-channel-button">
                        <div className="chatroom-category add-channel-button flex" onClick={ this.props.openChannelModal } ><h3>+ Add a channel </h3></div>
                    </div>
                    { directMessageList }
                </div> 
            </div>
        )
    }
}


export default withRouter(ChatroomList);