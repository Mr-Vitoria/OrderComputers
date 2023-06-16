import React, { Component } from 'react';
import { Layout } from './Layout';
import Cookies from 'universal-cookie';

export class NavMenu extends Component {
    static displayName = NavMenu.name;
    constructor(props) {
        super(props);

        this.headerRef = React.createRef();
        this.menuClickHandler = this.menuClickHandler.bind(this);
        this.closeClickHandler = this.closeClickHandler.bind(this);
        this.state = {
            item: null,
            loading: true
        };
    }

    menuClickHandler() {
        this.headerRef.current.className += ' show';
    }
    closeClickHandler() {
        this.headerRef.current.className = this.headerRef.current.className.replace('show', '');
    }
    signOutClickHandler() {
        this.headerRef.current.className = this.headerRef.current.className.replace('show', '');
    }

    componentDidMount() {
        this.getUser();
    }

    renderItem(item) {
        return <><div id="body-pd">
            <header className="header" id="header">
                <div className="header_toggle"> </div>
                <div className="header_img"> <img src={item.imgUrl ?? 'https://cdn.onlinewebfonts.com/svg/img_266351.png'} alt="" /> </div>
            </header>
            <div ref={this.headerRef} className="l-navbar show" id="nav-bar">
                <nav className="nav">
                   <div>
                        <a href="/" className="nav_logo"><span className="nav_logo-name">OuTouch</span> </a>
                        <div className="nav_list">
                            <a href="/" className={"nav_link" + (window.location.pathname == "/" ? " active" : "")}>
                                <span className="nav_name">Главное меню</span>
                            </a>

                            <a href="/compBodyPanel" className={"nav_link" + (window.location.pathname == "/compBodyPanel" ? " active" : "")}>
                                <span className="nav_name">Корпусы</span>
                            </a>
                            <a href="/compProcessorPanel" className={"nav_link" + (window.location.pathname == "/compProcessorPanel" ? " active" : "")}>
                                <span className="nav_name">Процессоры</span>
                            </a>
                            <a href="/motherCardPanel" className={"nav_link" + (window.location.pathname == "/motherCardPanel" ? " active" : "")}>
                                <span className="nav_name">Материнские платы</span>
                            </a>
                            <a href="/powerSupplyUnitPanel" className={"nav_link" + (window.location.pathname == "/powerSupplyUnitPanel" ? " active" : "")}>
                                <span className="nav_name">Блоки питания</span>
                            </a>
                            <a href="/ramMemoryPanel" className={"nav_link" + (window.location.pathname == "/ramMemoryPanel" ? " active" : "")}>
                                <span className="nav_name">Оперативная память</span>
                            </a>
                            <a href="/storagedevicePanel" className={"nav_link" + (window.location.pathname == "/storagedevicePanel" ? " active" : "")}>
                                <span className="nav_name">Запоминающие устройства</span>
                            </a>
                            <a href="/videoCardPanel" className={"nav_link" + (window.location.pathname == "/videoCardPanel" ? " active" : "")}>
                                <span className="nav_name">Видеокарты</span>
                            </a>
                            <a href="/peripheryPanel" className={"nav_link" + (window.location.pathname == "/peripheryPanel" ? " active" : "")}>
                                <span className="nav_name">Периферия</span>
                            </a>
                            <a href="/compAssemblyPanel" className={"nav_link" + (window.location.pathname == "/compAssemblyPanel" ? " active" : "")}>
                                <span className="nav_name">Сборки ПК</span>
                            </a>
                            <a href="/userPanel" className={"nav_link" + (window.location.pathname == "/userPanel" ? " active" : "")}>
                                <span className="nav_name">Пользователи</span>
                            </a>
                            <a href="/orderPanel" className={"nav_link" + (window.location.pathname == "/orderPanel" ? " active" : "")}>
                                <span className="nav_name">Заказы</span>
                            </a>
                            <a href="/feedbackPanel" className={"nav_link" + (window.location.pathname == "/feedbackPanel" ? " active" : "")}>
                                <span className="nav_name">Отзывы</span>
                            </a>
                        </div>
                    </div> <a onClick={(ev) => {
                        Layout.setTypePage("SignOut")
                    }} className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Выход</span> </a>
                </nav>
            </div>
        </div>
        </>
            ;
    }

    render() {
        let contents = this.state.loading
            ?
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
        return (
            
            <div>                
                {contents}
            </div>
        );
    }

    async getUser() {
        const cookies = new Cookies();
        const response = await fetch('users/detail?id=' + cookies.get('userId'));
        const data = await response.json();
        this.setState({
            item: data,
            loading: false
        });
}
}


