import React, { Component } from 'react';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            name: "",
            formFactor: "",
            price:0
        };
        this.inputNameRef = React.createRef();
        this.inputProducerRef = React.createRef();
        this.inputSocketRef = React.createRef();
        this.inputCoresRef = React.createRef();
        this.inputThreadsRef = React.createRef();
        this.inputFrequencyRef = React.createRef();
        this.inputTurboRef = React.createRef();
        this.inputVideoCardRef = React.createRef();
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
                            <div asp-validation-summary="ModelOnly" className="text-danger"></div>
                            <div className="form-group">
                                <label htmlFor="Name" className="control-label">Name</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Producer" className="control-label">Producer</label>
                                <input ref={this.inputProducerRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Socket" className="control-label">Socket</label>
                                <input ref={this.inputSocketRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="CountCores" className="control-label">Count cores</label>
                                <input ref={this.inputCoresRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="CountThreads" className="control-label">Count threads</label>
                                <input ref={this.inputThreadsRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Frequency" className="control-label">Frequency</label>
                                <input ref={this.inputFrequencyRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TurboTechnology" className="control-label">Turbo technology</label>
                                <select ref={this.inputTurboRef} className="form-control">
                                    <option value="NONE">NONE</option>
                                    <option value="Turbo Boost">Turbo Boost</option>
                                    <option value="Turbo Core">Turbo Core</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="TypeRam" className="control-label">Type of RAM</label>
                                <select ref={this.inputRamRef} className="form-control">
                                    <option value="DDR2">DDR2</option>
                                    <option value="DDR3">DDR3</option>
                                    <option value="DDR4">DDR4</option>
                                    <option value="DDR5">DDR5</option>
                                </select>
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" ref={this.inputVideoCardRef} /> Have video card?
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Price" className="control-label">Price</label>
                                <input ref={this.inputPriceRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createItem();
                                }} className="btn btn-dark" >Add</button>
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
        let haveVideo = this.inputVideoCardRef.current.value == "on" ? "true" : "false";

        const response = await fetch('compprocessors/create?name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&producer=' + this.inputProducerRef.current.value
            + '&socket=' + this.inputSocketRef.current.value
            + '&countCores=' + this.inputCoresRef.current.value
            + '&countThreads=' + this.inputThreadsRef.current.value
            + '&frequency=' + this.inputFrequencyRef.current.value
            + '&turboTechnology=' + this.inputTurboRef.current.value
            + '&haveVideoCard=' + haveVideo
            + '&typeRam=' + this.inputRamRef.current.value);

        if (response.statusText == "OK") 
            this.setTypePage("Index");
        
        else
            this.setState({ problem: response.statusText, loading: false });
    }
}