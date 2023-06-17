import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: [],
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
                    <h4>Заказ</h4>
                    <hr />
                    <dt className="col-sm-2">
                        Пользователь
                    </dt>
                    <dd className="col-sm-10">
                        {item.user.name}
                    </dd>
                    <dt className="col-sm-2">
                        Тип заказа
                    </dt>
                    <dd className="col-sm-10">
                        {item.typeOrder}
                    </dd>
                    {item.typeOrder == "Full" ?
                        <>
                            <dt className="col-sm-2">
                                Сборка ПК
                            </dt>
                            <dd className="col-sm-10">
                                {item.computerAssembly.name}
                            </dd>
                        </>
                        :
                        <>
                            <dt className="col-sm-2">
                                Бюджет
                            </dt>
                            <dd className="col-sm-10">
                                {item.budjet}
                            </dd>
                            <dt className="col-sm-2">
                                Комментарий
                            </dt>
                            <dd className="col-sm-10">
                                {item.comment}
                            </dd>
                        </>
                    }
                    <dt className="col-sm-2">
                        Дата заказа
                    </dt>
                    <dd className="col-sm-10">
                        {item.orderDate}
                    </dd>
                    <dt className="col-sm-2">
                        Статус
                    </dt>
                    <dd className="col-sm-10">
                        {item.status}
                    </dd>
                    <dt className="col-sm-2">
                        Периферия
                    </dt>
                    {item.orderPeripheries.map((orderPeriphery, index) => {
                        return <dd key={index} className="col-sm-10">
                            {orderPeriphery.periphery.name}
                        </dd>
                    })}
                    <dt className="col-sm-2">
                        Итоговая цена
                    </dt>
                    <dd className="col-sm-10">
                        {item.totalPrice}
                    </dd>
                </div>
                <div>
                    <a onClick={(ev) => {
                        this.setTypePage("Edit", item.id);
                    } }>Изменить</a> |
                    <a onClick={(ev) => {
                        this.setTypePage("Index");
                    }}>Вернуться</a>
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
        const response = await fetch('orders/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false });
        }
        else {

            Layout.setMessage('Ошибка при получении заказа: ' + response.status);
        }
    }
}