import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Registration extends Component {
    static displayName = Registration.name;

    constructor(props) {
        super(props);
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();
        this.inputLoginRef = React.createRef();
        this.inputNameRef = React.createRef();

        this.setTypePage = props.setTypePage;
    }
    async createUser() {
        const response = await fetch('users/createuser?phone=' + this.inputPhoneRef.current.value
            + '&login=' + this.inputLoginRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&password=' + this.inputPasswordRef.current.value

        );
        if (response.status == 200) {

            const data = await response.json();
            if (data.status==0) {
                this.setTypePage("Login");
            }
            else {
                Layout.changeMessage('Ошибка: '+data.message);
            }
        } else {
            Layout.changeMessage('Не удалось создать пользователя. Повторите попытку похже');
        }


    }

    render() {

        return (
            <div>
                <section className="loginSection">

                    <h2>Регистрация</h2>
                    <form>
                        <label htmlFor="userName">Ваше имя:</label>
                        <input type="text" ref={this.inputNameRef} id="userName" required />

                        <label htmlFor="userLogin">Логин:</label>
                        <input type="text" ref={this.inputLoginRef} id="userLogin" required />

                        <label htmlFor="userPhone">Телефон:</label>
                        <input type="tel" ref={this.inputPhoneRef} id="userPhone" required />

                        <label htmlFor="userPassword">Пароль:</label>
                        <input type="password" ref={this.inputPasswordRef} id="userPassword" required />




                        <button onClick={(ev) => {
                            ev.preventDefault();
                            this.createUser();
                        }} type="submit">Зарегестрироваться</button>
                    </form>
                    <div className="helpBlock">
                        <span>Уже есть наш аккаунт? <a onClick={(ev) => {
                            ev.preventDefault();
                            this.setTypePage("Login");
                        }} href="#">Войти в аккаунт</a></span>
                    </div>
                </section>
            </div>
        );
    }
}