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
        this.inputSocketRef = React.createRef();
        this.inputCoresRef = React.createRef();
        this.inputThreadsRef = React.createRef();
        this.inputFrequencyRef = React.createRef();
        this.inputVideoCardRef = React.createRef();
        this.inputRamRef = React.createRef();
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
                                <label className="control-label">Производитель</label>
                                <input ref={this.inputProducerRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Сокет</label>
                                <input ref={this.inputSocketRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Количество ядер</label>
                                <input ref={this.inputCoresRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Количество потоков</label>
                                <input ref={this.inputThreadsRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Частота(MGz)</label>
                                <input ref={this.inputFrequencyRef} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Тип поддерживаемой RAM</label>
                                <select ref={this.inputRamRef} className="form-control">
                                    <option value="DDR2">DDR2</option>
                                    <option value="DDR3">DDR3</option>
                                    <option value="DDR4">DDR4</option>
                                    <option value="DDR5">DDR5</option>
                                </select>
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" ref={this.inputVideoCardRef} /> Имеет встроенное видеоядро?
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="control-label">URL изображения</label>
                                <input onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} alt='Загрузите другое изображение'/>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Цена</label>
                                <input ref={this.inputPriceRef} className="form-control" />
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
                    }>Вернуться</a>
                </div>
            </div>
        );
    }

    async createItem() {

        const response = await fetch('compprocessors/create?name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&producer=' + this.inputProducerRef.current.value
            + '&socket=' + this.inputSocketRef.current.value
            + '&countCores=' + this.inputCoresRef.current.value
            + '&countThreads=' + this.inputThreadsRef.current.value
            + '&frequency=' + this.inputFrequencyRef.current.value
            + '&haveVideoCard=' + this.inputVideoCardRef.current.checked
            + '&imgUrl=' + this.state.imageUrl
            + '&typeRam=' + this.inputRamRef.current.value);

        if (response.status == 200) {

            Layout.setMessage('Процессор был добавлен');
            this.setTypePage("Index");
        }
        else {

            Layout.setMessage('Ошибка при добавлении процессора: ' + response.status);
        }
    }
}