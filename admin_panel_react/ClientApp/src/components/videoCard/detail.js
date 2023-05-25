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
            ? <p><em>Loading...</em></p>
            : this.renderItem(this.state.items);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('videocards/detail?id=' + Id);
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }
}