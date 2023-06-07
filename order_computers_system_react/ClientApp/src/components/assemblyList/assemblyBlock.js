import React, { Component } from 'react';

export default class AssemblyBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        this.setDescriptionItem = props.setDescriptionItem;
    }

    render() {
        return (
            <>
                <div className="card mb-3" >
                    <div className="row g-0">
                        <div className="col-md-5">
                            <img src={this.state.item.imgUrl} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.item.name??""}</h5>
                                <div className="shortInfo">

                                    <p>Процессор: {this.state.item.compProcessor.name}</p>

                                    <p>Видеокарта: {this.state.item.videoCard != null ? this.state.item.videoCard.name:"Отсутствует"}</p>

                                    <p>SSD/HDD: {this.state.item.storageDevice.name}</p>
                                </div>
                                <p className="card-text">Цена сборки: {this.state.item.costPrice} руб.</p>
                                <button onClick={(ev) => {
                                    this.setDescriptionItem(this.state.item);
                                }
                                } type="button" data-bs-toggle="modal" data-bs-target="#descriptionModal">Подробнее</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}