import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true   
        };
        this.inputUserIdRef = React.createRef();
        this.inputCompAssemblerIdeRef = React.createRef();
        this.inputTotalPriceRef = React.createRef();


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
                                <label className="control-label">User</label>
                                <select ref={this.inputUserIdRef} className="form-control" >
                                    {data.users.map((item, index) => {
                                        return <option key={index} value={item.value}>{ item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Computer assembly</label>
                                <select ref={this.inputCompAssemblerIdeRef} className="form-control" >
                                    {data.computerAssemblies.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Total price</label>
                                <input ref={this.inputTotalPriceRef} className="form-control" type="number" />
                            </div>


                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createItem();
                                }} className="btn btn-primary" >Add</button>
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
            this.setState({ data: data, loading: false });
        } else {

            Layout.setMessage('Error get data order: ' + response.statusText);
        }

    }

    async createItem() {
        const response = await fetch('orders/create?'
            + 'userId=' + this.inputUserIdRef.current.value
            + '&computerAssemblyId=' + this.inputCompAssemblerIdeRef.current.value
            + '&totalPrice=' + this.inputTotalPriceRef.current.value);


        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Order was added! ');
        } else {

            Layout.setMessage('Error add order: ' + response.statusText);
        }
    }
}