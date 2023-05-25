import React, { Component } from 'react';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true   
        };
        this.inputNameRef = React.createRef();
        this.inputSurnameRef = React.createRef();
        this.inputEmailRef = React.createRef();
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();
        this.inputImageRef = React.createRef();
        this.inputTypeRef = React.createRef();


        this.setTypePage = props.setTypePage;
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form method="post">
                            <div className="form-group">
                                <label htmlFor="Name" className="control-label">Name</label>
                                <input ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Surname" className="control-label">Surname</label>
                                <input ref={this.inputSurnameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email" className="control-label">Email</label>
                                <input ref={this.inputEmailRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Phone" className="control-label">Phone</label>
                                <input ref={this.inputPhoneRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password" className="control-label">Password</label>
                                <input ref={this.inputPasswordRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Image url</label>
                                <input ref={this.inputImageRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="TypeUser" className="control-label">Type User</label>
                                <select ref={this.inputTypeRef} className="form-control">
                                    <option value="Common">Common</option>
                                    <option value="Admin">Admin</option>
                                </select>
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

    async createItem() {

        const response = await fetch('users/create?name=' + this.inputNameRef.current.value
            + '&surname=' + this.inputSurnameRef.current.value
            + '&email=' + this.inputEmailRef.current.value
            + '&phone=' + this.inputPhoneRef.current.value
            + '&password=' + this.inputPasswordRef.current.value
            + '&typeUser=' + this.inputTypeRef.current.value
            + '&imgUrl=' + this.inputImageRef.current.value);

        if (response.statusText == "OK") 
            this.setTypePage("Index");
        
        else
            this.setState({ problem: response.statusText, loading: false });
    }
}