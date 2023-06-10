import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [], loading: true };
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
                        Name
                        </th>
                        <th>
                            Producer
                        </th>
                        <th>
                            Socket
                        </th>
                        <th>
                            CountCores
                        </th>
                        <th>
                            CountThreads
                        </th>
                        <th>
                            Frequency
                        </th>
                        <th>
                            TypeRam
                        </th>
                        <th>
                            HaveVideoCard
                        </th>
                        <th>
                            Price
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(item =>
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                {item.producer}
                            </td>
                            <td>
                                {item.socket}
                            </td>
                            <td>
                                {item.countCores}
                            </td>
                            <td>
                                {item.countThreads}
                            </td>
                            <td>
                                {item.frequency}
                            </td>
                            <td>
                                {item.typeRam}
                            </td>
                            <td>
                                {item.haveVideoCard+""}
                            </td>
                            <td>
                                {item.price}
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
                    }>Add computer processor</a>
                </p>
                {contents}
            </div>
        );
    }

    async getItems() {
        const response = await fetch('compprocessors');
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ items: data, loading: false });
        }
        else {

            Layout.setMessage('Error get computer processor list: ' + response.statusText);
        }
    }

    async deleteItem(Id) {
        const response = await fetch('compprocessors/delete?id=' + Id);
        if (response.status == 200) {

            Layout.setMessage('Computer processor was deleted! ');
            this.getItems();
        }
        else {

            Layout.setMessage('Error delete computer processor: ' + response.statusText);
        }


    }
}