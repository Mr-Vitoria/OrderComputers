import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import Login from './login'
import Registration from './registration'
import Profile from './profile'
import '../../public/css/profile.css'


export class ProfileContainer extends Component {
    static displayName = ProfileContainer.name;

    constructor(props) {
        super(props);
        this.state = {
            page:"Login"
        }
        this.setTypePage = this.setTypePage.bind(this);
    }

    componentDidMount() {
        this.setTypePage('Login');
    }

    setMessage(Message) {
        this.setState({
            message: Message
        });
    }

    setTypePage(Page) {

        const cookies = new Cookies();

        if (Page == 'Login' && cookies.get('userId') != null) {
            Page = 'Profile';
        }
        if (Page == 'SignOut') {
            Page = 'Login';
            cookies.remove('userId', { path: '/' });
        }
        this.setState({
            page: Page
        });
    }

    render() {

        return (
            <div className="profileContainer">
                {
                    this.state.page == "Login" ? <Login setTypePage={this.setTypePage } />
                        : null
                }
                {
                    this.state.page == "Registration" ? <Registration setTypePage={this.setTypePage} />
                        : null
                }
                {
                    this.state.page == "Profile" ? <Profile setTypePage={this.setTypePage} />
                        : null
                }
            </div>
            
        );
    }
}