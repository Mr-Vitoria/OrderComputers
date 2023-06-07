import React, { Component } from 'react';

export default class SelectMenuVideoCard extends Component {
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
                        {this.state.selectItem == null ? <span>Видеокарта</span>
                            : <div className="container">
                                <span>{this.state.selectItem.name}</span>
                                <div className="properties">
                                    <span>Тип памяти: {this.state.selectItem.type}</span>
                                    <span>Объем памяти: {this.state.selectItem.count} Мб</span>
                                    <span>Цена: {this.state.selectItem.price} руб.</span>
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
                                        <span>Тип памяти: {item.type}</span>
                                        <span>Объем памяти: {item.count} Мб</span>
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