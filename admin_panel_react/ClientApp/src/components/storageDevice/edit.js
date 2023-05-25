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
        this.inputTypeRef = React.createRef();
        this.inputCountRef = React.createRef();
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
                                <label className="control-label">Type</label>
                                <select defaultValue={item.type} ref={this.inputTypeRef} className="form-control">
                                    <option value="SSD">SSD</option>
                                    <option value="HDD">HDD</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Count</label>
                                <input defaultValue={item.count} ref={this.inputCountRef} className="form-control" type="number" />
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
        const response = await fetch('storagedevices/detail?id=' + Id);
        const data = await response.json();
        this.setState({ item: data, loading: false });
    }

    async editItem() {

        const response = await fetch('storagedevices/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&type=' + this.inputTypeRef.current.value
            + '&count=' + this.inputCountRef.current.value
            + '&price=' + this.inputPriceRef.current.value);

        if (response.statusText == "OK")
            this.setTypePage("Index");
        else {
            console.log(response);
        }
    }
}