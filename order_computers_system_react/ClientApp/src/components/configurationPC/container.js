import React, { Component } from 'react';
import '../../public/css/configurationPC.css';
import '../../public/js/configurationPC.js';
import SelectMenuProcessor from './selectMenuProcessors'
import SelectMenuBodies from './selectMenuBodies'
import SelectMenuMotherCards from './selectMenuMotherCards'
import SelectMenuPowerUnit from './selectMenuPowerUnit'
import SelectMenuRam from './selectMenuRam'
import SelectMenuStorageDevice from './selectMenuStorageDevice'
import SelectMenuVideoCard from './selectMenuVideoCards'
import SelectMenuMonitors from './selectMenuMonitors'
import SelectMenuSpeakers from './selectMenuSpeakers'
import SelectMenuMouses from './selectMenuMouses'
import SelectMenuKeyboards from './selectMenuKeyboards'

export class ConfigurationPCContainer extends Component {
    static displayName = ConfigurationPCContainer.name;

    constructor(props) {
        super(props);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today.setDate(today.getDate() + 3);
        var dd2 = String(today.getDate()).padStart(2, '0');
        var mm2 = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy2 = today.getFullYear();

        this.state = {
            model: null,
            loading: true,
            selectProcessor: null,
            selectRam: null,
            selectMotherCard: null,
            selectPowerUnit: null,
            selectRam: null,
            selectStorageDevice: null,
            selectVideoCard: null,
            selectMonitor: null,
            selectSpeaker: null,
            selectMouse: null,
            selectKeyboard: null,

            amountComponents: 0,
            amountAssembly: 0,
            totalAmount: 0,
            today: dd + '.' + mm + '.' + yyyy,
            nextDay: dd2 + '.' + mm2 + '.' + yyyy2
        };
        this.changeBody = this.changeBody.bind(this);
        this.changeProcessor = this.changeProcessor.bind(this);
        this.changeMotherCard = this.changeMotherCard.bind(this);
        this.changePowerUnit = this.changePowerUnit.bind(this);
        this.changeRam = this.changeRam.bind(this);
        this.changeStorageDevice = this.changeStorageDevice.bind(this);
        this.changeVideoCard = this.changeVideoCard.bind(this);
        this.changeMonitor = this.changeMonitor.bind(this);
        this.changeSpeaker = this.changeSpeaker.bind(this);
        this.changeMouse = this.changeMouse.bind(this);
        this.changeKeyboard = this.changeKeyboard.bind(this);


        this.calculatePrice = this.calculatePrice.bind(this);
    }

    calculatePrice() {
        let amountComponents = 0 + (this.state.selectBody != null ? this.state.selectBody.price : 0)
            + (this.state.selectProcessor != null ? this.state.selectProcessor.price : 0)
            + (this.state.selectMotherCard != null ? this.state.selectMotherCard.price : 0)
            + (this.state.selectPowerUnit != null ? this.state.selectPowerUnit.price : 0)
            + (this.state.selectRam != null ? this.state.selectRam.price : 0)
            + (this.state.selectStorageDevice != null ? this.state.selectStorageDevice.price : 0)
            + (this.state.selectVideoCard != null ? this.state.selectVideoCard.price : 0);

        let amountAssembly = amountComponents + (this.state.selectSpeaker != null ? this.state.selectSpeaker.price : 0)
            + (this.state.selectMonitor !=null ? this.state.selectMonitor.price : 0)
            + (this.state.selectMouse != null ? this.state.selectMouse.price : 0)
            + (this.state.selectKeyboard != null ? this.state.selectKeyboard.price : 0);


        let totalAmount = amountAssembly * 1.1;

        totalAmount = Math.trunc(totalAmount * 100)/100;

        this.setState({
            amountComponents: amountComponents,
            amountAssembly: amountAssembly,
            totalAmount: totalAmount
        });
    }

