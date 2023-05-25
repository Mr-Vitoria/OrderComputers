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

        this.inputIdRef = React.createRef();
        this.inputNameRef = React.createRef();
        this.inputFormFactorRef = React.createRef();
        this.inputPowerRef = React.createRef();
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
                        <form method="post">
                            <input defaultValue={item.id } ref={this.inputIdRef} type="hidden" className="form-control" />
                            <div className="form-group">
                                <label className="control-label">Name</label>
                                <input defaultValue={item.name} ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Form factor</label>
                                <input defaultValue={ item.formFactor} ref={this.inputFormFactorRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Power</label>
                                <input defaultValue={item.power} ref={this.inputPowerRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Price</label>
                                <input defaultValue={item.price} ref={this.inputPriceRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <input onClick={(ev) => {
                                    this.editItem();
                                }} defaultValue="Save" className="btn btn-primary" />
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
            ? <p><em>Loading...</em></p>
            : this.renderItem(this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('powersupplyunits/detail?id=' + Id);
        const data = await response.json();
        this.setState({ item: data, loading: false });
    }

    async editItem() {

        const response = await fetch('powersupplyunits/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&formFactor=' + this.inputFormFactorRef.current.value
            + '&power=' + this.inputPowerRef.current.value
            + '&price=' + this.inputPriceRef.current.value);

        if (response.statusText == "OK")
            this.setTypePage("Index");
        else {
            console.log(response);
        }
    }
}