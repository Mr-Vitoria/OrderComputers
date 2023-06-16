import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            imageUrl:""
        };
        this.inputBodyIdRef = React.createRef();
        this.inputNameRef = React.createRef();
        this.inputProcIdeRef = React.createRef();
        this.inputMotherIdRef = React.createRef();
        this.inputPowerIdRef = React.createRef();
        this.inputRAMIdRef = React.createRef();
        this.inputStorageIdRef = React.createRef();
        this.inputVideoIdRef = React.createRef();
        this.inputCostPriceRef = React.createRef();
        this.inputTypeRef = React.createRef();


        this.setTypePage = props.setTypePage;
    }

    componentDidMount() {
        this.getData();
    }

    renderForm(data) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <div className="form-group">
                                <label className="control-label">Название</label>
                                <input type="text" ref={this.inputNameRef} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Корпус</label>
                                <select ref={this.inputBodyIdRef} className="form-control" >
                                    {data.compBodies.map((item, index) => {
                                        return <option key={index} value={item.value}>{ item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Процессор</label>
                            <select ref={this.inputProcIdeRef} className="form-control" >
                                {data.compProcessors.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Материнская плата</label>
                            <select ref={this.inputMotherIdRef} className="form-control" >
                                {data.motherCards.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Блок питания</label>
                            <select ref={this.inputPowerIdRef} className="form-control" >
                                {data.powerSupplyUnits.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Оперативная память</label>
                            <select ref={this.inputRAMIdRef} className="form-control" >
                                {data.ramMemories.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>


                            <div className="form-group">
                            <label className="control-label">Запоминающее устройство</label>
                            <select ref={this.inputStorageIdRef} className="form-control" >
                                {data.storageDevices.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Видеокарта</label>
                            <select ref={this.inputVideoIdRef} className="form-control" >
                                <option value="-1">Без видеокарты</option>
                                {data.videoCards.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Тип сборки</label>
                                <select ref={this.inputTypeRef} className="form-control">
                                    <option value="Игровые">Игровая</option>
                                    <option value="Офисные">Офисная</option>
                                    <option value="Повседневные">Повседневная</option>
                                    <option value="Пользовательские">Пользовательская</option>
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
                                <label className="control-label">Стоимость сборки</label>
                                <input ref={this.inputCostPriceRef} className="form-control" type="number" />
                            </div>


                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createItem();
                                }} className="btn btn-primary" >Добавить</button>
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
            : this.renderForm(this.state.data);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getData() {
        const response = await fetch('computerassemblies/getselectlists');
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ data: data, loading: false });
        }
        else {

            Layout.setMessage('Ошибка при получении данных: ' + response.status);
        }
    }

    async createItem() {
        const response = await fetch('computerassemblies/create?'
            + 'name=' + this.inputNameRef.current.value
            + '&compBodyId=' + this.inputBodyIdRef.current.value
            + '&motherCardId=' + this.inputMotherIdRef.current.value
            + '&powerSupplyUnitId=' + this.inputPowerIdRef.current.value
            + '&compProcessorId=' + this.inputProcIdeRef.current.value
            + '&ramMemoryId=' + this.inputRAMIdRef.current.value
            + '&storageDeviceId=' + this.inputStorageIdRef.current.value
            + '&videoCardId=' + this.inputVideoIdRef.current.value
            + '&type=' + this.inputTypeRef.current.value
            + '&imgUrl=' + this.state.imageUrl
            + '&costPrice=' + this.inputCostPriceRef.current.value);


        if (response.status == 200) {

            Layout.setMessage('Сборка добавлена! ');
            this.setTypePage("Index");
        }
        else {

            Layout.setMessage('Ошибка при создании сборки: ' + response.status);
        }
    }
}