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
                                <label className="control-label">User</label>
                                <select defaultValue={item.userId } ref={this.inputUserIdRef} className="form-control" >
                                    {data.users.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Computer assembly</label>
                                <select defaultValue={this.state.typeOrder} onChange={(ev) => {
                                    this.setState({
                                        typeOrder: ev.target.value
                                    });
                                }} className="form-control" >
                                    <option value="Full">Full order</option>
                                    <option value="Price">Order by price</option>
                                </select>
                            </div>
                            {this.state.typeOrder == "Full" ?
                                <>
                                    <div className="form-group">
                                        <label className="control-label">Computer assembly</label>
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
                                        <label className="control-label">Budjet</label>
                                        <input defaultValue={ item.budjet } ref={this.inputBudjetRef} className="form-control" type="number" />
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Comment</label>
                                        <textarea defaultValue={item.comment} ref={this.inputCommentRef} className="form-control" ></textarea>
                                    </div>
                                </>
                            }

                            <div className="form-group">
                                <label className="control-label">Status</label>
                                <select defaultValue={item.status} ref={this.inputStatusRef} className="form-control" >
                                    <option value="Активен">Active</option>
                                    <option value="Закончен">Complete</option>
                                    <option value="Отменен">Cancel</option>
                                    <option value="В сборке">Being collected</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Order date</label>
                                <input defaultValue={
                                    item.orderDate.slice(6, 10) + '-' + item.orderDate.slice(3, 5) + '-' + item.orderDate.slice(0, 2)
                                } ref={this.inputOrderDateRef} className="form-control" type="date" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Total price</label>
                                <input defaultValue={ item.totalPrice} ref={this.inputTotalPriceRef} className="form-control" type="number" />
                            </div>

                            <div className="form-group">
                                <input onClick={(ev) => {
                                    ev.preventDefault();
                                    this.editItem();
                                }} defaultValue="Save" className="btn btn-primary" />
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

            Layout.setMessage('Error get data for order: ' + response.statusText);
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
            Layout.setMessage('Order was edited! ');
        }else{

            Layout.setMessage('Error edit order: ' + response.statusText);
        }
    }
}