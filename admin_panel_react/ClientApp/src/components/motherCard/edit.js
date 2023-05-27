import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            itemId: props.itemId
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
                                <label className="control-label">Name</label>
                                <input ref={this.inputNameRef} defaultValue={item.name } className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Size</label>
                                <input ref={this.inputSizeRef} defaultValue={item.size} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Socket</label>
                                <input ref={this.inputSocketRef} defaultValue={item.socket} className="form-control" />
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" defaultValue={item.haveWiFiModel} ref={this.inputWiFiRef} /> Have WiFi modul
                                </label>
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" defaultValue={item.haveBluetoothModel} ref={this.inputBluetoothRef} /> Have bluetooth model
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Price</label>
                                <input ref={this.inputPriceRef} defaultValue={item.price} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.editItem();
                                }} className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    <a onClick={(ev) => {

                        this.setTypePage("Index");
                    }
                    }>Back to list</a>
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
            this.setState({ item: data, loading: false });
        }
        else {

            Layout.setMessage('Error get mother card: ' + response.statusText);
        }
    }

    async editItem() {
        let haveWiFi = this.inputWiFiRef.current.value == "on" ? "true" : "false";
        let haveBluetooth = this.inputBluetoothRef.current.value == "on" ? "true" : "false";

        const response = await fetch('mothercards/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&size=' + this.inputSizeRef.current.value
            + '&socket=' + this.inputSocketRef.current.value
            + '&haveWiFiModel=' + haveWiFi
            + '&haveBluetoothModel=' + haveBluetooth);

        if (response.status == 200) {

            Layout.setMessage('Mother card was edited! ');
            this.setTypePage("Index");
        }
        else {

            Layout.setMessage('Error edit mother card: ' + response.statusText);
        }
    }
}