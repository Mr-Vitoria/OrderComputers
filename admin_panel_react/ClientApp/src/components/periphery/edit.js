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
        this.inputTypeRef = React.createRef();
        this.inputPriceRef = React.createRef();

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
                            <input defaultValue={item.id } ref={this.inputIdRef} type="hidden" className="form-control" />
                            <div className="form-group">
                                <label className="control-label">Name</label>
                                <input defaultValue={item.name} ref={this.inputNameRef} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Type</label>
                                <select defaultValue={item.type} ref={this.inputTypeRef} className="form-control">
                                    <option value="Monitor">Monitor</option>
                                    <option value="Speaker/Headphones">Speaker/Headphones</option>
                                    <option value="Mouse">Computer mouse</option>
                                    <option value="Keyboard">Keyboard</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">ImageUrl</label>
                                <input defaultValue={this.state.imageUrl} onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Price</label>
                                <input defaultValue={item.price} ref={this.inputPriceRef} className="form-control" type="number" />
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
        const response = await fetch('peripheries/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false, imageUrl: data.imgUrl });
        } else {

            Layout.setMessage('Error get Periphery: ' + response.statusText);
        }
    }

    async editItem() {

        const response = await fetch('peripheries/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&type=' + this.inputTypeRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&imgUrl=' + this.state.imageUrl);
        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Periphery was edited! ');
        } else {

            Layout.setMessage('Error edit Periphery: ' + response.statusText);
        }
    }
}