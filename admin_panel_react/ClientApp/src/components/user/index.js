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

    renderItem(items) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Surname
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Phone
                        </th>
                        <th>
                            Img url
                        </th>
                        <th>
                            Type user
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
                                {item.surname }
                            </td>
                            <td>
                                {item.email }
                            </td>
                            <td>
                                {item.phone}
                            </td>
                            <td>
                                {item.imgUrl}
                            </td>
                            <td>
                                {item.typeUser}
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
            : this.renderItem(this.state.items);

        return (
            <div>
                <p>
                    <a onClick={(ev) => {

                        this.setTypePage("Create");
                    }
                    }>Add user</a>
                </p>
                {contents}
            </div>
        );
    }

    async getItem() {
        const response = await fetch('users');
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }

    async deleteItem(Id) {
        const response = await fetch('users/delete?id=' + Id);
        //Сделай обработку ошибок

        const response2 = await fetch('users');
        const data = await response2.json();
        this.setState({ items: data, loading: false });

    }
}