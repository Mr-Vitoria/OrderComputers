import React, { Component } from 'react';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            data: null,
            loading: true,
            itemId: props.itemId
        };
        this.setTypePage = props.setTypePage;

        this.inputIdRef = React.createRef();
        this.inputUserIdRef = React.createRef();
        this.inputCompAssemblerIdeRef = React.createRef();
        this.inputTotalPriceRef = React.createRef();

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
                                <select defaultValue={item.computerAssemblyId} ref={this.inputCompAssemblerIdeRef} className="form-control" >
                                    {data.computerAssemblies.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Total price</label>
                                <input defaultValue={ item.totalPrice} ref={this.inputTotalPriceRef} className="form-control" type="number" />
                            </div>

                            <div className="form-group">
                                <input onClick={(ev) => {
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
            ? <p><em>Loading...</em></p>
            : this.renderItem(this.state.data, this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('orders/detail?id=' + Id);
        const data = await response.json();

        const responseSelectList = await fetch('orders/getselectlists');
        const selectList = await responseSelectList.json();
        this.setState({ item: data, data: selectList, loading: false });
    }

    async editItem() {

        const response = await fetch('orders/edit?id=' + this.inputIdRef.current.value
            + '&userId=' + this.inputUserIdRef.current.value
            + '&computerAssemblyId=' + this.inputCompAssemblerIdeRef.current.value
            + '&totalPrice=' + this.inputTotalPriceRef.current.value);

        if (response.statusText == "OK")
            this.setTypePage("Index");
        else {
            console.log(response);
        }
    }
}