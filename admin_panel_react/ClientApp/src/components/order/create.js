import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            typeOrder: "Full"
        };
        this.inputUserIdRef = React.createRef();
        this.inputCompAssemblerIdRef = React.createRef();
        this.inputTotalPriceRef = React.createRef();
        this.inputOrderDateRef = React.createRef();
        this.inputStatusRef = React.createRef();

        this.inputBudjetRef = React.createRef();
        this.inputCommentRef = React.createRef();

        this.inputMonitorIdRef = React.createRef();
        this.inputKeyboardIdRef = React.createRef();
        this.inputMouseRef = React.createRef();
        this.inputSpeakerIdRef = React.createRef();

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
                                <label className="control-label">Пользователь</label>
                                <select ref={this.inputUserIdRef} className="form-control" >
                                    {data.users.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Тип заказа</label>
                                <select onChange={(ev) => {
                                    this.setState({
                                        typeOrder: ev.target.value
                                    });
                                }} className="form-control" >
                                    <option value="Full">Полный заказ</option>
                                    <option value="Price">Заказ на определенный бюджет</option>
                                </select>
                            </div>
                            {this.state.typeOrder == "Full" ?
                                <>
                                    <div className="form-group">
                                        <label className="control-label">Сборка ПК</label>
                                        <select ref={this.inputCompAssemblerIdRef} className="form-control" >
                                            {data.computerAssemblies.map((item, index) => {
                                                return <option key={index} value={item.value}>{item.text}</option>;
                                            })}
                                        </select>
                                    </div>
                                </>
                                :
                                <>


                                    <div className="form-group">
                                        <label className="control-label">Бюджет</label>
                                        <input ref={this.inputBudjetRef} className="form-control" type="number" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Комментарий</label>
                                        <textarea ref={this.inputCommentRef} className="form-control" ></textarea>
                                    </div>
                                </>
                            }

                            <div className="form-group">
                                <label className="control-label">Монитор</label>
                                <select ref={this.inputMonitorIdRef} className="form-control" >
                                    <option value={-1}>NONE</option>
                                    {data.monitors.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Клавиатура</label>
                                <select ref={this.inputKeyboardIdRef} className="form-control" >
                                    <option value={-1}>NONE</option>
                                    {data.keyboards.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Компютерная мышка</label>
                                <select ref={this.inputMouseRef} className="form-control" >
                                    <option value={-1}>NONE</option>
                                    {data.mouses.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Динамики/наушники</label>
                                <select ref={this.inputSpeakerIdRef} className="form-control" >
                                    <option value={-1}>NONE</option>
                                    {data.speakers.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Статус</label>
                                <select ref={this.inputStatusRef} className="form-control" >
                                    <option value="Активен">Активен</option>
                                    <option value="Закончен">Закончен</option>
                                    <option value="Отменен">Отменен</option>
                                    <option value="В сборке">В сборке</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Дата заказа</label>
                                <input ref={this.inputOrderDateRef} className="form-control" type="date" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Итоговая цена</label>
                                <input ref={this.inputTotalPriceRef} className="form-control" type="number" />
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
                    }>Вернуться к списку</a>
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
        const response = await fetch('orders/getselectlists');
        if (response.status == 200) {

            const data = await response.json();
            this.setState({
                data: data,
                loading: false
            });
        } else {

            Layout.setMessage('Ошибка при получении данных: ' + response.statusText);
        }

    }

    async createItem() {


        var peripheryString = JSON.stringify([
            parseInt(this.inputMonitorIdRef.current.value),
            parseInt(this.inputSpeakerIdRef.current.value),
            parseInt(this.inputMouseRef.current.value),
            parseInt(this.inputKeyboardIdRef.current.value)
        ].filter((item) => item != -1));


        const response = await fetch('orders/create?'
            + 'userId=' + this.inputUserIdRef.current.value
            + '&computerAssemblyId=' + (this.inputCompAssemblerIdRef.current != null ? this.inputCompAssemblerIdRef.current.value : "")
            + '&status=' + this.inputStatusRef.current.value
            + '&orderDate=' + this.inputOrderDateRef.current.value
            + '&typeOrder=' + this.state.typeOrder
            + '&budjet=' + (this.inputBudjetRef.current != null ? this.inputBudjetRef.current.value : "")
            + '&comment=' + (this.inputCommentRef.current != null ? this.inputCommentRef.current.value : "")
            + '&totalPrice=' + this.inputTotalPriceRef.current.value


            + '&peripheryIds=' + peripheryString
        );


        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Заказ добавлен! ');
        } else {

            Layout.setMessage('Ошибка при добавлении заказа: ' + response.status);
        }
    }
}