import React, { Component } from 'react';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true   
        };
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
                        <form method="post">
                            <div className="form-group">
                                <label htmlFor="Name" className="control-label">Name</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Size" className="control-label">Size</label>
                                <input ref={this.inputSizeRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Socket" className="control-label">Socket</label>
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
                                <label htmlFor="Price" className="control-label">Price</label>
                                <input ref={this.inputPriceRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <input onClick={(ev) => {
                                    this.createItem();
                                }} value="Add" className="btn btn-primary" />
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
            + '&haveBluetoothModel=' + haveBluetooth        );

        if (response.statusText == "OK") 
            this.setTypePage("Index");
        
        else
            this.setState({ problem: response.statusText, loading: false });
    }
}