import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ""
        }

        this.inputNameRef = React.createRef();
        this.inputProducerRef = React.createRef();
        this.inputFamilyRef = React.createRef();
        this.inputGenerationRef = React.createRef();
        this.inputSeriesRef = React.createRef();
        this.inputTypeRef = React.createRef();
        this.inputCountRef = React.createRef();
        this.inputPriceRef = React.createRef();


        this.setTypePage = props.setTypePage;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label">Название</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Производитель</label>
                                <input ref={this.inputProducerRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Семейство</label>
                                <input ref={this.inputFamilyRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Поколение</label>
                                <input ref={this.inputGenerationRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Серия</label>
                                <input ref={this.inputSeriesRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Тип памяти</label>
                                <select ref={this.inputTypeRef} className="form-control">
                                    <option value="GDDR2">GDDR2</option>
                                    <option value="GDDR3">GDDR3</option>
                                    <option value="GDDR4">GDDR4</option>
                                    <option value="GDDR5">GDDR5</option>
                                    <option value="GDDR6">GDDR6</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Объем(Mb)</label>
                                <input ref={this.inputCountRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">URL изображения</label>
                                <input onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }}
                                 className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Цена</label>
                                <input ref={this.inputPriceRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createItem();
                                }} className="btn btn-primary">Добавить</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <a onClick={(ev) => {

                        this.setTypePage("Index");
                    }
                    }>Вернуться к списку</a>
                </div>
            </div>
        );
    }

    async createItem() {
        const response = await fetch('videocards/create?'
            + 'name=' + this.inputNameRef.current.value
            + '&producer=' + this.inputProducerRef.current.value
            + '&family=' + this.inputFamilyRef.current.value
            + '&generation=' + this.inputGenerationRef.current.value
            + '&series=' + this.inputSeriesRef.current.value
            + '&type=' + this.inputTypeRef.current.value
            + '&count=' + this.inputCountRef.current.value
            + '&imgUrl=' + this.state.imageUrl
            + '&price=' + this.inputPriceRef.current.value);
        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Видеокарта добавлена! ');
        } else {

            Layout.setMessage('Ошибка при добавлении видеокарты: ' + response.status);
        }
    }
}