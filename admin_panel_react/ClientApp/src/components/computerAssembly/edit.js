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
        this.inputBodyIdRef = React.createRef();
        this.inputProcIdeRef = React.createRef();
        this.inputMotherIdRef = React.createRef();
        this.inputOwnerIdRef = React.createRef();
        this.inputPowerIdRef = React.createRef();
        this.inputRAMIdRef = React.createRef();
        this.inputStorageIdRef = React.createRef();
        this.inputVideoIdRef = React.createRef();
        this.inputCostPriceRef = React.createRef();

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
                                <label className="control-label">Computer body</label>
                                <select defaultValue={item.compBodyId} ref={this.inputBodyIdRef} className="form-control">
                                    {data.compBodies.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Computer processor</label>
                                <select defaultValue={item.compProcessorId} ref={this.inputProcIdeRef} className="form-control">
                                    {data.compProcessors.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Mother card</label>
                                <select defaultValue={item.motherCardId} ref={this.inputMotherIdRef} className="form-control">
                                    {data.motherCards.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Power supply unit</label>
                                <select defaultValue={item.powerSupplyUnitId} ref={this.inputPowerIdRef} className="form-control">
                                    {data.powerSupplyUnits.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">RAM memory</label>
                                <select defaultValue={item.ramMemoryId}  ref={this.inputRAMIdRef} className="form-control">
                                    {data.ramMemories.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>


                            <div className="form-group">
                                <label className="control-label">Storage device</label>
                                <select defaultValue={item.storageDeviceId} ref={this.inputStorageIdRef} className="form-control">
                                    {data.storageDevices.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Video card</label>
                                <select defaultValue={item.videoCardId} ref={this.inputVideoIdRef} className="form-control">
                                    <option value="NONE">NONE</option>
                                    {data.videoCards.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Owner</label>
                                <select defaultValue={item.ownerId} ref={this.inputOwnerIdRef} className="form-control">
                                    {data.owners.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>


                            <div className="form-group">
                                <label className="control-label">Cost price</label>
                                <input ref={this.inputCostPriceRef} defaultValue={item.costPrice} className="form-control" type="number" />
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
        const response = await fetch('computerassemblies/detail?id=' + Id);
        const data = await response.json();

        const responseSelectList = await fetch('computerassemblies/getselectlists');
        const selectList = await responseSelectList.json();
        this.setState({ item: data, data: selectList, loading: false });
    }

    async editItem() {

        const response = await fetch('computerassemblies/edit?id=' + this.inputIdRef.current.value
            + '&compBodyId=' + this.inputBodyIdRef.current.value
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
        else {
            console.log(response);
        }
    }
}