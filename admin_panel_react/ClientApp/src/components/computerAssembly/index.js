import React, { Component } from 'react';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [], loading: true };
        this.setTypePage = props.setTypePage;
    }

    componentDidMount() {
        this.getItem();
    }

    renderCompBodiesTable(items) {
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
                                {item.compBody.name}
                            </td>
                            <td>
                                {item.compProcessor.name}
                            </td>
                            <td>
                                {item.motherCard.name}
                            </td>
                            <td>
                                {item.powerSupplyUnit.name}
                            </td>
                            <td>
                                {item.ramMemory.name}
                            </td>
                            <td>
                                {item.storageDevice.name}
                            </td>
                            <td>
                                {item.videoCard.name}
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
            ? <p><em>Loading...</em></p>
            : this.renderCompBodiesTable(this.state.items);

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

    async getItem() {
        const response = await fetch('computerassemblies');
        const data = await response.json();

        this.setState({ items: data, loading: false });
    }

    async deleteItem(Id) {
        const response = await fetch('computerassemblies/delete?id=' + Id);
        //Сделай обработку ошибок

        const response2 = await fetch('computerassemblies');
        const data = await response2.json();
        this.setState({ items: data, loading: false });

    }
}