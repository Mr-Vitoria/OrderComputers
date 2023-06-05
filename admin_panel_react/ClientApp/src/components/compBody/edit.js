import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            itemId: props.itemId,
            imageUrl: ""

        };
        this.setTypePage = props.setTypePage;

        this.inputNameRef = React.createRef();
        this.inputFormFactorRef = React.createRef();
        this.inputPriceRef = React.createRef();
        this.inputIdRef = React.createRef();
    }

    componentDidMount() {
        this.getItem(this.state.itemId);

    }

    renderItem(item) {
        return (
            <>
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <form>
                                <input ref={this.inputIdRef} type="hidden" defaultValue={item.id}></input>
                                <div className="form-group">
                                    <label className="control-label">Name</label>
                                    <input defaultValue={item.name} ref={this.inputNameRef} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Form factor</label>
                                    <select defaultValue={item.formFactor} ref={this.inputFormFactorRef} className="form-control">
                                        <option value="Super/Ultra Tower">Super/Ultra Tower</option>
                                        <option value="Full Tower">Full Tower</option>
                                        <option value="Mid Tower">Mid Tower</option>
                                        <option value="Mini Tower">Mini Tower</option>
                                        <option value="Small form factor">Small form factor</option>
                                        <option value="HTPC">HTPC</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">ImageUrl</label>
                                    <input defaultValue={this.state.imageUrl} onChange={(ev) => {
                                        this.setState({
                                            imageUrl: ev.target.value
                                        })
                                    }} ref={this.inputImageRef} className="form-control" type="url" />
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
                                    }} className="btn btn-dark" >Save</button>
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
            </>

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
        const response = await fetch('compbodies/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({
                item: data,
                imageUrl: data.imgUrl,
                loading: false
            });
        }
        else {

            Layout.setMessage('Error get computer body: ' + response.statusText);
        }
    }

    async editItem() {
        const response = await fetch('compbodies/edit?id=' + this.inputIdRef.current.value
            + '&name=' + this.inputNameRef.current.value
            + '&price=' + this.inputPriceRef.current.value
            + '&imgUrl=' + this.state.imageUrl
            + '&formFactor=' + this.inputFormFactorRef.current.value);

        if (response.status == 200) {

            Layout.setMessage('Computer body is edited');
            this.setTypePage("Index");
        }
        else {
            Layout.setMessage('Error: ' + response.statusText);
        }
    }
}