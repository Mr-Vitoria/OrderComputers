import React, { Component } from 'react';

export default class SelectMenuRam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: props.model,
            loading: true,
            selectItem: null,
            infoItem: null
        };

        this.changeItem = props.changeItem;
        this.parentRef = React.createRef();
    }

    render() {
        return (
            <>

                <div className="modal fade" id="aboutRamModal" tabIndex="-1" aria-labelledby="aboutRamModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                {this.state.infoItem != null ? <>
                                    <h1 className="modal-title fs-5" id="aboutRamModalLabel">{this.state.infoItem.name}</h1>
                                </>
                                    : null
                                }

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {this.state.infoItem != null ? <>
                                    <img src={this.state.infoItem.imgUrl} />

                                    <h2>Оперативная память:</h2>
                                    <p>Название: {this.state.infoItem.name}</p>
                                    <p>Тип памяти: {this.state.infoItem.type}</p>
                                    <p>Объем памяти(Мб): {this.state.infoItem.count}</p>
                                    <p>Частота(МГц): {this.state.infoItem.frequency}</p>
                                    <p>Цена: {this.state.infoItem.price} руб.</p>

                                </>
                                    : null
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={this.parentRef} onClick={(ev) => {
                    if (ev.target.classList.contains('select')) {
                        this.parentRef.current.classList.toggle('show');
                        this.parentRef.current.scrollTo(0, 0);
                    }
                }} className="select">
                    <div className="selectMenuValue">
                        {this.state.selectItem == null ? <span>Оперативная память</span>
                            : <div className="container">
                                <span>{this.state.selectItem.name}</span>
                                <div className="properties">
                                    <span>Тип: {this.state.selectItem.type}</span>
                                    <span>Объем: {this.state.selectItem.count} Мб</span>
                                    <span>Цена: {this.state.selectItem.price} руб.</span>
                                </div>
                            </div>}

                    </div>
                    <ul className="selectMenu">
                        {
                            this.state.model.map(item => {
                                return <li key={item.id} className="selectoption container" >
                                    <span>{item.name}</span>
                                    <div className="properties">
                                        <span>Тип: {item.type}</span>
                                        <span>Объем: {item.count} Мб</span>
                                        <span>Цена: {item.price} руб.</span>
                                    </div>

                                    <div className="btnContainer">
                                        <button className="btnChange" onClick={(ev) => {
                                            this.setState({
                                                infoItem: item
                                            });
                                        }} data-bs-toggle="modal" data-bs-target="#aboutRamModal">Подробнее</button>
                                        <button className="btnChange" onClick={(ev) => {

                                            this.setState({
                                                selectItem: item
                                            });
                                            this.changeItem(item);
                                            this.parentRef.current.classList.toggle('show');
                                            this.parentRef.current.scrollTo(0, 0);
                                        }}>Выбрать</button>
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