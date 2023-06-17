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
                    cookies.set('userId', data.id, { path: '/', maxAge: 86400 });
                    this.setTypePage("Main");
                    return;
                } else {

                    Layout.setMessage('У вас нет прав доступа к этому сайту: ' + response.statusText);
                }
            }
            else {

                Layout.setMessage('Пожалуйста, проверьте правильность ввода данных для входа.');
            }
        } else {

            Layout.setMessage('Ошибка при получении информации с сервера: ' + response.status);
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


                        <label htmlFor="userPassword">Пароль:</label>
                        <input type="password" ref={this.inputPasswordRef} id="userPassword" />

                        <button onClick={(ev) => {
                            ev.preventDefault();
                            this.checkUser();
                        }} type="submit">Войти</button>
                    </form>
                </section>
            </div>
        );
    }
}