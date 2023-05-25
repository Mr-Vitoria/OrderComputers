import React, { Component } from 'react';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            itemId: props.itemId
        };
        this.setTypePage = props.setTypePage;
    }

    componentDidMount() {
        this.getItem(this.state.itemId);
    }

    renderItem(item) {
        return (
            <>
                <div>
                    <h4>Order</h4>
                    <hr />
                    <dt className="col-sm-2">
                    User
                    </dt>
                    <dd className="col-sm-10">
                        {item.user.name + '  ' + item.user.surname}
                    </dd>
                    <dt className="col-sm-2">
                        Computer assembly
                    </dt>
                    <dd className="col-sm-10">
                        {item.computerAssemblyId}
                    </dd>
                    <dt className="col-sm-2">
                        Total price
                    </dt>
                    <dd className="col-sm-10">
                        {item.totalPrice}
                    </dd>
                </div>
                <div>
                    <a onClick={(ev) => {
                        this.setTypePage("Edit", item.id);
                    } }>Edit</a> |
                    <a onClick={(ev) => {
                        this.setTypePage("Index");
                    }}>Back</a>
                </div>
            </>

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
        const response = await fetch('orders/detail?id=' + 1);
        const data = await response.json();

        this.setState({ item: data, loading: false });
    }
}