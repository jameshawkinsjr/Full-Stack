export const selectAllMessages = (state) => (
    Object.values(state.entities.messages)
);
export const selectAllMessagesForChatroom = function(state, chatroomId) {
    let messages = Object.values(state.entities.messages);

    let filteredMessages = messages.filter( function (message) {
        return message.chatroom_id == chatroomId;
    });
    // debugger
    return filteredMessages;

};
export const selectAllChatrooms = (state) => (
    Object.values(state.entities.chatrooms)
);