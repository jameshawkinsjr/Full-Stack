import React from 'react';
import { Link } from 'react-router-dom';

class ChatroomHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        let chatroomTitle = "";
        let userList = "";
        let numUsers = 0;
        let topic = "";
        let chatroomId = 1;
        if ( this.props.currentChatroom ) {
            userList = this.props.currentChatroom.users.join(", ");
            numUsers = this.props.currentChatroom.users.length+1;
            topic = this.props.currentChatroom.topic;
            chatroomId = this.props.currentChatroom.id;
            if (this.props.currentChatroom.chatroom_type == 'channel') {
                chatroomTitle = `#${this.props.currentChatroom.title.replace(/\s+/g, '-').toLowerCase()}`;
            } else {
                chatroomTitle = userList;
        }}


        return (
            <div className="chatroom-header flex">
            <div className="chatroom-header-left flex">
            <Link to={`/chatrooms/${chatroomId}/details`}>{ chatroomTitle }</Link>
                <div className="chatroom-header-left-subcolumn flex">
                    <i className="far fa-star"></i>
                    <pre>  |  </pre>
                    <i className="far fa-user"></i>
                    <p>{numUsers}</p>
                    <pre>  |  </pre>
                    <p>{topic}</p>
                </div>
            </div>
            <div className="chatroom-header-right flex">
                {/* <Link to="/"><i className="fas fa-home"></i></Link> */}
                <button className="nav-bar-button" onClick= { this.props.logout }> Sign Out </button>
            </div>
            </div>
        )
    }
}

export default ChatroomHeader;