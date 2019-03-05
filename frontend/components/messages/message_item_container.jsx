import { connect } from 'react-redux';
import MessageItem from './message_item';
import { withRouter } from 'react-router-dom';
import { destroyMessage, fetchMessages } from '../../actions/messages_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.currentUserId],
    message: ownProps.message,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    destroyMessage: messageId => dispatch(destroyMessage(messageId)),
    editMessage: message => dispatch(editMessage(message)),
    fetchMessages: chatroomId => dispatch(fetchMessages(chatroomId)),
    openModal: () => dispatch(openModal({ type: 'editMessage', message: ownProps.message})),
    closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageItem));