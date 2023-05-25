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

    renderCompBody(item) {
        return (
            <>
                <div>
                    <h4>Detail computer processor</h4>
                    <hr />
                    <dl className="row">
                        <dt className="col-sm-2">
                        Name
                        </dt>
                        <dd className="col-sm-10">
                            {item.name }
                        </dd>
                        <dt className="col-sm-2">
                            Producer
                        </dt>
                        <dd className="col-sm-10">
                            {item.producer}
                        </dd>
                        <dt className="col-sm-2">
                            Socket
                        </dt>
                        <dd className="col-sm-10">
                            {item.socket }
                        </dd>
                        <dt className="col-sm-2">
                            CountCores
                        </dt>
                        <dd className="col-sm-10">
                            {item.countCores }
                        </dd>
                        <dt className="col-sm-2">
                            CountThreads
                        </dt>
                        <dd className="col-sm-10">
                            {item.countThreads }
                        </dd>
                        <dt className="col-sm-2">
                            Frequency
                        </dt>
                        <dd className="col-sm-10">
                            {item.frequency }
                        </dd>
                        <dt className="col-sm-2">
                            TurboTechnology
                        </dt>
                        <dd className="col-sm-10">
                            {item.turboTechnology }
                        </dd>
                        <dt className="col-sm-2">
                            TypeRam
                        </dt>
                        <dd className="col-sm-10">
                            {item.typeRam }
                        </dd>
                        <dt className="col-sm-2">
                            HaveVideoCard
                        </dt>
                        <dd className="col-sm-10">
                            {item.haveVideoCard+"" }
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
            : this.renderCompBody(this.state.items);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('compprocessors/detail?id=' + Id);
        const data = await response.json();

        console.log(data);
        this.setState({ items: data, loading: false });
    }
}