import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
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
                    <h4>Сборка ПК</h4>
                    <hr />
                    <dt className="col-sm-2">
                        Изображение
                    </dt>
                    <dd className="col-sm-10">
                        <img style={{ width: '400px', height: '300px', objectFit: 'cover' }} src={item.imgUrl} alt="Please, change image" />
                    </dd>
                    <dt className="col-sm-2">
                        Название
                    </dt>
                    <dd className="col-sm-10">
                        {item.name}
                    </dd>
                    <dt className="col-sm-2">
                        Корпус
                    </dt>
                    <dd className="col-sm-10">
                        {item.compBody != null ? item.compBody.name : "Не добавлен"}
                    </dd>
                    <dt className="col-sm-2">
                        Процессор
                    </dt>
                    <dd className="col-sm-10">
                        {item.compProcessor != null ? item.compProcessor.name : "Не добавлен"}
                    </dd>
                    <dt className="col-sm-2">
                        Материнская плата
                    </dt>
                    <dd className="col-sm-10">
                        {item.motherCard != null ? item.motherCard.name : "Не добавлен"}
                    </dd>
                    <dt className="col-sm-2">
                        Блок питания
                    </dt>
                    <dd className="col-sm-10">
                        {item.powerSupplyUnit != null ? item.powerSupplyUnit.name : "Не добавлен"}
                    </dd>
                    <dt className="col-sm-2">
                        Оперативная память
                    </dt>
                    <dd className="col-sm-10">
                        {item.ramMemory != null ? item.ramMemory.name : "Не добавлен"}
                    </dd>
                    <dt className="col-sm-2">
                        Запоминающее устройство
                    </dt>
                    <dd className="col-sm-10">
                        {item.storageDevice != null ? item.storageDevice.name : "Не добавлен"}
                    </dd>
                    <dt className="col-sm-2">
                        Видеокарта
                    </dt>
                    <dd className="col-sm-10">
                        {item.videoCard != null ? item.videoCard.name : "Не добавлен"}
                    </dd>
                    <dt className="col-sm-2">
                        Тип сборки
                    </dt>
                    <dd className="col-sm-10">
                        {item.typeComputerAssembly}
                    </dd>
                    <dt className="col-sm-2">
                        Цена
                    </dt>
                    <dd className="col-sm-10">
                        {item.costPrice}
                    </dd>
                </div>
                <div>
                    <a onClick={(ev) => {
                        this.setTypePage("Edit", item.id);
                    }}>Изменить</a> |
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
        const response = await fetch('computerassemblies/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false });
        }
        else {

            Layout.setMessage('Ошибка при получении данных: ' + response.status);
        }
    }
}