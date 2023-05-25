import React, { Component } from 'react';
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
        const data = await response.json();
    if (data.password == this.inputPasswordRef.current.value && data.typeUser == "Admin") {
        const cookies = new Cookies();
        console.log(data);
        cookies.set('userId',data.id , { path: '/' });
            this.setTypePage("Main");
            return;
        }
        console.log("error");

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