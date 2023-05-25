import React, { Component } from 'react';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [], loading: true };
        this.setTypePage = props.setTypePage;
    }

    componentDidMount() {
        this.getCompBodies();
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
                            Form factor
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
                            <td>{item.formFactor}</td>
                            <td>{item.price}</td>
                            <td>
                                <a onClick={(ev) => {
                                    this.setTypePage("Edit", item.id);
                                }}>Edit</a> |
                                <a onClick={(ev) => {
                                    this.setTypePage("Detail", item.id);
                                }}>Detail</a> |
                                <a onClick={(ev) => {
                                    this.deleteCompBody(item.id);
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
                    }>Add computer body</a>
                </p>
                {contents}
            </div>
        );
    }

    async getCompBodies() {
        const response = await fetch('compbodies');
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }

    async deleteCompBody(Id) {
        const response = await fetch('compbodies/delete?id=' + Id);
        //Сделай обработку ошибок

        const response2 = await fetch('compbodies');
        const data = await response2.json();
        this.setState({ items: data, loading: false });

    }
}