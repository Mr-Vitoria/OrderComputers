import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.setTypePage = props.setTypePage;
    }

    render() {
        return <header>
            <nav>
                <div className="container">
                    <div>
                        <a href="/">
                            <img src={require('../public/images/OuTouch.png')} />
                        </a>
                    </div>
                    <div>
                        <a href="#">Модели</a>
                        <a href="/configuration">Конфигуратор</a>
                        <a href="#">Услуги</a>
                        <a href="#">Поддержка</a>
                    </div>
                    <div className="profileContainer">
                        <a href="/configuration">
                            <img src={require('../public/images/gearWheel.png')} />
                        </a>
                        <a href="/history">
                            <img src={require('../public/images/Bag.png')} />
                        </a>
                        <a href="/profile">
                            <img className="profileIcon" src={null ?? "https://www.pinclipart.com/picdir/big/178-1789203_user-icon-png-white-printer-logic-client-download.png"} />

                        </a>
                    </div>
                </div>
            </nav>
        </header>
    }
}
