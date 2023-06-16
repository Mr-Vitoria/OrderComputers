import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            itemId: props.itemId,
            imageUrl: ""
        };
        this.setTypePage = props.setTypePage;


        this.inputNameRef = React.createRef();
        this.inputProducerRef = React.createRef();
        this.inputSocketRef = React.createRef();
        this.inputCoresRef = React.createRef();
        this.inputThreadsRef = React.createRef();
        this.inputFrequencyRef = React.createRef();
        this.inputVideoCardRef = React.createRef();
        this.inputRamRef = React.createRef();
        this.inputPriceRef = React.createRef();
        this.inputIdRef = React.createRef();
    }

    componentDidMount() {
        this.getItem(this.state.itemId);

    }

    renderItem(item) {
        return (
            <>
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <form>
                                <input ref={this.inputIdRef} type="hidden" defaultValue={item.id}></input>
                                <div className="form-group">
                                    <label className="control-label">Название</label>
                                    <input ref={this.inputNameRef} className="form-control" defaultValue={item.name } />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Производитель</label>
                                    <input ref={this.inputProducerRef} className="form-control" defaultValue={item.producer} />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Сокет</label>
                                    <input ref={this.inputSocketRef} className="form-control" defaultValue={item.socket} />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Количество ядер</label>
                                    <input ref={this.inputCoresRef} className="form-control" type="number" defaultValue={item.countCores} />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Количество потоков</label>
                                    <input ref={this.inputThreadsRef} className="form-control" type="number" defaultValue={item.countThreads} />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Частота(MGz)</label>
                                    <input ref={this.inputFrequencyRef} className="form-control" type="number" defaultValue={item.frequency} />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Тип поддерживаемой RAM</label>
                                    <select ref={this.inputRamRef} className="form-control" defaultValue={item.typeRam}>
                                        <option value="DDR2">DDR2</option>
                                        <option value="DDR3">DDR3</option>
                                        <option value="DDR4">DDR4</option>
                                        <option value="DDR5">DDR5</option>
                                    </select>
                                </div>
                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" ref={this.inputVideoCardRef} defaultChecked={item.haveVideoCard} /> Имеет встроенное видеоядро?
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label className="control-label">URL изображения</label>
                                    <input defaultValue={this.state.imageUrl} onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                                </div>
                                <div className="form-group">
                                    <img src={this.state.imageUrl} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Цена</label>
                                    <input ref={this.inputPriceRef} className="form-control" defaultValue={item.price} />
                                </div>
                                <div className="form-group">
                                    <button onClick={(ev) => {
                                        ev.preventDefault();
                                        this.editItem();
                                    }} className="btn btn-dark" >Сохранить</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div>
                        <a onClick={(ev) => {

                            this.setTypePage("Index");
                        }
                        }>Вернуться к списку процессоров</a>
                    </div>
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
        const response = await fetch('compprocessors/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false, imageUrl: data.imgUrl });
        }
        else {

            Layout.setMessage('Ошибка при получении данных о процессоре: ' + response.status);
        }
    }

    async editItem() {
        const response = await fetch('compprocessors/edit?id=' + this.inputIdRef.current.value
            + '&name= ' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&producer=' + this.inputProducerRef.current.value
            + '&socket=' + this.inputSocketRef.current.value
            + '&countCores=' + this.inputCoresRef.current.value
            + '&countThreads=' + this.inputThreadsRef.current.value
            + '&frequency=' + this.inputFrequencyRef.current.value
            + '&turboTechnology=' + this.inputTurboRef.current.value
            + '&haveVideoCard=' + this.inputVideoCardRef.current.checked
            + '&imgUrl=' + this.state.imageUrl
            + '&typeRam=' + this.inputRamRef.current.value);

        if (response.status == 200) {

            Layout.setMessage('Процессор был изменен!');
            this.setTypePage("Index");
        }
        else {

            Layout.setMessage('Ошибка при изменении процессора: ' + response.status);
        }
    }
}