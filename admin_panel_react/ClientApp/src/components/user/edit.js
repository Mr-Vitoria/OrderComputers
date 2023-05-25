import React, { Component } from 'react';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            itemId: props.itemId
        };
        this.setTypePage = props.setTypePage;

        this.inputIdRef = React.createRef();
        this.inputNameRef = React.createRef();
        this.inputSurnameRef = React.createRef();
        this.inputEmailRef = React.createRef();
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();
        this.inputImageRef = React.createRef();
        this.inputTypeRef = React.createRef();

    }

    componentDidMount() {
        this.getItem(this.state.itemId);

    }

    renderItem(item) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form method="post">
                            <div className="form-group">
                                <label htmlFor="Name" className="control-label">Name</label>
                                <input defaultValue={ item.name} ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Surname" className="control-label">Surname</label>
                                <input defaultValue={item.surname} ref={this.inputSurnameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email" className="control-label">Email</label>
                                <input defaultValue={item.email}  ref={this.inputEmailRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Phone" className="control-label">Phone</label>
                                <input defaultValue={item.phone}  ref={this.inputPhoneRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password" className="control-label">Password</label>
                                <input defaultValue={item.password}  ref={this.inputPasswordRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Image url</label>
                                <input defaultValue={ item.imgUrl} ref={this.inputImageRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TypeUser" className="control-label">Type User</label>
                                <select defaultValue={item.typeUser} ref={this.inputTypeRef} className="form-control">
                                    <option value="Common">Common</option>
                                    <option value="Admin">Admin</option>
                                </select>
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
            : this.renderItem(this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('users/detail?id=' + Id);
        const data = await response.json();
        this.setState({ item: data, loading: false });

        console.log(data);
    }

    async editItem() {

        const response = await fetch('users/edit?id=' + this.state.itemId
            + '&name=' + this.inputNameRef.current.value
            + '&surname=' + this.inputSurnameRef.current.value
            + '&email=' + this.inputEmailRef.current.value
            + '&phone=' + this.inputPhoneRef.current.value
            + '&password=' + this.inputPasswordRef.current.value
            + '&imgUrl=' + this.inputImageRef.current.value
            + '&typeUser=' + this.inputTypeRef.current.value);

        if (response.statusText == "OK")
            this.setTypePage("Index");
        else {
            console.log(response);
        }
    }
}