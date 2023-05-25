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

    renderItemsTable(items) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            User
                        </th>
                        <th>
                            Computer assembly
                        </th>
                        <th>
                            Total price
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(item =>
                        <tr key={item.id}>
                            <td>
                                {item.user.name + '  ' + item.user.surname}
                            </td>
                            <td>
                                {item.computerAssemblyId}
                            </td>
                            
                            <td>
                                {item.totalPrice}
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
            : this.renderItemsTable(this.state.items);

        return (
            <div>
                <p>
                    <a onClick={(ev) => {

                        this.setTypePage("Create");
                    }
                    }>Add order</a>
                </p>
                {contents}
            </div>
        );
    }

    async getItem() {
        const response = await fetch('orders');
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }

    async deleteItem(Id) {
        const response = await fetch('orders/delete?id=' + Id);
        //Сделай обработку ошибок

        const response2 = await fetch('orders');
        const data = await response2.json();
        this.setState({ items: data, loading: false });

    }
}