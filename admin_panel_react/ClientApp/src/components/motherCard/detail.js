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
                    <h4>Detail mother card</h4>
                    <hr />
                    <dl classNameName="row">
                        <dt classNameName="col-sm-2">
                            Name
                        </dt>
                        <dd className="col-sm-10">
                            {item.name }
                        </dd>
                        <dt className="col-sm-2">
                            Size
                        </dt>
                        <dd className="col-sm-10">
                            {item.size}
                        </dd>
                        <dt className="col-sm-2">
                            Socket
                        </dt>
                        <dd className="col-sm-10">
                            {item.socket }
                        </dd>
                        <dt className="col-sm-2">
                            HaveWiFiModul
                        </dt>
                        <dd className="col-sm-10">
                            {item.haveWiFiModul }
                        </dd>
                        <dt className="col-sm-2">
                            HaveBluetoothModul
                        </dt>
                        <dd className="col-sm-10">
                            {item.haveBluetoothModul}
                        </dd>
                        <dt className="col-sm-2">
                            Price
                        </dt>
                        <dd className="col-sm-10">
                            {item.price }
                        </dd>
                    </dl>
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
            : this.renderItem(this.state.items);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('mothercards/detail?id=' + Id);
        const data = await response.json();

        console.log(data);
        this.setState({ items: data, loading: false });
    }
}