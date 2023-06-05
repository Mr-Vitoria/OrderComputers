import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            imageUrl:""
        };
        this.inputBodyIdRef = React.createRef();
        this.inputNameRef = React.createRef();
        this.inputProcIdeRef = React.createRef();
        this.inputMotherIdRef = React.createRef();
        this.inputOwnerIdRef = React.createRef();
        this.inputPowerIdRef = React.createRef();
        this.inputRAMIdRef = React.createRef();
        this.inputStorageIdRef = React.createRef();
        this.inputVideoIdRef = React.createRef();
        this.inputCostPriceRef = React.createRef();
        this.inputTypeRef = React.createRef();


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
                                <label className="control-label">Name assembly</label>
                                <input type="text" ref={this.inputNameRef} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Computer body</label>
                                <select ref={this.inputBodyIdRef} className="form-control" >
                                    {data.compBodies.map((item, index) => {
                                        return <option key={index} value={item.value}>{ item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Computer processor</label>
                            <select ref={this.inputProcIdeRef} className="form-control" >
                                {data.compProcessors.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Mother card</label>
                            <select ref={this.inputMotherIdRef} className="form-control" >
                                {data.motherCards.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Power supply unit</label>
                            <select ref={this.inputPowerIdRef} className="form-control" >
                                {data.powerSupplyUnits.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">RAM memory</label>
                            <select ref={this.inputRAMIdRef} className="form-control" >
                                {data.ramMemories.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>


                            <div className="form-group">
                            <label className="control-label">Storage device</label>
                            <select ref={this.inputStorageIdRef} className="form-control" >
                                {data.storageDevices.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                            <label className="control-label">Video card</label>
                            <select ref={this.inputVideoIdRef} className="form-control" >
                                <option value="NONE">NONE</option>
                                {data.videoCards.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>;
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Owner</label>
                                <select ref={this.inputOwnerIdRef} className="form-control" >
                                    {data.owners.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Type computer assembly</label>
                                <select ref={this.inputTypeRef} className="form-control">
                                    <option value="Game">Game</option>
                                    <option value="Office">Office</option>
                                    <option value="Common">Common</option>
                                    <option value="User">User</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">ImageUrl</label>
                                <input onChange={(ev) => { this.setState({ imageUrl: ev.target.value }) }} className="form-control" type="url" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imageUrl} />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Cost price</label>
                                <input ref={this.inputCostPriceRef} className="form-control" type="number" />
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
        const response = await fetch('computerassemblies/getselectlists');
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ data: data, loading: false });
        }
        else {

            Layout.setMessage('Error get computer assembly data: ' + response.statusText);
        }
    }

    async createItem() {
        const response = await fetch('computerassemblies/create?'
            + 'compBodyId=' + this.inputBodyIdRef.current.value
            + '&motherCardId=' + this.inputMotherIdRef.current.value
            + '&powerSupplyUnitId=' + this.inputPowerIdRef.current.value
            + '&compProcessorId=' + this.inputProcIdeRef.current.value
            + '&ramMemoryId=' + this.inputRAMIdRef.current.value
            + '&storageDeviceId=' + this.inputStorageIdRef.current.value
            + '&videoCardId=' + this.inputVideoIdRef.current.value
            + '&ownerId=' + this.inputOwnerIdRef.current.value
            + '&type=' + this.inputTypeRef.current.value
            + '&imgUrl=' + this.state.imageUrl
            + '&costPrice=' + this.inputCostPriceRef.current.value);


        if (response.status == 200) {

            Layout.setMessage('Computer assembly was created! ');
            this.setTypePage("Index");
        }
        else {

            Layout.setMessage('Error create computer assembly: ' + response.statusText);
        }
    }
}