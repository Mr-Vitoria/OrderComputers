import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ""
        }


        this.inputNameRef = React.createRef();
        this.inputFormFactorRef = React.createRef();
        this.inputPowerRef = React.createRef();
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
                                <label className="control-label">Name</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Form factor</label>
                                <select ref={this.inputFormFactorRef} className="form-control">
                                    <option value="ATX">ATX</option>
                                    <option value="SFX">SFX</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Power(Vt)</label>
                                <input ref={this.inputPowerRef} className="form-control" type="number" />
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
        const response = await fetch('powersupplyunits/create?'
            + 'name=' + this.inputNameRef.current.value
            + '&formFactor=' + this.inputFormFactorRef.current.value
            + '&power=' + this.inputPowerRef.current.value
            + '&imgUrl=' + this.state.imageUrl
            + '&price=' + this.inputPriceRef.current.value);

        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Power supply unit was added! ');
        } else {

            Layout.setMessage('Error add power supply unit: ' + response.statusText);
        }
    }
}