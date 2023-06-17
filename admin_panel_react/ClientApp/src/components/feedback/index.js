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
                            Пользователь
                        </th>
                        <th>
                            Сообщение
                        </th>
                        <th>
                            Дата
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(item =>
                        <tr key={item.id}>
                            <td>
                                {item.user.name}
                            </td>
                            <td>
                                {item.text}
                            </td>
                            <td>
                                {item.date}
                            </td>
                            
                            <td>
                                <a onClick={(ev) => {
                                    this.setTypePage("Edit", item.id);
                                }}>Изменить</a> |
                                <a onClick={(ev) => {
                                    this.setTypePage("Detail", item.id);
                                }}>Подробнее</a> |
                                <a onClick={(ev) => {
                                    this.deleteItem(item.id);
                                }}>Удалить</a>
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
                    }>Добавить отзыв</a>
                </p>
                {contents}
            </div>
        );
    }

    async getItems() {
        const response = await fetch('feedbacks');
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ items: data, loading: false });
        }
        else {

            Layout.setMessage('Ошибка при получении отзывов: ' + response.status);
        }

    }

    async deleteItem(Id) {
        const response = await fetch('feedbacks/delete?id=' + Id);
        if (response.status == 200) {

            Layout.setMessage('Отзыв удален! ');
            this.getItems();
        }

    }
}