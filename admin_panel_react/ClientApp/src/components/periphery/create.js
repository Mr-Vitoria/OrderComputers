import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ""
        }

        this.inputNameRef = React.createRef();
        this.inputTypeRef = React.createRef();
        this.inputPriceRef = React.createRef();


        this.setTypePage = props.setTypePage;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form >
                            <div className="form-group">
                                <label className="control-label">Название</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Тип</label>
                                <select ref={this.inputTypeRef} className="form-control">
                                    <option value="Monitor">Монитор</option>
                                    <option value="Speaker/Headphones">Динамики/наушники</option>
                                    <option value="Mouse">Компьютерная мышь</option>
                                    <option value="Keyboard">Клавиатура</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">URL изображения</label>
                                <input onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
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
        const response = await fetch('peripheries/create?'
            + 'name=' + this.inputNameRef.current.value
            + '&type=' + this.inputTypeRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&imgUrl=' + this.state.imageUrl);
        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Периферия была добавлена! ');
        } else {

            Layout.setMessage('Ошибка при добавлении периферии: ' + response.status);
        }
    }
}