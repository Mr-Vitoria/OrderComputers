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
                    <h4>Detail video card</h4>
                    <hr />
                    <dl classNameName="row">
                        <dt classNameName="col-sm-2">
                            Name
                        </dt>
                        <dd className="col-sm-10">
                            {item.name }
                        </dd>
                        <dt classNameName="col-sm-2">
                            Producer
                        </dt>
                        <dd className="col-sm-10">
                            {item.producer}
                        </dd>
                        <dt classNameName="col-sm-2">
                            Family
                        </dt>
                        <dd className="col-sm-10">
                            {item.family}
                        </dd>
                        <dt classNameName="col-sm-2">
                            Generation
                        </dt>
                        <dd className="col-sm-10">
                            {item.generation}
                        </dd>
                        <dt classNameName="col-sm-2">
                            Series
                        </dt>
                        <dd className="col-sm-10">
                            {item.series}
                        </dd>
                        <dt className="col-sm-2">
                            Type
                        </dt>
                        <dd className="col-sm-10">
                            {item.type}
                        </dd>
                        <dt className="col-sm-2">
                            Count
                        </dt>
                        <dd className="col-sm-10">
                            {item.frequency}
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
        const response = await fetch('videocards/detail?id=' + Id);
        if (response.status == 299) {

            const data = await response.json();
            this.setState({ items: data, loading: false });
        } else {

            Layout.setMessage('Error get video card: ' + response.statusText);
        }
    }
}