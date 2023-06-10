import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Layout } from '../Layout';

export default class Profile extends Component {
    static displayName = Profile.name;

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true
        }
        this.inputImgRef = React.createRef();

        this.changeUserInfo = this.changeUserInfo.bind(this);
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

    async changeUserInfo() {
        const cookies = new Cookies();
        
        const response = await fetch('ordersystem/changeuserinfo?id=' + cookies.get('userId')
            + '&imgUrl=' + this.inputImgRef.current.value);
        if (response.status == 200) {

            Layout.changeMessage('Вы успешно изменили профиль!');
            window.location.reload();

        } else {
            Layout.changeMessage('Ошибка при изменении информации, повторите попытку позже');
        }
    }

    async getInforamtion() {
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
            <>
            
                <div className="modal fade" id="changeProfileModal" tabIndex="-1" aria-labelledby="changeProfileModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                {this.state.descriptionItem != null ? <>
                                    <h1 className="modal-title fs-5" id="changeProfileModalLabel">{this.state.descriptionItem.name}</h1>
                                </>
                                    : null
                                }
                                
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <h2>Изменить профиль:</h2>
                                <p>Изображение</p>
                                <input type="url" ref={this.inputImgRef} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={(ev) => { this.changeUserInfo(); } } data-bs-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>

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

                    <button data-bs-toggle="modal" data-bs-target="#changeProfileModal">Изменить профиль</button>
                <button onClick={(ev) => {
                    ev.preventDefault();
                    this.setTypePage("SignOut");
                }}>Выйти</button>
                </section>
            </>
        );
    }

    render() {
        let content = this.state.loading ?
            <div className="preloader">
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="33%" stopColor="black" />
                            <stop offset="55%" stopColor="black" />
                            <stop offset="100%" stopColor="white" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="33%" stopColor="black" />
                            <stop offset="55%" stopColor="black" />
                            <stop offset="100%" stopColor="white" />
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