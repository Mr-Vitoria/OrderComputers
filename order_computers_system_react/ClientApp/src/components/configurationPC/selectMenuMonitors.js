import React, { Component } from 'react';

export default class SelectMenuMonitors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: props.model,
            loading: true,
            selectItem: null
        };

        this.changeItem = props.changeItem;
        this.parentRef = React.createRef();
    }

    render() {
        return (
            <>

                <div ref={this.parentRef} onClick={(ev) => {
                    this.parentRef.current.classList.toggle('show');
                    this.parentRef.current.scrollTo(0, 0);
                }} className="select">
                    <div className="selectMenuValue">
                        {this.state.selectItem == null ? <span>Монитор</span>
                            : <div className="container">
                                <span>{this.state.selectItem.name}</span>
                                <div className="properties">
                                    <span>Цена: {this.state.selectItem.price} руб.</span>
                                </div>
                            </div>}

                    </div>
                    <ul className="selectMenu">
                        <li className="selectoption container" onClick={(ev) => {
                            this.setState({
                                selectItem: null
                            });
                            this.changeItem(null);
                        }}>
                            <span>Без монитора</span>
                        </li>
                        {
                            this.state.model.map(item => {
                                return <li key={item.id} className="selectoption container" onClick={(ev) => {
                                    this.setState({
                                        selectItem: item
                                    });
                                    this.changeItem(item);
                                }}>
                                    <span>{item.name}</span>
                                    <div className="properties">
                                        <span>Цена: {item.price} руб.</span>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </>
        );
    }
}