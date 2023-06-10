import React, { Component } from 'react';

import Cookies from 'universal-cookie';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userImg:null
        };
        this.setTypePage = props.setTypePage;
    }
    componentDidMount() {
        this.getUser();
    }
    render() {
        return <header>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasHeader" aria-labelledby="offcanvasHeaderLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasHeaderLabel">OuTouch</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                   
                    <div className="linksContainer">
                        <a href="/profile">
                            <img className="profileIcon" src={this.state.userImg ?? "https://www.pinclipart.com/picdir/big/178-1789203_user-icon-png-white-printer-logic-client-download.png"} />
                        </a>
                        <a href="/">Главная</a>
                        <a href="/assemblyList">Модели</a>
                        <a href="/configuration">Конфигуратор</a>
                        <a href="/profile">Профиль</a>
                        {this.state.userImg != null ? <a href="/history">Заказы</a> : null}
                        {/*<a href="#">Поддержка</a>*/}
                        {this.state.userImg != null ? <a href="/profile">Профиль</a> : null}
                    </div>
                </div>
            </div>
            <nav>
                <div className="container">
                    <div>
                        <a href="/">
                            <img src={require('../public/images/OuTouch.png')} />
                        </a>
                    </div>
                    <div className="linksContainer">
                        <a href="/assemblyList">Модели</a>
                        <a href="/configuration">Конфигуратор</a>
                        {/*<a href="#">Поддержка</a>*/}
                    </div>
                    <div className="profileContainer">
                        <a href="/configuration">
                            <img src={require('../public/images/gearWheel.png')} />
                        </a>
                        <a href="/history">

                            {this.state.userImg != null ? <img src={require('../public/images/Bag.png')} /> : null} 
                        </a>
                        <a href="/profile">
                            <img className="profileIcon" src={this.state.userImg ??"https://www.pinclipart.com/picdir/big/178-1789203_user-icon-png-white-printer-logic-client-download.png"} />

                        </a>
                    </div>
                    <a className="menuIcon" data-bs-toggle="offcanvas" href="#offcanvasHeader" role="button" aria-controls="offcanvasHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </a>
                </div>
            </nav>
        </header>
    }

    async getUser() {

        const cookies = new Cookies();
        const response = await fetch('ordersystem/getuserbyid?id=' + cookies.get('userId'));
        if (response.status == 200) {

            const data = await response.json();

            this.setState({
                userImg: data.imgUrl
            });
        } else {
            console.log('Error get user info: ');
        }
    }
}