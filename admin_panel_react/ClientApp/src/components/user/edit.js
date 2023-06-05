import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            itemId: props.itemId,
            imageUrl:""
        };
        this.setTypePage = props.setTypePage;

        this.inputIdRef = React.createRef();
        this.inputNameRef = React.createRef();
        this.inputLoginRef = React.createRef();
        this.inputEmailRef = React.createRef();
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();
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
                                <label className="control-label">Name</label>
                                <input defaultValue={ item.name} ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Login</label>
                                <input defaultValue={item.login} ref={this.inputLoginRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Email</label>
                                <input defaultValue={item.email}  ref={this.inputEmailRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Phone</label>
                                <input defaultValue={item.phone}  ref={this.inputPhoneRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Password</label>
                                <input defaultValue={item.password}  ref={this.inputPasswordRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">ImageUrl</label>
                                <input defaultValue={this.state.imageUrl} onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Type User</label>
                                <select defaultValue={item.typeUser} ref={this.inputTypeRef} className="form-control">
                                    <option value="Common">Common</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.editItem();
                                }} className="btn btn-primary">Save</button>
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
            : this.renderItem(this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('users/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false, imageUrl: data.imgUrl });
        } else {

            Layout.setMessage('Error get user: ' + response.statusText);
        }
    }

    async editItem() {

        const response = await fetch('users/edit?id=' + this.state.itemId
            + '&name=' + this.inputNameRef.current.value
            + '&login=' + this.inputLoginRef.current.value
            + '&email=' + this.inputEmailRef.current.value
            + '&phone=' + this.inputPhoneRef.current.value
            + '&password=' + this.inputPasswordRef.current.value
            + '&imgUrl=' + this.state.imageUrl
            + '&typeUser=' + this.inputTypeRef.current.value);
        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('User was edited: ' + response.statusText);
        } else {

            Layout.setMessage('Error edit user: ' + response.statusText);
        }
    }
}