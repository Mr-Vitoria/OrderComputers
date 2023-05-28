import React, { Component } from 'react';

export default class SelectMenuRam extends Component {
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
                        {this.state.selectItem == null ? <span>Оперативная память</span>
                            : <div className="container">
                                <span>{this.state.selectItem.name}</span>
                                <div className="properties">
                                    <span>Тип: {this.state.selectItem.type}</span>
                                    <span>Количество: {this.state.selectItem.count}</span>
                                    <span>Частота: {this.state.selectItem.frequency}</span>
                                </div>
                            </div>}

                    </div>
                    <ul className="selectMenu">
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
                                        <span>Тип: {item.type}</span>
                                        <span>Количество: {item.count}</span>
                                        <span>Частота: {item.frequency}</span>
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