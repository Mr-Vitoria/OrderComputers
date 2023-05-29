import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export default class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();

        this.setTypePage = props.setTypePage;
    }
    async checkUser() {
        const response = await fetch('ordersystem/getuser?phone=' + this.inputPhoneRef.current.value);
        if (response.status == 200) {

            const data = await response.json();
            if (data.password == this.inputPasswordRef.current.value) {
                const cookies = new Cookies();
                cookies.set('userId', data.id, { path: '/' });
                this.setTypePage("Profile");
            }
            else {
                console.log('Password or phone ercorrect: ');
                //Layout.setMessage('Password or phone ercorrect: ' + response.statusText);
            }
        } else {
            console.log('Error get user info: ');
            //Layout.setMessage('Error get user info: ' + response.statusText);
        }


    }

    render() {

        return (
            <div>
                <section className="loginSection">

                    <h2>Вход</h2>
                    <form>
                        <label htmlFor="userPhone">Телефон</label>
                        <input type="tel" ref={this.inputPhoneRef} id="userPhone" />


                        <label htmlFor="userPassword">Пароль</label>
                        <input type="password" ref={this.inputPasswordRef} id="userPassword" />

                        <button onClick={(ev) => {
                            ev.preventDefault();
                            this.checkUser();
                        }} type="submit">Вход</button>
                    </form>
                    <div className="helpBlock">
                        <span>Нет нашего аккаунта? <a onClick={(ev) => {
                            ev.preventDefault();
                            this.setTypePage("Registration");
                        }} href="#">Зарегистрироваться</a></span>
                    </div>
                </section>
            </div>
        );
    }
}