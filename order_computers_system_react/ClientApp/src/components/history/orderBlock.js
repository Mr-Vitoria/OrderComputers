import React, { Component } from 'react';

export default class OrderBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
    }

    render() {
        return (
            <>
                <div className={"container" + (this.state.item.status == "Active" ? " active" : "")}>
                    <div className="statusContainer">
                        <p>Статус: {this.state.item.status}</p>
                    </div>
                    <div className="assemblyContainer">
                        <h3>Комплектующие:</h3>
                        <div>
                            {this.state.item.computerAssembly.motherCard != null ? <>
                                <p>Материнская плата:</p>
                                <p>{this.state.item.computerAssembly.motherCard.name} - {this.state.item.computerAssembly.motherCard.price} руб.</p>
                            </>
                                : null}
                            {this.state.item.computerAssembly.compProcessor != null ? <>
                                <p>Процессор:</p>
                                <p>{this.state.item.computerAssembly.compProcessor.name} - {this.state.item.computerAssembly.compProcessor.price} руб.</p>
                            </>
                                : null}
                            {this.state.item.computerAssembly.ramMemory != null ? <>
                                <p>Оперативная память:</p>
                                <p>{this.state.item.computerAssembly.ramMemory.name} - {this.state.item.computerAssembly.ramMemory.price} руб.</p>
                            </>
                                : null}
                            {this.state.item.computerAssembly.storageDevice != null ? <>
                                <p>запоминающее устройство:</p>
                                <p>{this.state.item.computerAssembly.storageDevice.name} - {this.state.item.computerAssembly.storageDevice.price} руб.</p>
                            </>
                                : null}
                            {this.state.item.computerAssembly.videoCard != null ? <>
                                <p>Видеокарта:</p>
                                <p>{this.state.item.computerAssembly.videoCard.name} - {this.state.item.computerAssembly.videoCard.price} руб.</p>
                            </>
                                : null}
                            {this.state.item.computerAssembly.powerSupplyUnit != null ? <>
                                <p>Блок питания:</p>
                                <p>{this.state.item.computerAssembly.powerSupplyUnit.name} - {this.state.item.computerAssembly.powerSupplyUnit.price} руб.</p>
                            </>
                                : null}
                            {this.state.item.computerAssembly.compBody != null ? <>
                                <p>Корпус:</p>
                                <p>{this.state.item.computerAssembly.compBody.name} - {this.state.item.computerAssembly.compBody.price} руб.</p>
                            </>
                                : null}
                        </div>
                    </div>
                    <div className="peripheryContainer">
                        <h3>Периферия:</h3>

                    </div>
                    <div className="totalContainer">
                        <div>
                            <p>Итого</p>
                            <input type="text" defaultValue={this.state.item.totalPrice} readOnly />
                        </div>
                        <button>{this.state.item.status == "Active" ? " Отменить" : "Повторить"}</button>
                    </div>
                    <p className="orderDate">Дата заказа: {this.state.item.orderDate}</p>
                </div>
            </>
        );
    }
}