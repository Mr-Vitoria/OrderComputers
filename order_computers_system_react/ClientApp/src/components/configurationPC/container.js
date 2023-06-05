import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../../public/css/configurationPC.css';
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

import SelectBodyFormFactor from './selectBodyFormFactor'

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
            today: mm + '.' + dd + '.' + yyyy,
            nextDay: mm2 + '.' + dd2 + '.' + yyyy2,

            typeConfiguration:"Full"
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
        this.onCreateOrder = this.onCreateOrder.bind(this);

        this.setTypeConfiguration = this.setTypeConfiguration.bind(this);


        this.budjetInputRef = React.createRef();
        this.commentInputRef = React.createRef();
    }

    setTypeConfiguration(Type) {
        this.setState({
            typeConfiguration:Type
        });
    }

    calculatePrice() {
        let amountComponents = 0;
        if (this.state.typeConfiguration == "Full") {
            amountComponents = 0 + (this.state.selectBody != null ? this.state.selectBody.price : 0)
                + (this.state.selectProcessor != null ? this.state.selectProcessor.price : 0)
                + (this.state.selectMotherCard != null ? this.state.selectMotherCard.price : 0)
                + (this.state.selectPowerUnit != null ? this.state.selectPowerUnit.price : 0)
                + (this.state.selectRam != null ? this.state.selectRam.price : 0)
                + (this.state.selectStorageDevice != null ? this.state.selectStorageDevice.price : 0)
                + (this.state.selectVideoCard != null ? this.state.selectVideoCard.price : 0);
        }
        else {
            amountComponents = 0 + parseInt(this.budjetInputRef.current.value);
        }
        

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
        this.setState({
            selectProcessor: item
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
            selectSpeaker: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeMouse(item) {
        this.setState({
            selectMouse: item
        }, () => {
            this.calculatePrice();
        });
    }
    changeKeyboard(item) {
        this.setState({
            selectKeyboard: item
        }, () => {
            this.calculatePrice();
        });
    }

    componentDidMount() {
        this.getModel();
    }

    renderModel(model) {

        return (
            <div className="configurationContainer">
                <h1>Конфигуратор </h1>
                <section className="typesContainer">
                    <div className="form-check form-check-inline">
                        <input onClick={(ev) => {
                            this.setTypeConfiguration("Full");
                        }} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked="false" />
                        <label className="form-check-label" htmlFor="inlineRadio1">Собрать самому</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onClick={(ev) => {
                            this.setTypeConfiguration("Price");
                        }} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                        <label className="form-check-label" htmlFor="inlineRadio2">Выбрать бюджет</label>
                    </div>
                </section>
                {this.state.typeConfiguration == "Full" ?

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
                    :null
                }
                {this.state.typeConfiguration == "Price" ?

                    <section className="partlyContainer">
                        <h2>Заказ на сумму</h2>
                        <div>
                            <label>Бюджет</label>
                            <br />
                            <input onChange={(ev) => { this.calculatePrice(); }} ref={this.budjetInputRef} type="number" defaultValue="0" />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Форм фактор</label>
                            <SelectBodyFormFactor />
                        </div>
                    </section>:null
            }
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

                {this.state.typeConfiguration == "Price" ?

                    <section className="comments">
                        <h2>Комментарий</h2>
                        <div>
                            <textarea ref={this.commentInputRef}></textarea>
                        </div>
                    </section> : null
                }

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
                        this.onCreateOrder();
                    }} className="btn btn-dark btnOrder">Заказать</a>
                </div>

            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <div className="preloader">
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5ebd3e" />
                            <stop offset="33%" stopColor="#ffb900" />
                            <stop offset="67%" stopColor="#f78200" />
                            <stop offset="100%" stopColor="#e23838" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#e23838" />
                            <stop offset="33%" stopColor="#973999" />
                            <stop offset="67%" stopColor="#009cdf" />
                            <stop offset="100%" stopColor="#5ebd3e" />
                        </linearGradient>
                    </defs>
                    <g fill="none" strokeLinecap="round" strokeWidth="16">
                        <g className="ip__track" stroke="#ddd">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g strokeDasharray="180 656">
                            <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                    </g>
                </svg>
            </div>
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
        this.setState({ model: data, loading: false });
    }



    async onCreateOrder() {
        const cookies = new Cookies();
        let userId = cookies.get('userId');
        if (userId == null) {
            console.log('user not login');
            return;
        }


        var peripheryString = JSON.stringify([
            (this.state.selectMonitor != null ? this.state.selectMonitor.id : null),
            (this.state.selectSpeaker != null ? this.state.selectSpeaker.id : null),
            (this.state.selectMouse != null ? this.state.selectMouse.id : null),
            (this.state.selectKeyboard != null ? this.state.selectKeyboard.id : null)
        ].filter((item) => item != null));
        if (this.state.typeConfiguration == "Full")
        {
            await fetch('ordersystem/createorder?userId=' + userId
                + '&assemblyPrice=' + this.state.amountAssembly
                + '&totalPrice=' + this.state.totalAmount


                + '&bodyId=' + this.state.selectBody.id
                + '&processorId=' + this.state.selectProcessor.id
                + '&motherCardId=' + this.state.selectMotherCard.id
                + '&powerSupplyId=' + this.state.selectPowerUnit.id
                + '&storageId=' + this.state.selectStorageDevice.id
                + '&videoId=' + this.state.selectVideoCard.id
                + '&ramId=' + this.state.selectRam.id

                + '&orderDate=' + this.state.today

                + '&peripheryIds=' + peripheryString);
        }
        else if (this.state.typeConfiguration == "Price") {
            await fetch('ordersystem/createorderbyprice?userId=' + userId
                + '&budjet=' + this.budjetInputRef.current.value
                + '&comment=' + (this.commentInputRef.current.value??" ")
                + '&totalPrice=' + this.state.totalAmount

                + '&orderDate=' + this.state.today

                + '&peripheryIds=' + peripheryString);
        }
    }
}