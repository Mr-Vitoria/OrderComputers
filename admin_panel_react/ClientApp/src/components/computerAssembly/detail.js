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
                    <h4>Computer assembly</h4>
                    <hr />
                    <dt className="col-sm-2">
                    Computer body
                    </dt>
                    <dd className="col-sm-10">
                        {item.compBody.name}
                    </dd>
                    <dt className="col-sm-2">
                        Computer processor
                    </dt>
                    <dd className="col-sm-10">
                        {item.compProcessor.name}
                    </dd>
                    <dt className="col-sm-2">
                        Mother card
                    </dt>
                    <dd className="col-sm-10">
                        {item.motherCard.name}
                    </dd>
                    <dt className="col-sm-2">
                        Power Supply Unit
                    </dt>
                    <dd className="col-sm-10">
                        {item.powerSupplyUnit.name}
                    </dd>
                    <dt className="col-sm-2">
                        RAM memory
                    </dt>
                    <dd className="col-sm-10">
                        {item.ramMemory.name}
                    </dd>
                    <dt className="col-sm-2">
                        Storage device
                    </dt>
                    <dd className="col-sm-10">
                        {item.storageDevice.name}
                    </dd>
                    <dt className="col-sm-2">
                        Video card
                    </dt>
                    <dd className="col-sm-10">
                        {item.videoCard.name}
                    </dd>
                    <dt className="col-sm-2">
                        Owner
                    </dt>
                    <dd className="col-sm-10">
                        {item.owner.name}
                    </dd>
                    <dt className="col-sm-2">
                        Cost price
                    </dt>
                    <dd className="col-sm-10">
                        {item.costPrice}
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
        const response = await fetch('computerassemblies/detail?id=' + 1);
        const data = await response.json();

        this.setState({ item: data, loading: false });
    }
}