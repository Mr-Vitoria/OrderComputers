import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true
        };
        this.setTypePage = props.setTypePage;
    }

    componentDidMount() {
        this.getItems();
    }

    renderItemsTable(items) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Computer body
                        </th>
                        <th>
                            Computer processor
                        </th>
                        <th>
                            Mother card
                        </th>
                        <th>
                            Power Supply Unit
                        </th>
                        <th>
                            RAM memory
                        </th>
                        <th>
                            Storage device
                        </th>
                        <th>
                            Video card
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(item =>
                        <tr key={item.id}>
                            <td>
                                {item.compBody != null ? item.compBody.name:null}
                            </td>
                            <td>
                                {item.compProcessor != null ? item.compProcessor.name:null}
                            </td>
                            <td>
                                {item.motherCard != null ? item.motherCard.name:null}
                            </td>
                            <td>
                                {item.powerSupplyUnit != null ? item.powerSupplyUnit.name:null}
                            </td>
                            <td>
                                {item.ramMemory != null ? item.ramMemory.name:null}
                            </td>
                            <td>
                                {item.storageDevice != null ? item.storageDevice.name:null}
                            </td>
                            <td>
                                {item.videoCard != null ? item.videoCard.name:null}
                            </td>
                            <td>
                                <a onClick={(ev) => {
                                    this.setTypePage("Edit", item.id);
                                }}>Edit</a> |
                                <a onClick={(ev) => {
                                    this.setTypePage("Detail", item.id);
                                }}>Detail</a> |
                                <a onClick={(ev) => {
                                    this.deleteItem(item.id);
                                }}>Delete</a>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
           
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
            : this.renderItemsTable(this.state.items);

        return (
            <div>
                <p>
                    <a onClick={(ev) => {

                        this.setTypePage("Create");
                    }
                    }>Add computer assembly</a>
                </p>
                {contents}
            </div>
        );
    }

    async getItems() {
        const response = await fetch('computerassemblies');
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ items: data, loading: false });
        }
        else {

            Layout.setMessage('Error get computer assembly: ' + response.statusText);
        }

    }

    async deleteItem(Id) {
        const response = await fetch('computerassemblies/delete?id=' + Id);
        if (response.status == 200) {

            Layout.setMessage('Computer assembly was deleted! ');
            this.getItems();
        }

    }
}