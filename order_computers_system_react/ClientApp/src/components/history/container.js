import React, { Component } from 'react';
import OrderBlock from './orderBlock'

import '../../public/css/history.css';
import Cookies from 'universal-cookie';

export class HistoryContainer extends Component {
    static displayName = HistoryContainer.name;

    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            model: null,
            loading: true,
            userId: cookies.get('userId')
        };
    }

    componentDidMount() {
        if (this.state.userId != null) {

            this.getModel();
        }
        else {
            console.log('User not login');
        }
    }

    renderModel(model) {

        return (
            <div className="historyContainer">

                <section>
                    <h2>Заказы</h2>
                    {model.filter(it => it.status =="Активен").map((item, key) =>
                        <OrderBlock item={item} key={key} />
                    )}
                </section>
                <section>
                    <h2>История</h2>
                    {model.filter(it => it.status != "Активен").map((item, key) =>
                        <OrderBlock item={item} key={key} />
                    )}
                </section>
                
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <div className="preloader">
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
            : this.renderModel(this.state.model);

        return (
            <div>
                {contents}
            </div>
        );
    }


    async getModel() {
        const response = await fetch('users/gethistoryuser?id=' + this.state.userId);
        const data = await response.json();
        this.setState({ model: data, loading: false });
    }
}



