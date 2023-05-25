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
        this.getCompBody(this.state.itemId);
    }

    renderCompBody(item) {
        return (
            <>
                <div>
                    <h4>Detail comp body</h4>
                    <hr />
                    <dl className="row">
                        <dt className="col-sm-2">
                            Name
                        </dt>
                        <dd className="col-sm-10">
                            {item.name}
                        </dd>
                        <dt className="col-sm-2">
                            Form factor
                        </dt>
                        <dd className="col-sm-10">
                            {item.formFactor}
                        </dd>
                        <dt className="col-sm-2">
                            Price
                        </dt>
                        <dd className="col-sm-10">
                            {item.price}
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
            : this.renderCompBody(this.state.items);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getCompBody(Id) {
        const response = await fetch('compbodies/detail?id=' + Id);
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }
}