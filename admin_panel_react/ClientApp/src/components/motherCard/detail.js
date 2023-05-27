import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
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
            ? <div className="middle">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
                <div className="bar bar4"></div>
                <div className="bar bar5"></div>
                <div className="bar bar6"></div>
                <div className="bar bar7"></div>
                <div className="bar bar8"></div>
            </div>
            : this.renderItem(this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('mothercards/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ items: data, loading: false });
        }
        else {

            Layout.setMessage('Error get mother card: ' + response.statusText);
        }

    }
}