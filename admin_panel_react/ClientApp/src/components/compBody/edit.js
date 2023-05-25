import React, { Component } from 'react';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            itemId: props.itemId
        };
        this.setTypePage = props.setTypePage;

        this.inputNameRef = React.createRef();
        this.inputFormFactorRef = React.createRef();
        this.inputPriceRef = React.createRef();
        this.inputIdRef = React.createRef();
    }

    componentDidMount() {
        this.getCompBody(this.state.itemId);

    }

    renderCompBody(item) {
        return (
            <>
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <form method="post">
                                <input ref={this.inputIdRef} type="hidden" defaultValue={item.id}></input>
                                <div className="text-danger"></div>
                                <div className="form-group">
                                    <label htmlFor="Name" className="control-label">Name</label>
                                    <input defaultValue={item.name} ref={this.inputNameRef} name="Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="FormFactor" className="control-label">Form factor</label>
                                    <select defaultValue={item.formFactor} ref={this.inputFormFactorRef} name="FormFactor" className="form-control">
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
                                    <input defaultValue={item.price} ref={this.inputPriceRef} name="Price" className="form-control" type="number" />
                                </div>
                                <div className="form-group">
                                    <button onClick={(ev) => {
                                        ev.preventDefault();
                                        this.editCompBody();
                                    }} className="btn btn-dark" >Save</button>
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
            </>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCompBody(this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getCompBody(Id) {
        const response = await fetch('compbodies/detail?id=' + Id);
        const data = await response.json();
        this.setState({ item: data, loading: false });
    }

    async editCompBody() {
        const response = await fetch('compbodies/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&formFactor=' + this.inputFormFactorRef.current.value);

        console.log(response);
        if (response.statusText == "OK")
            this.setTypePage("Index");
        else {
            console.log(response);
        }
    }
}