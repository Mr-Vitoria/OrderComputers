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
                            Name
                        </th>
                        <th>
                            Producer
                        </th>
                        <th>
                            Family
                        </th>
                        <th>
                            Generation
                        </th>
                        <th>
                            Series
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Count
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
                            <td>
                                {item.name }
                            </td>
                            <td>
                                {item.producer}
                            </td>
                            <td>
                                {item.family}
                            </td>
                            <td>
                                {item.generation}
                            </td>
                            <td>
                                {item.series}
                            </td>
                            <td>
                                {item.type }
                            </td>
                            <td>
                                {item.count }
                            </td>
                            <td>
                                {item.price }
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
                    }>Add video card</a>
                </p>
                {contents}
            </div>
        );
    }

    async getItem() {
        const response = await fetch('videocards');
        const data = await response.json();

        this.setState({ items: data, loading: false });
    }

    async deleteItem(Id) {
        const response = await fetch('videocards/delete?id=' + Id);
        //Сделай обработку ошибок

        const response2 = await fetch('videocards');
        const data = await response2.json();
        this.setState({ items: data, loading: false });

    }
}