import React, { Component } from 'react';

export default class SortBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultItems: props.defaultItems,
            changeSortItems: props.changeSortItems,
            selectOption: null,
            selectProcessorProducers:[],
            selectProcessorSockets: [],
            minProcessorCores: 0,
            maxProcessorCores: 0,
            minFrequency: 0,
            maxFrequency: 0
        };

        this.filterItems = this.filterItems.bind(this);
    }
    componentDidMount() {

        this.getSelectOption();
    }

    filterItems() {
        let sortItems = this.state.defaultItems;
        if (this.state.selectProcessorProducers.length>0)
            sortItems = sortItems.filter(item => {
            for (var i = 0; i < this.state.selectProcessorProducers.length; i++) {
                
                if (item.compProcessor.producer == this.state.selectProcessorProducers[i]) {
                    return true;
                }
                }
                return false;
            })
        if (this.state.selectProcessorSockets.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectProcessorSockets.length; i++) {

                    if (item.compProcessor.socket == this.state.selectProcessorSockets[i]) {
                        return true;
                    }
                }
                return false;
            })
        sortItems = sortItems.filter(item => {
            if (item.compProcessor.countCores < this.state.minProcessorCores
                || item.compProcessor.countCores > this.state.maxProcessorCores) {
                return false;
            }
            return true;
        })
        sortItems = sortItems.filter(item => {
            if (item.compProcessor.frequency < this.state.minFrequency
                || item.compProcessor.frequency > this.state.maxFrequency) {
                return false;
            }
            return true;
        })
        this.state.changeSortItems(sortItems);

    }

    render() {
        return (
            <>
                {this.state.selectOption != null ? <div className="sortContainer" >
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Процессор
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p>Производитель: </p>
                                    {this.state.selectOption.processors.producers.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {
                                                
                                                ev.target.checked ?
                                                    this.state.selectProcessorProducers.push(ev.target.value)
                                                    :
                                                    this.state.selectProcessorProducers = this.state.selectProcessorProducers
                                                        .filter(prod => {
                                                        return prod != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={ item} id={"prod"+key} />
                                            <label className="form-check-label" htmlFor={"prod" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Сокет: </p>
                                    {this.state.selectOption.processors.sockets.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectProcessorSockets.push(ev.target.value)
                                                    :
                                                    this.state.selectProcessorSockets = this.state.selectProcessorSockets
                                                        .filter(sock => {
                                                            return sock != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"socket" + key} />
                                            <label className="form-check-label" htmlFor={"socket" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Частота: </p>
                                    <label htmlFor="minFrequency" className="form-label">От {this.state.minFrequency}</label>
                                    <input onChange={(ev) => {
                                        this.state.minFrequency =ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.processors.minFrequency}
                                        max={this.state.maxFrequency}
                                        defaultValue={this.state.selectOption.processors.minFrequency }id="minFrequency" />

                                    <label htmlFor="maxFrequency" className="form-label">До {this.state.maxFrequency}</label>
                                    <input onChange={(ev) => {
                                        this.state.maxFrequency = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.minFrequency}
                                        max={this.state.selectOption.processors.maxFrequency}
                                        defaultValue={this.state.selectOption.processors.maxFrequency} id="maxFrequency" />
                                </div>
                                <div className="accordion-body">
                                    <p>Количество ядер: </p>
                                    <label htmlFor="minCoresCount" className="form-label">От {this.state.minProcessorCores}</label>
                                    <input onChange={(ev) => {
                                        this.state.minProcessorCores=ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.processors.minCountCores}
                                        max={this.state.maxProcessorCores}
                                        defaultValue={this.state.selectOption.processors.minCountCores }id="minCoresCount" />

                                    <label htmlFor="maxCoresCount" className="form-label">До {this.state.maxProcessorCores}</label>
                                    <input onChange={(ev) => {
                                        this.state.maxProcessorCores = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.minProcessorCores}
                                        max={this.state.selectOption.processors.maxCountCores}
                                        defaultValue={this.state.selectOption.processors.maxCountCores} id="maxCoresCount" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    : null}
            </>
            
        );
    }

    async getSelectOption() {
        const response = await fetch('ordersystem/getselectoption');
        const data = await response.json();
        console.log(data);
        this.setState({
            selectOption: data,
            minProcessorCores: data.processors.minCountCores,
            maxProcessorCores: data.processors.maxCountCores,
            minFrequency: data.processors.minFrequency,
            maxFrequency: data.processors.maxFrequency
        });
    }
}