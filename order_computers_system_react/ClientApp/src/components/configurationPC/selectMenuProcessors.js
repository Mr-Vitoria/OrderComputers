import React, { Component } from 'react';

export default class SelectMenuProcessors extends Component {
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
                        {this.state.selectItem == null ? <span>Процессор</span>
                            : <div className="container">
                                <span>{this.state.selectItem.name}</span>
                                <div className="properties">
                                    <span>Количество ядер: {this.state.selectItem.countCores}</span>
                                    <span>Количество потоков: {this.state.selectItem.countThreads}</span>
                                    <span>Частота: {this.state.selectItem.frequency} МГц</span>
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
                                        <span>Количество ядер: {item.countCores}</span>
                                        <span>Количество потоков: {item.countThreads}</span>
                                        <span>Частота: {item.frequency} МГц</span>
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