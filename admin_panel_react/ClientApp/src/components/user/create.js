import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ""
        }

        this.inputNameRef = React.createRef();
        this.inputLoginRef = React.createRef();
        this.inputEmailRef = React.createRef();
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();
        this.inputTypeRef = React.createRef();


        this.setTypePage = props.setTypePage;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label className="control-label">Имя</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Логин</label>
                                <input ref={this.inputLoginRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Email</label>
                                <input ref={this.inputEmailRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Телефон</label>
                                <input ref={this.inputPhoneRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Пароль</label>
                                <input ref={this.inputPasswordRef} className="form-control" />
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
                                <label className="control-label">Тип аккаунта</label>
                                <select ref={this.inputTypeRef} className="form-control">
                                    <option value="Common">Обычный</option>
                                    <option value="Admin">Администратор</option>
                                </select>
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

        const response = await fetch('users/create?name=' + this.inputNameRef.current.value
            + '&login=' + this.inputLoginRef.current.value
            + '&email=' + this.inputEmailRef.current.value
            + '&phone=' + this.inputPhoneRef.current.value
            + '&password=' + this.inputPasswordRef.current.value
            + '&typeUser=' + this.inputTypeRef.current.value
            + '&imgUrl=' + this.state.imageUrl);

        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Пользователь добавлен! ');
        } else {

            Layout.setMessage('Ошибка при добавлении пользователя: ' + response.status);
        }
    }
}