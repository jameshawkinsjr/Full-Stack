import { connect } from 'react-redux';
import ChatroomAdd from './chatroom_add';
import { withRouter } from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';
import { clearChatroomErrors, fetchChatrooms, createChatroom } from '../../actions/chatrooms_actions';
import { clearUserErrors, fetchUsers } from '../../actions/users_actions';
import { selectAllUsers, selectAllChatrooms } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
        errors: state.errors.messages,
        users: selectAllUsers(state),
        chatrooms: selectAllChatrooms(state),
        currentUser: state.entities.users[state.session.currentUserId],
})

const mapDispatchToProps = (dispatch) => ({
    createChatroom: chatroom => dispatch(createChatroom(chatroom)),
    closeModal: () => dispatch(closeModal()),
    clearChatroomErrors: () => dispatch(clearChatroomErrors()),
    clearUserErrors: () => dispatch(clearUserErrors()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchChatrooms: (userId) => dispatch(fetchChatrooms(userId)),
    createChatroomSubscription: (chatroom) => dispatch(createChatroomSubscription(chatroom)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatroomAdd));