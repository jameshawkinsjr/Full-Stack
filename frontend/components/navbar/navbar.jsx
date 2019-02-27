import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let name;
        if (this.props.currentUser) {
            if (this.props.currentUser.alias) {
                name = this.props.currentUser.alias;
            } else {
                name = this.props.currentUser.full_name;
            }
        }

        const navBar = this.props.currentUser ? (
            
            <div className="top-nav-home">
                <h3 className="bold">Welcome</h3>
                <p> { name }</p>
                <Link to="/"> Home </Link>
                <button onClick= { this.props.logout }> Sign Out </button>
            </div>
        ) : (
            <div className="top-nav-home flex">
                <Link to="/signup"> Sign Up </Link>
                <Link to="/login"> Log In </Link>
                <p>Not working</p>
            </div>
        );

        return (
            <div className="top-nav flex">
                { navBar }
            </div>
        )
    }
}

export default NavBar;