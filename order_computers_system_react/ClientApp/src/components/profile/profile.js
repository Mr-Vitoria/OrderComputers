import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Layout } from '../Layout';

export default class Profile extends Component {
    static displayName = Profile.name;

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading:true
        }

        this.setTypePage = props.setTypePage;
    }
    async getUser() {
        const cookies = new Cookies();
        
        const response = await fetch('ordersystem/getuserbyid?id=' + cookies.get('userId'));
        if (response.status == 200) {

            const data = await response.json();

            this.setState({
                item: data,
                loading: false
            });
        } else {
            Layout.changeMessage('Ошибка при получении информации о пользователе, повторите попытку позже');
        }
    }

    componentDidMount() {
        this.getUser();
    }

    renderItem(item) {
        return (
            <section className="profileSection">
                <h2>Профиль</h2>
                <div className="imgContainer">
                    <img src={item.imgUrl ??"https://webmg.ru/wp-content/uploads/2022/10/i-43-34.jpeg"} />
                </div>

                <label>Имя</label>
                <p>{item.name}</p>
                <label>Логин</label>
                <p>{item.login }</p>
                <label>Телефон</label>
                <p>{item.phone}</p>

                <button>Изменить пароль</button>
                <button onClick={(ev) => {
                    ev.preventDefault();
                    this.setTypePage("SignOut");
                }}>Выйти</button>
            </section>
        );
    }

    render() {
        let content = this.state.loading ?
            <div className="preloader">
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5ebd3e" />
                            <stop offset="33%" stopColor="#ffb900" />
                            <stop offset="67%" stopColor="#f78200" />
                            <stop offset="100%" stopColor="#e23838" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#e23838" />
                            <stop offset="33%" stopColor="#973999" />
                            <stop offset="67%" stopColor="#009cdf" />
                            <stop offset="100%" stopColor="#5ebd3e" />
                        </linearGradient>
                    </defs>
                    <g fill="none" strokeLinecap="round" strokeWidth="16">
                        <g className="ip__track" stroke="#ddd">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g strokeDasharray="180 656">
                            <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                    </g>
                </svg>
            </div>
            : this.renderItem(this.state.item);
        return <>
            {content}
        </>
    }
}