import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Layout } from '../Layout';

export default class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();

        this.setTypePage = props.setTypePage;
    }
    async checkUser() {
        const response = await fetch('users/getuser?phone=' + this.inputPhoneRef.current.value);
        if (response.status == 200) {

            const data = await response.json();
            if (data.password == this.inputPasswordRef.current.value) {
                const cookies = new Cookies();
                cookies.set('userId', data.id, { path: '/', maxAge: 86400 });
                this.setTypePage("Profile");
                window.location.reload();
            }
            else {
                Layout.changeMessage('Проверьте правильность ввода телефона и пароля');
            }
        } else {
            Layout.changeMessage("Ошибка авторизации. Повторите попытку позже");
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