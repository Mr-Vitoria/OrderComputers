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
                    <h4>Computer assembly</h4>
                    <hr />
                    <dt className="col-sm-2">
                        Image
                    </dt>
                    <dd className="col-sm-10">
                        <img style={{ width: '400px', height: '300px', objectFit: 'cover' }} src={item.imgUrl} alt="Please, change image" />
                    </dd>
                    <dt className="col-sm-2">
                        Name
                    </dt>
                    <dd className="col-sm-10">
                        {item.name}
                    </dd>
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
                        {item.videoCard != null?item.videoCard.name:null}
                    </dd>
                    <dt className="col-sm-2">
                        Owner
                    </dt>
                    <dd className="col-sm-10">
                        {item.owner.name}
                    </dd>
                    <dt className="col-sm-2">
                        Type computer assembly
                    </dt>
                    <dd className="col-sm-10">
                        {item.typeComputerAssembly}
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
        const response = await fetch('computerassemblies/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false });
        }
        else {

            Layout.setMessage('Error get computer assembly: ' + response.statusText);
        }
    }
}