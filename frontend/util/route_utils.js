import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    loggedIn: Boolean(state.session.currentUserId),
    currentChatroom: state.entities.chatrooms[ownProps.match.params.chatroomId],
    currentUser: state.entities.users[state.session.currentUserId],
});

const Auth = ({ loggedIn, path, component: Component }) => (
    <Route
        path = { path }
        render = { props => (
            loggedIn ? <Redirect to="/chatrooms" /> :  <Component {...props} />
        )}
    />
);
const Protected = ({ loggedIn, path, component: Component }) => (
    <Route
        path = { path }
        render = { props => (
            loggedIn ? <Component {...props} /> : <Redirect to="/" />
        )}
    />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));