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
        this.headerRef.current.className = this.headerRef.current.className.replace('show','');
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
                <div className="header_img"> <img src={item.imgUrl ??'https://cdn.onlinewebfonts.com/svg/img_266351.png'} alt="" /> </div>
            </header>

            <div ref={this.headerRef} className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div onClick={(ev) => { this.closeClickHandler(); }} className="header_toggle"> <i className="bi bi-list" id="header-toggle"></i> </div>
                    <div>
                        <a href="/" className="nav_logo"><span className="nav_logo-name">OuTouch</span> </a>
                        <div className="nav_list">
                            <a href="/" className="nav_link active">
                                <span className="nav_name">Main</span>
                            </a>

                            <a href="/compBodiesPanel" className="nav_link">
                                <span className="nav_name">Computer body</span>
                            </a>
                            <a href="/compProcessorPanel" className="nav_link">
                                <span className="nav_name">Computer processors</span>
                            </a>
                            <a href="/motherCardPanel" className="nav_link">
                                <span className="nav_name">Mother cards</span>
                            </a>
                            <a href="/userPanel" className="nav_link">
                                <span className="nav_name">Users</span>
                            </a>
                            <a href="/powerSupplyUnitPanel" className="nav_link">
                                <span className="nav_name">Power supply units</span>
                            </a>
                            <a href="/ramMemoryPanel" className="nav_link">
                                <span className="nav_name">RAM memory</span>
                            </a>
                            <a href="/storagedevicePanel" className="nav_link">
                                <span className="nav_name">Storage device</span>
                            </a>
                            <a href="/videoCardPanel" className="nav_link">
                                <span className="nav_name">Video card</span>
                            </a>
                            <a href="/compAssemblies" className="nav_link">
                                <span className="nav_name">Comoputer assemblies</span>
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
            ? <p><em>Loading...</em></p>
            : this.renderItem(this.state.item);
        console.log(contents);
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
        this.setState({ item: data, loading: false });
        console.log(data);
    }
}


