import React, { Component } from 'react';

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
                        <form method="post">
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
                                <input onClick={(ev) => {
                                    this.createItem();
                                }} defaultValue="Add" className="btn btn-primary" />
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
            : this.renderForm(this.state.data);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getData() {
        const response = await fetch('orders/getselectlists');
        const data = await response.json();
        console.log(data);
        this.setState({ data: data, loading: false });
    }

    async createItem() {
        const response = await fetch('orders/create?'
            + 'userId=' + this.inputUserIdRef.current.value
            + '&computerAssemblyId=' + this.inputCompAssemblerIdeRef.current.value
            + '&totalPrice=' + this.inputTotalPriceRef.current.value);


        if (response.statusText == "OK") 
            this.setTypePage("Index");
        
        else
            this.setState({ problem: response.statusText, loading: false });
        console.log(response);
    }
}