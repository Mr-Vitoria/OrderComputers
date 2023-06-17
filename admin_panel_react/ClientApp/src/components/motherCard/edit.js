import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            itemId: props.itemId,
            imageUrl:""
        };
        this.setTypePage = props.setTypePage;

        this.inputIdRef = React.createRef();
        this.inputNameRef = React.createRef();
        this.inputSizeRef = React.createRef();
        this.inputSocketRef = React.createRef();
        this.inputWiFiRef = React.createRef();
        this.inputBluetoothRef = React.createRef();
        this.inputRamRef = React.createRef();
        this.inputPriceRef = React.createRef();

    }

    componentDidMount() {
        this.getItem(this.state.itemId);

    }

    renderItem(item) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <input defaultValue={ item.id} ref={this.inputIdRef} type="hidden" className="form-control" />
                            <div className="form-group">
                                <label className="control-label">Название</label>
                                <input ref={this.inputNameRef} defaultValue={item.name } className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Размер</label>
                                <select ref={this.inputSizeRef} defaultValue={item.size} className="form-control" >
                                    <option value="E-ATX">E-ATX</option>
                                    <option value="Micro-ATX">Micro-ATX</option>
                                    <option value="Mini-DTX">Mini-DTX</option>
                                    <option value="Mini-ITX">Mini-ITX</option>
                                    <option value="Standart-ATX">Standart-ATX</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Сокет</label>
                                <input ref={this.inputSocketRef} defaultValue={item.socket} className="form-control" />
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" 
                                    defaultChecked={item.haveWiFiModul} ref={this.inputWiFiRef} /> Имеет WiFi модуль?
                                </label>
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" 
                                    defaultChecked={item.haveBluetoothModul} ref={this.inputBluetoothRef} /> Имеет bluetooth модуль?
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="control-label">URL изображения</label>
                                <input defaultValue={this.state.imageUrl} 
                                onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Цена</label>
                                <input ref={this.inputPriceRef} defaultValue={item.price} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.editItem();
                                }} className="btn btn-primary">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    <a onClick={(ev) => {

                        this.setTypePage("Index");
                    }
                    }>Вернуться к списку</a>
                </div>
            </div>

        );
    }

    render() {
        let contents = this.state.loading
            ? <div className="middle">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
                <div className="bar bar4"></div>
                <div className="bar bar5"></div>
                <div className="bar bar6"></div>
                <div className="bar bar7"></div>
                <div className="bar bar8"></div>
            </div>
            : this.renderItem(this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('mothercards/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false, imageUrl:data.imgUrl });
        }
        else {

            Layout.setMessage('Ошибка при получении материнской платы: ' + response.status);
        }
    }

    async editItem() {

        const response = await fetch('mothercards/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&size=' + this.inputSizeRef.current.value
            + '&socket=' + this.inputSocketRef.current.value
            + '&haveWiFiModel=' + this.inputWiFiRef.current.checked
            + '&haveBluetoothModel=' + this.inputBluetoothRef.current.checked
            + '&imgUrl=' + this.state.imageUrl);

        if (response.status == 200) {

            Layout.setMessage('Материнская плата изменена! ');
            this.setTypePage("Index");
        }
        else {

            Layout.setMessage('Ошибка при изменении материнской платы: ' + response.status);
        }
    }
}