import React, { Component } from 'react';
import { Layout } from './Layout';
import './NavMenu.css';
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
                <div onClick={(ev) => { this.menuClickHandler(); }} className="header_toggle"> <i className="bi bi-list" id="header-toggle"></i> </div>
                <div className="header_img"> <img src={item.imgUrl ?? 'https://cdn.onlinewebfonts.com/svg/img_266351.png'} alt="" /> </div>
            </header>

            <div ref={this.headerRef} className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div onClick={(ev) => { this.closeClickHandler(); }} className="header_toggle"> <i className="bi bi-list" id="header-toggle"></i> </div>
                    <div>
                        <a href="/" className="nav_logo"><span className="nav_logo-name">OuTouch</span> </a>
                        <div className="nav_list">
                            <a href="/" className={"nav_link" + (window.location.pathname == "/" ? " active" : "")}>
                                <span className="nav_name">Main</span>
                            </a>

                            <a href="/compBodyPanel" className={"nav_link" + (window.location.pathname == "/compBodyPanel" ? " active" : "")}>
                                <span className="nav_name">Computer body</span>
                            </a>
                            <a href="/compProcessorPanel" className={"nav_link" + (window.location.pathname == "/compProcessorPanel" ? " active" : "")}>
                                <span className="nav_name">Computer processors</span>
                            </a>
                            <a href="/motherCardPanel" className={"nav_link" + (window.location.pathname == "/motherCardPanel" ? " active" : "")}>
                                <span className="nav_name">Mother cards</span>
                            </a>
                            <a href="/powerSupplyUnitPanel" className={"nav_link" + (window.location.pathname == "/powerSupplyUnitPanel" ? " active" : "")}>
                                <span className="nav_name">Power supply units</span>
                            </a>
                            <a href="/ramMemoryPanel" className={"nav_link" + (window.location.pathname == "/ramMemoryPanel" ? " active" : "")}>
                                <span className="nav_name">RAM memory</span>
                            </a>
                            <a href="/storagedevicePanel" className={"nav_link" + (window.location.pathname == "/storagedevicePanel" ? " active" : "")}>
                                <span className="nav_name">Storage device</span>
                            </a>
                            <a href="/videoCardPanel" className={"nav_link" + (window.location.pathname == "/videoCardPanel" ? " active" : "")}>
                                <span className="nav_name">Video card</span>
                            </a>
                            <a href="/compAssemblyPanel" className={"nav_link" + (window.location.pathname == "/compAssemblyPanel" ? " active" : "")}>
                                <span className="nav_name">Comoputer assemblies</span>
                            </a>
                            <a href="/userPanel" className={"nav_link" + (window.location.pathname == "/userPanel" ? " active" : "")}>
                                <span className="nav_name">Users</span>
                            </a>
                            <a href="/orderPanel" className={"nav_link" + (window.location.pathname == "/orderPanel" ? " active" : "")}>
                                <span className="nav_name">Orders</span>
                            </a>
                        </div>
                    </div> <a onClick={(ev) => {
                        Layout.setTypePage("SignOut")
                    }} className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Sign Out</span> </a>
                </nav>
            </div>
        </div>
        </>
            ;
    }

    render() {
        let contents = this.state.loading
            ? <div className="preloader">
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


