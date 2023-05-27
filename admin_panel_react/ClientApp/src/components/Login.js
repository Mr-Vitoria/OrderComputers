import React, { Component } from 'react';
import { Layout } from './Layout';
import Cookies from 'universal-cookie';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.setTypePage = props.setTypePage;
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();
    }
    async checkUser() {
        const response = await fetch('users/getuser?phone=' + this.inputPhoneRef.current.value);
        if (response.status == 200) {

            const data = await response.json();
            if (data.password == this.inputPasswordRef.current.value) {
                

                if (data.typeUser == "Admin") {
                    const cookies = new Cookies();
                    cookies.set('userId', data.id, { path: '/' });
                    this.setTypePage("Main");
                    return;
                } else {

                    Layout.setMessage('Error user dont have Admin status: ' + response.statusText);
                }
            }
            else {

                Layout.setMessage('Password or login ercorrect: ' + response.statusText);
            }
        } else {

            Layout.setMessage('Error get user info: ' + response.statusText);
        }
        

    }

    render() {

        return (
            <div>
                <section className="loginSection">

                    <h2>Login</h2>
                    <form>
                        <label htmlFor="userPhone">Phone:</label>
                        <input type="tel" ref={this.inputPhoneRef} id="userPhone" />


                        <label htmlFor="userPassword">Password:</label>
                        <input type="password" ref={this.inputPasswordRef} id="userPassword" />

                        <button onClick={(ev) => {
                            ev.preventDefault();
                            this.checkUser();
                        }} type="submit">Enter</button>
                    </form>
                </section>
            </div>
        );
    }
}