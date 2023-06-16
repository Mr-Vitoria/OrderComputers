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
            typeOrder: "Full"
        };
        this.setTypePage = props.setTypePage;

        this.inputIdRef = React.createRef();
        this.inputUserIdRef = React.createRef();
        this.inputCompAssemblerIdRef = React.createRef();
        this.inputTotalPriceRef = React.createRef();
        this.inputOrderDateRef = React.createRef();
        this.inputStatusRef = React.createRef();

        this.inputBudjetRef = React.createRef();
        this.inputCommentRef = React.createRef();

    }
    componentDidMount() {
        this.getItem(this.state.itemId);
    }

    renderItem(data,item) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form method="post">
                            <input defaultValue={item.id } ref={this.inputIdRef} type="hidden" className="form-control" />
                            <div className="form-group">
                                <label className="control-label">Пользователь</label>
                                <select defaultValue={item.userId } ref={this.inputUserIdRef} className="form-control" >
                                    {data.users.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Тип сборки</label>
                                <select defaultValue={this.state.typeOrder} onChange={(ev) => {
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
                                        <select defaultValue={item.computerAssemblyId} ref={this.inputCompAssemblerIdRef} className="form-control" >
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
                                        <input defaultValue={ item.budjet } ref={this.inputBudjetRef} className="form-control" type="number" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Комментарий</label>
                                        <textarea defaultValue={item.comment} ref={this.inputCommentRef} className="form-control" ></textarea>
                                    </div>
                                </>
                            }

                            <div className="form-group">
                                <label className="control-label">Статус</label>
                                <select defaultValue={item.status} ref={this.inputStatusRef} className="form-control" >
                                    <option value="Активен">Активен</option>
                                    <option value="Закончен">Закончен</option>
                                    <option value="Отменен">Отменен</option>
                                    <option value="В сборке">В сборке</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Дата заказа</label>
                                <input defaultValue={
                                    item.orderDate.slice(6, 10) + '-' + item.orderDate.slice(3, 5) + '-' + item.orderDate.slice(0, 2)
                                } ref={this.inputOrderDateRef} className="form-control" type="date" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Итоговая цена</label>
                                <input defaultValue={ item.totalPrice} ref={this.inputTotalPriceRef} className="form-control" type="number" />
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
            : this.renderItem(this.state.data, this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('orders/detail?id=' + Id);
        const responseSelectList = await fetch('orders/getselectlists');
        if (response.status == 200 && responseSelectList.status == 200) {

            const data = await response.json();
            const selectList = await responseSelectList.json();
            this.setState({
                item: data,
                data: selectList,
                loading: false,
                typeOrder:data.typeOrder
            });
        }
        else {

            Layout.setMessage('Ошибка при получении заказа: ' + response.status
            +'Ошибка при получении данных: ' + responseSelectList.status);
        }


    }

    async editItem() {

        const response = await fetch('orders/edit?id=' + this.inputIdRef.current.value
            + '&userId=' + this.inputUserIdRef.current.value
            + '&computerAssemblyId=' + (this.inputCompAssemblerIdRef.current != null ? this.inputCompAssemblerIdRef.current.value : "")
            + '&status=' + this.inputStatusRef.current.value
            + '&typeOrder=' + this.state.typeOrder
            + '&budjet=' + (this.inputBudjetRef.current != null ? this.inputBudjetRef.current.value : "")
            + '&comment=' + (this.inputCommentRef.current != null ? this.inputCommentRef.current.value : "")
            + '&orderDate=' + this.inputOrderDateRef.current.value
            + '&totalPrice=' + this.inputTotalPriceRef.current.value);
        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Заказ изменен! ');
        }else{

            Layout.setMessage('Ошибка при изменении заказа: ' + response.status);
        }
    }
}