    changeProcessor(item) {
        //var model = this.state.model;
        //model.compProcessors.shift();
        this.setState({
            selectProcessor: item
            //model:model
        }, () => {
            this.calculatePrice();
        });
    }
    changeBody(item) {
        this.setState({
            selectBody: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeMotherCard(item) {
        this.setState({
            selectMotherCard: item
        }, () => {
            this.calculatePrice();
        });
    }
    changePowerUnit(item) {
        this.setState({
            selectPowerUnit: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeRam(item) {
        this.setState({
            selectRam: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeStorageDevice(item) {
        this.setState({
            selectStorageDevice: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeVideoCard(item) {
        this.setState({
            selectVideoCard: item
        }, () => {
            this.calculatePrice();
        });;
    }
    changeMonitor(item) {
        this.setState({
            selectMonitor: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeSpeaker(item) {
        this.setState({
            selectMonitor: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeMouse(item) {
        this.setState({
            selectMonitor: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeKeyboard(item) {
        this.setState({
            selectMonitor: item
        }, () => {
            this.calculatePrice();
        });
    }

    componentDidMount() {
        this.getModel();
    }

    renderModel(model) {

        return (
            <>
                <h1>Конфигуратор </h1>
                <section>
                    <h2>Основные комплектующие</h2>
                    <div className="form-group">

                        <SelectMenuProcessor model={this.state.model.compProcessors} changeItem={this.changeProcessor} />
                    </div>
                    <div className="form-group">

                        <SelectMenuBodies model={model.compBodies} changeItem={this.changeBody} />
                    </div>
                    <div className="form-group">

                        <SelectMenuMotherCards model={model.motherCards} changeItem={this.changeMotherCard} />
                    </div>
                    <div className="form-group">

                        <SelectMenuPowerUnit model={model.powerSupplyUnits} changeItem={this.changePowerUnit} />
                    </div>
                    <div className="form-group">

                        <SelectMenuRam model={model.ramMemories} changeItem={this.changeRam} />
                    </div>
                    <div className="form-group">

                        <SelectMenuStorageDevice model={model.storageDevices} changeItem={this.changeStorageDevice} />
                    </div>
                    <div className="form-group">

                        <SelectMenuVideoCard model={model.videoCards} changeItem={this.changeVideoCard} />
                    </div>
                </section>
                <section>
                    <h2>Периферия</h2>
                    <div className="form-group">

                        <SelectMenuMonitors model={model.monitors} changeItem={this.changeMonitor} />
                    </div>
                    <div className="form-group">

                        <SelectMenuSpeakers model={model.speakers} changeItem={this.changeSpeaker} />
                    </div>
                    <div className="form-group">

                        <SelectMenuMouses model={model.mouses} changeItem={this.changeMouse} />
                    </div>
                    <div className="form-group">

                        <SelectMenuKeyboards model={model.keyboards} changeItem={this.changeKeyboard} />
                    </div>
                </section>

                <section>
                    <h2>Итого</h2>

                    <div className="form-group total">
                        <div>
                            <span>Сумма комплектующих: {this.state.amountComponents}</span>
                        </div>
                        <div>
                            <span>Дата создания заказа: {this.state.today}</span>
                        </div>
                        <div>
                            <span>Сумма сборки: {this.state.amountAssembly}</span>
                        </div>
                        <div>
                            <span>Примерная дата готовности: {this.state.nextDay}</span>
                        </div>
                        <div>
                            <span>Итоговая сумма: {this.state.totalAmount}</span>
                        </div>
                    </div>
                </section>

                <div className="form-group btnForm">
                    <a onClick={(ev) => {
                        console.log(this.state.selectProcessor);
                        console.log(this.state.selectBody);
                        console.log(this.state.selectMotherCard);
                    }} className="btn btn-dark btnOrder">Заказать</a>
                </div>

            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p>Загрузка...</p>
            : this.renderModel(this.state.model);

        return (
            <div>
                {contents}
            </div>
        );
    }


    async getModel() {
        const response = await fetch('ordersystem/getconfigurationmodel');
        const data = await response.json();
        console.log(data);
        this.setState({ model: data, loading: false });
    }
}