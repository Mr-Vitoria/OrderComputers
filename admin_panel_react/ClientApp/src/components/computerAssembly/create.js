import React, { Component } from 'react';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true   
        };
        this.inputBodyIdRef = React.createRef();
        this.inputProcIdeRef = React.createRef();
        this.inputMotherIdRef = React.createRef();
        this.inputOwnerIdRef = React.createRef();
        this.inputPowerIdRef = React.createRef();
        this.inputRAMIdRef = React.createRef();
        this.inputStorageIdRef = React.createRef();
        this.inputVideoIdRef = React.createRef();
        this.inputCostPriceRef = React.createRef();


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
                            <label className="control-label">Owner</label>
                            <select ref={this.inputOwnerIdRef} className="form-control" >
                                {data.owners.map((item, index) => {
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
                                <label className="control-label">Cost price</label>
                                <input ref={this.inputCostPriceRef}className="form-control" type="number" />
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
        const response = await fetch('computerassemblies/getselectlists');
        const data = await response.json();
        this.setState({ data: data, loading: false });
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
            + '&costPrice=' + this.inputCostPriceRef.current.value);


        if (response.statusText == "OK") 
            this.setTypePage("Index");
        
        else
            this.setState({ problem: response.statusText, loading: false });
        console.log(response);
    }
}