import React, { Component } from 'react';
import {Layout} from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl:""
        }

        this.inputNameRef = React.createRef();
        this.inputFormFactorRef = React.createRef();
        this.inputPriceRef = React.createRef();

        this.setTypePage = props.setTypePage;
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label className="control-label">Название</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Форм фактор</label>
                                <select ref={this.inputFormFactorRef} className="form-control">
                                    <option value="Super/Ultra Tower">Super/Ultra Tower</option>
                                    <option value="Full Tower">Full Tower</option>
                                    <option value="Mid Tower">Mid Tower</option>
                                    <option value="Mini Tower">Mini Tower</option>
                                    <option value="Small form factor">Small form factor</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Цена</label>
                                <input ref={this.inputPriceRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">URL изображения</label>
                                <input onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createItem();
                                }} className="btn btn-dark" >Добавить</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    <a onClick={(ev) => {

                        this.setTypePage("Index");
                    }
                    }>Back to list</a>
                </div>
            </div>
        );
    }

    async createItem() {
        const response = await fetch('compbodies/create?name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&imgUrl=' + this.state.imageUrl
            + '&formFactor=' + this.inputFormFactorRef.current.value);

        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Новый корпус был добавлен');
        }
        else {
            Layout.setMessage('Ошибка: ' + response.status);

        }
    }
}