import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            data: null,
            loading: true,
            itemId: props.itemId,
            imageUrl:""
        };
        this.setTypePage = props.setTypePage;

        this.inputIdRef = React.createRef();
        this.inputBodyIdRef = React.createRef();
        this.inputProcIdeRef = React.createRef();
        this.inputMotherIdRef = React.createRef();
        this.inputPowerIdRef = React.createRef();
        this.inputRAMIdRef = React.createRef();
        this.inputStorageIdRef = React.createRef();
        this.inputVideoIdRef = React.createRef();
        this.inputCostPriceRef = React.createRef();
        this.inputTypeRef = React.createRef();
        this.inputNameRef = React.createRef();
    }

    componentDidMount() {
        this.getItem(this.state.itemId);

    }

    renderItem(data, item) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <input defaultValue={item.id } ref={this.inputIdRef} type="hidden" className="form-control" />
                            <div className="form-group">
                                <label className="control-label">Название</label>
                                <input defaultValue={item.name} type="text" ref={this.inputNameRef} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Корпус</label>
                                <select defaultValue={item.compBodyId} ref={this.inputBodyIdRef} className="form-control">
                                    {data.compBodies.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Процессор</label>
                                <select defaultValue={item.compProcessorId} ref={this.inputProcIdeRef} className="form-control">
                                    {data.compProcessors.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Материнская плата</label>
                                <select defaultValue={item.motherCardId} ref={this.inputMotherIdRef} className="form-control">
                                    {data.motherCards.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Блок питания</label>
                                <select defaultValue={item.powerSupplyUnitId} ref={this.inputPowerIdRef} className="form-control">
                                    {data.powerSupplyUnits.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Оперативная память</label>
                                <select defaultValue={item.ramMemoryId}  ref={this.inputRAMIdRef} className="form-control">
                                    {data.ramMemories.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>


                            <div className="form-group">
                                <label className="control-label">Запоминающее устройство</label>
                                <select defaultValue={item.storageDeviceId} ref={this.inputStorageIdRef} className="form-control">
                                    {data.storageDevices.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Видеокарта</label>
                                <select defaultValue={item.videoCardId} ref={this.inputVideoIdRef} className="form-control">
                                    <option value="-1">Без видеокарты</option>
                                    {data.videoCards.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Тип сборки</label>
                                <select defaultValue={item.typeComputerAssembly} ref={this.inputTypeRef} className="form-control">
                                    <option value="Игровые">Игровая</option>
                                    <option value="Офисные">Офисная</option>
                                    <option value="Повседневные">Повседневная</option>
                                    <option value="Пользовательские">Пользовательская</option>
                                </select>
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
                                <input ref={this.inputCostPriceRef} defaultValue={item.costPrice} className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.editItem();
                                }} className="btn btn-primary">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    <a onClick={(ev) => {

                        this.setTypePage("Index");
                    }
                    }>Вернуться к списку сборок</a>
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
            : this.renderItem(this.state.data, this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('computerassemblies/detail?id=' + Id);
        const responseSelectList = await fetch('computerassemblies/getselectlists');
        if (response.status == 200 && responseSelectList.status == 200) {

            const data = await response.json();
            const selectList = await responseSelectList.json();
            this.setState({ item: data, data: selectList, loading: false, imageUrl: data.imgUrl });
        }
        else {

            Layout.setMessage('Ошибка при получении данных:' + response.status 
                            + '\n Списка данных: '+ responseSelectList.status);
        }
    }

    async editItem() {

        const response = await fetch('computerassemblies/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
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

            this.setTypePage("Index");
            Layout.setMessage('Сборка была изменена! ');
        }
        else {
            Layout.setMessage('Ошибка при изменении сборки: ' + response.status);
        }
    }
}