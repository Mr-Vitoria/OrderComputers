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
        this.inputFormFactorRef = React.createRef();
        this.inputPriceRef = React.createRef();
        this.setTypePage = props.setTypePage;
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form method="post">
                            <div className="text-danger"></div>
                            <div className="form-group">
                                <label htmlFor="Name" className="control-label">Name</label>
                                <input ref={this.inputNameRef} name="Name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="FormFactor" className="control-label">Form factor</label>
                                <select ref={this.inputFormFactorRef} name="FormFactor" className="form-control">
                                    <option value="Super/Ultra Tower">Super/Ultra Tower</option>
                                    <option value="Full Tower">Full Tower</option>
                                    <option value="Mid Tower">Mid Tower</option>
                                    <option value="Mini Tower">Mini Tower</option>
                                    <option value="Small form factor">Small form factor</option>
                                    <option value="HTPC">HTPC</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Price" className="control-label">Price</label>
                                <input ref={this.inputPriceRef} name="Price" className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createCompBodies();
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

    async createCompBodies() {
        const response = await fetch('compbodies/create?name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&formFactor=' + this.inputFormFactorRef.current.value);

        if (response.statusText == "OK") 
            this.setTypePage("Index");
        
        else
            this.setState({ problem: response.statusText, loading: false });
    }
}