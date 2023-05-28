import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ""
        }

        this.inputNameRef = React.createRef();
        this.inputSizeRef = React.createRef();
        this.inputSocketRef = React.createRef();
        this.inputWiFiRef = React.createRef();
        this.inputBluetoothRef = React.createRef();
        this.inputRamRef = React.createRef();
        this.inputPriceRef = React.createRef();


        this.setTypePage = props.setTypePage;
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label className="control-label">Name</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Size</label>
                                <select ref={this.inputSizeRef} className="form-control" >
                                    <option value="E-ATX">E-ATX</option>
                                    <option value="Micro-ATX">Micro-ATX</option>
                                    <option value="Mini-DTX">Mini-DTX</option>
                                    <option value="Mini-ITX">Mini-ITX</option>
                                    <option value="Standart-ATX">Standart-ATX</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Socket</label>
                                <input ref={this.inputSocketRef} className="form-control" />
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" ref={this.inputWiFiRef} /> Have WiFi modul
                                </label>
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" ref={this.inputBluetoothRef} /> Have bluetooth model
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="control-label">ImageUrl</label>
                                <input onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Price</label>
                                <input ref={this.inputPriceRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createItem();
                                }} className="btn btn-primary">Add</button>
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

    async createItem() {
        let haveWiFi = this.inputWiFiRef.current.value == "on" ? "true" : "false";
        let haveBluetooth = this.inputBluetoothRef.current.value == "on" ? "true" : "false";

        const response = await fetch('mothercards/create?name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&size=' + this.inputSizeRef.current.value
            + '&socket=' + this.inputSocketRef.current.value
            + '&haveWiFiModel=' + haveWiFi
            + '&haveBluetoothModel=' + haveBluetooth
            + '&imgUrl=' + this.state.imageUrl);

        if (response.status == 200) {
            this.setTypePage("Index");
            Layout.setMessage('Mother card was added! ');
        }
        else {

            Layout.setMessage('Error add mother card: ' + response.statusText);
        }
    }
}