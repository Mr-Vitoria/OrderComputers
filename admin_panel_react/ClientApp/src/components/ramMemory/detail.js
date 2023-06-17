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
                    <h4>Оперативная память</h4>
                    <hr />

                    <dl className="row">
                        <dt className="col-sm-2">
                            Изображение
                        </dt>
                        <dd className="col-sm-10">
                            <img src={item.imgUrl} />
                        </dd>
                        <dt className="col-sm-2">
                            Название
                        </dt>
                        <dd className="col-sm-10">
                            {item.name }
                        </dd>
                        <dt className="col-sm-2">
                            Тип
                        </dt>
                        <dd className="col-sm-10">
                            {item.type}
                        </dd>
                        <dt className="col-sm-2">
                            Объем(Мб)
                        </dt>
                        <dd className="col-sm-10">
                            {item.count }
                        </dd>
                        <dt className="col-sm-2">
                            Частота(МГц)
                        </dt>
                        <dd className="col-sm-10">
                            {item.frequency}
                        </dd>
                        <dt className="col-sm-2">
                            Цена
                        </dt>
                        <dd className="col-sm-10">
                            {item.price }
                        </dd>
                    </dl>
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
        const response = await fetch('rammemories/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ items: data, loading: false });
        } else {

            Layout.setMessage('Ошибка при получении RAM: ' + response.status);
        }
    }
}