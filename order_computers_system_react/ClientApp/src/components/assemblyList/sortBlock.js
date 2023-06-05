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
            procMinFrequency: 0,
            procMaxFrequency: 0,

            
            selectBodyFormFactor: [],


            selectVideoCardProducers: [],
            selectVideoCardType: [],
            minVideoCardCount: 0,
            maxVideoCardCount: 0,


            selectMotherCardSize: [],
            selectMotherCardSocket: [],



            selectPowerUnitFormFactor: [],
            powerUnitMinPower: 0,
            powerUnitMaxPower: 0,


            selectMemoryType: [],
            minMemoryCount: 0,
            maxMemoryCount: 0,
            minMemoryFrequency: 0,
            maxMemoryFrequency: 0,

            selectStorageType: [],
            minStorageCount: 0,
            maxStorageCount: 0
        };

        this.filterItems = this.filterItems.bind(this);
    }
    componentDidMount() {

        this.getSelectOption();
    }

    filterItems() {
        let sortItems = this.state.defaultItems;

        //Processor
        if (this.state.selectProcessorProducers.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectProcessorProducers.length; i++) {

                    if (item.compProcessor.producer == this.state.selectProcessorProducers[i]) {
                        return true;
                    }
                }
                return false;
            });
        if (this.state.selectProcessorSockets.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectProcessorSockets.length; i++) {

                    if (item.compProcessor.socket == this.state.selectProcessorSockets[i]) {
                        return true;
                    }
                }
                return false;
            });
        sortItems = sortItems.filter(item => {
            if (item.compProcessor.countCores < this.state.minProcessorCores
                || item.compProcessor.countCores > this.state.maxProcessorCores) {
                return false;
            }
            return true;
        });
        sortItems = sortItems.filter(item => {
            if (item.compProcessor.frequency < this.state.procMinFrequency
                || item.compProcessor.frequency > this.state.procMaxFrequency) {
                return false;
            }
            return true;
        });

        //Body
        if (this.state.selectBodyFormFactor.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectBodyFormFactor.length; i++) {

                    if (item.compBody.formFactor == this.state.selectBodyFormFactor[i]) {
                        return true;
                    }
                }
                return false;
            });


        //VideoCard

        if (this.state.selectVideoCardProducers.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectVideoCardProducers.length; i++) {

                    if (item.videoCard.producer == this.state.selectVideoCardProducers[i]) {
                        return true;
                    }
                }
                return false;
            });
        if (this.state.selectVideoCardType.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectVideoCardType.length; i++) {

                    if (item.videoCard.type == this.state.selectVideoCardType[i]) {
                        return true;
                    }
                }
                return false;
            });
        sortItems = sortItems.filter(item => {
            if (item.videoCard.count < this.state.minVideoCardCount
                || item.videoCard.count > this.state.maxVideoCardCount) {
                return false;
            }
            return true;
        });


        //MotherCard
        if (this.state.selectMotherCardSize.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectMotherCardSize.length; i++) {

                    if (item.motherCard.size == this.state.selectMotherCardSize[i]) {
                        return true;
                    }
                }
                return false;
            });
        if (this.state.selectMotherCardSocket.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectMotherCardSocket.length; i++) {

                    if (item.motherCard.socket == this.state.selectMotherCardSocket[i]) {
                        return true;
                    }
                }
                return false;
            });


        //Power supply unit
        if (this.state.selectPowerUnitFormFactor.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectPowerUnitFormFactor.length; i++) {

                    if (item.powerSupplyUnit.formFactor == this.state.selectPowerUnitFormFactor[i]) {
                        return true;
                    }
                }
                return false;
            });
        sortItems = sortItems.filter(item => {
            if (item.powerSupplyUnit.power < this.state.powerUnitMinPower
                || item.powerSupplyUnit.power > this.state.powerUnitMaxPower) {
                return false;
            }
            return true;
        });


        //RAM memory

        if (this.state.selectMemoryType.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectMemoryType.length; i++) {

                    if (item.ramMemory.type == this.state.selectMemoryType[i]) {
                        return true;
                    }
                }
                return false;
            });
        sortItems = sortItems.filter(item => {
            if (item.ramMemory.count < this.state.minMemoryCount
                || item.ramMemory.count > this.state.maxMemoryCount) {
                return false;
            }
            return true;
        });
        sortItems = sortItems.filter(item => {
            if (item.ramMemory.frequency < this.state.  minMemoryFrequency
                || item.ramMemory.frequency > this.state.maxMemoryFrequency) {
                return false;
            }
            return true;
        });

        //Storage device

        if (this.state.selectStorageType.length > 0)
            sortItems = sortItems.filter(item => {
                for (var i = 0; i < this.state.selectStorageType.length; i++) {

                    if (item.storageDevice.type == this.state.selectStorageType[i]) {
                        return true;
                    }
                }
                return false;
            });
        sortItems = sortItems.filter(item => {
            if (item.storageDevice.count < this.state.minStorageCount
                || item.storageDevice.count > this.state.maxStorageCount) {
                return false;
            }
            return true;
        });


        this.state.changeSortItems(sortItems);

    }

    render() {
        return (
            <>
                {this.state.selectOption != null ? <div className="sortContainer" >
                    <div className="accordion" id="accordionSort">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProc" aria-expanded="true" aria-controls="collapseProc">
                                    Процессор
                                </button>
                            </h2>
                            <div id="collapseProc" className="accordion-collapse collapse" data-bs-parent="#accordionSort">
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
                                            }} className="form-check-input" type="checkbox" value={ item} id={"procProducer"+key} />
                                            <label className="form-check-label" htmlFor={"procProducer" + key} >
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
                                            }} className="form-check-input" type="checkbox" value={item} id={"procSocket" + key} />
                                            <label className="form-check-label" htmlFor={"procSocket" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Частота(МГц): </p>
                                    <label htmlFor="procMinFrequency" className="form-label">От {this.state.procMinFrequency}</label>
                                    <input onChange={(ev) => {
                                        this.state.procMinFrequency = ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.processors.minFrequency}
                                        max={this.state.procMaxFrequency}
                                        defaultValue={this.state.selectOption.processors.minFrequency} id="procMinFrequency" />

                                    <label htmlFor="procMaxFrequency" className="form-label">До {this.state.procMaxFrequency}</label>
                                    <input onChange={(ev) => {
                                        this.state.procMaxFrequency = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.procMinFrequency}
                                        max={this.state.selectOption.processors.maxFrequency}
                                        defaultValue={this.state.selectOption.processors.maxFrequency} id="procMaxFrequency" />
                                </div>
                                <div className="accordion-body">
                                    <p>Количество ядер: </p>
                                    <label htmlFor="procMinCoresCount" className="form-label">От {this.state.minProcessorCores}</label>
                                    <input onChange={(ev) => {
                                        this.state.minProcessorCores=ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.processors.minCountCores}
                                        max={this.state.maxProcessorCores}
                                        defaultValue={this.state.selectOption.processors.minCountCores} id="procMinCoresCount" />

                                    <label htmlFor="procMaxCoresCount" className="form-label">До {this.state.maxProcessorCores}</label>
                                    <input onChange={(ev) => {
                                        this.state.maxProcessorCores = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.minProcessorCores}
                                        max={this.state.selectOption.processors.maxCountCores}
                                        defaultValue={this.state.selectOption.processors.maxCountCores} id="procMaxCoresCount" />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBody" aria-expanded="true" aria-controls="collapseBody">
                                    Корпус
                                </button>
                            </h2>
                            <div id="collapseBody" className="accordion-collapse collapse" data-bs-parent="#accordionSort">
                                <div className="accordion-body">
                                    <p>Форм фактор: </p>
                                    {this.state.selectOption.body.formFactor.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectBodyFormFactor.push(ev.target.value)
                                                    :
                                                    this.state.selectBodyFormFactor = this.state.selectBodyFormFactor
                                                        .filter(body => {
                                                            return body != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"bodyFormFactor" + key} />
                                            <label className="form-check-label" htmlFor={"bodyFormFactor" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVideoCard" aria-expanded="true" aria-controls="collapseVideoCard">
                                    Видеокарта
                                </button>
                            </h2>
                            <div id="collapseVideoCard" className="accordion-collapse collapse" data-bs-parent="#accordionSort">
                                <div className="accordion-body">
                                    <p>Производитель: </p>
                                    {this.state.selectOption.videoCard.producers.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectVideoCardProducers.push(ev.target.value)
                                                    :
                                                    this.state.selectVideoCardProducers = this.state.selectVideoCardProducers
                                                        .filter(prod => {
                                                            return prod != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"videoCardProducer" + key} />
                                            <label className="form-check-label" htmlFor={"videoCardProducer" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Тип памяти: </p>
                                    {this.state.selectOption.videoCard.types.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectVideoCardType.push(ev.target.value)
                                                    :
                                                    this.state.selectVideoCardType = this.state.selectVideoCardType
                                                        .filter(sock => {
                                                            return sock != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"videoCardType" + key} />
                                            <label className="form-check-label" htmlFor={"videoCardType" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Объем памяти(Мб): </p>
                                    <label htmlFor="videoCardMinCount" className="form-label">От {this.state.minVideoCardCount}</label>
                                    <input onChange={(ev) => {
                                        this.state.minVideoCardCount = ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.videoCard.minCount}
                                        max={this.state.maxVideoCardCount}
                                        defaultValue={this.state.selectOption.videoCard.minCount} id="videoCardMinCount" />

                                    <label htmlFor="videoCardMaxCount" className="form-label">До {this.state.maxVideoCardCount}</label>
                                    <input onChange={(ev) => {
                                        this.state.maxVideoCardCount = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.minVideoCardCount}
                                        max={this.state.selectOption.videoCard.maxCount}
                                        defaultValue={this.state.selectOption.videoCard.maxCount} id="videoCardMaxCount" />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMotherCard" aria-expanded="true" aria-controls="collapseMotherCard">
                                    Материнская плата
                                </button>
                            </h2>
                            <div id="collapseMotherCard" className="accordion-collapse collapse" data-bs-parent="#accordionSort">
                                <div className="accordion-body">
                                    <p>Размер: </p>
                                    {this.state.selectOption.motherCard.sizes.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectMotherCardSize.push(ev.target.value)
                                                    :
                                                    this.state.selectMotherCardSize = this.state.selectMotherCardSize
                                                        .filter(motherCard => {
                                                            return motherCard != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"motherCardSize" + key} />
                                            <label className="form-check-label" htmlFor={"motherCardSize" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Сокет для процессора: </p>
                                    {this.state.selectOption.motherCard.sockets.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectMotherCardSocket.push(ev.target.value)
                                                    :
                                                    this.state.selectMotherCardSocket = this.state.selectMotherCardSocket
                                                        .filter(motherCard => {
                                                            return motherCard != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"motherCardSocket" + key} />
                                            <label className="form-check-label" htmlFor={"motherCardSocket" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePowerUnit" aria-expanded="true" aria-controls="collapsePowerUnit">
                                    Блок питания
                                </button>
                            </h2>
                            <div id="collapsePowerUnit" className="accordion-collapse collapse" data-bs-parent="#accordionSort">
                                <div className="accordion-body">
                                    <p>Форм фактор: </p>
                                    {this.state.selectOption.powerSupplyUnit.formFactor.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectPowerUnitFormFactor.push(ev.target.value)
                                                    :
                                                    this.state.selectPowerUnitFormFactor = this.state.selectPowerUnitFormFactor
                                                        .filter(unit => {
                                                            return unit != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"powerUnitFormFactor" + key} />
                                            <label className="form-check-label" htmlFor={"powerUnitFormFactor" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Мощность(Вт): </p>
                                    <label htmlFor="minPowerUnitPower" className="form-label">От {this.state.powerUnitMinPower}</label>
                                    <input onChange={(ev) => {
                                        this.state.powerUnitMinPower = ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.powerSupplyUnit.minPower}
                                        max={this.state.powerUnitMaxPower}
                                        defaultValue={this.state.selectOption.powerSupplyUnit.minPower} id="minPowerUnitPower" />

                                    <label htmlFor="maxPowerUnitPower" className="form-label">До {this.state.powerUnitMaxPower}</label>
                                    <input onChange={(ev) => {
                                        this.state.powerUnitMaxPower = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.powerUnitMinPower}
                                        max={this.state.selectOption.powerSupplyUnit.maxPower}
                                        defaultValue={this.state.selectOption.powerSupplyUnit.maxPower} id="maxPowerUnitPower" />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMemory" aria-expanded="true" aria-controls="collapseMemory">
                                    Оперативная память
                                </button>
                            </h2>
                            <div id="collapseMemory" className="accordion-collapse collapse" data-bs-parent="#accordionSort">
                                <div className="accordion-body">
                                    <p>Тип памяти: </p>
                                    {this.state.selectOption.ramMemory.type.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectMemoryType.push(ev.target.value)
                                                    :
                                                    this.state.selectMemoryType = this.state.selectMemoryType
                                                        .filter(memory => {
                                                            return memory != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"memoryType" + key} />
                                            <label className="form-check-label" htmlFor={"memoryType" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Частота(МГц): </p>
                                    <label htmlFor="memoryMinFrequency" className="form-label">От {this.state.minMemoryFrequency}</label>
                                    <input onChange={(ev) => {
                                        this.state.minMemoryFrequency = ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.ramMemory.minFrequency}
                                        max={this.state.maxMemoryFrequency}
                                        defaultValue={this.state.selectOption.ramMemory.minFrequency} id="memoryMinFrequency" />

                                    <label htmlFor="memoryMaxFrequency" className="form-label">До {this.state.maxMemoryFrequency}</label>
                                    <input onChange={(ev) => {
                                        this.state.maxMemoryFrequency = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.minMemoryFrequency}
                                        max={this.state.selectOption.ramMemory.maxFrequency}
                                        defaultValue={this.state.selectOption.ramMemory.maxFrequency} id="memoryMaxFrequency" />
                                </div>
                                <div className="accordion-body">
                                    <p>Объем(Мб): </p>
                                    <label htmlFor="memoryMinCount" className="form-label">От {this.state.minMemoryCount}</label>
                                    <input onChange={(ev) => {
                                        this.state.minMemoryCount = ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.ramMemory.minCount}
                                        max={this.state.maxMemoryCount}
                                        defaultValue={this.state.selectOption.ramMemory.minCount} id="memoryMinCount" />

                                    <label htmlFor="memoryMaxCount" className="form-label">До {this.state.maxMemoryCount}</label>
                                    <input onChange={(ev) => {
                                        this.state.maxMemoryCount = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.minMemoryCount}
                                        max={this.state.selectOption.ramMemory.maxCount}
                                        defaultValue={this.state.selectOption.ramMemory.maxCount} id="memoryMaxCount" />
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStorageDevice" aria-expanded="true" aria-controls="collapseStorageDevice">
                                    SSD/HDD
                                </button>
                            </h2>
                            <div id="collapseStorageDevice" className="accordion-collapse collapse" data-bs-parent="#accordionSort">
                                <div className="accordion-body">
                                    <p>Тип памяти: </p>
                                    {this.state.selectOption.storageDevice.type.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={(ev) => {

                                                ev.target.checked ?
                                                    this.state.selectStorageType.push(ev.target.value)
                                                    :
                                                    this.state.selectStorageType = this.state.selectStorageType
                                                        .filter(memory => {
                                                            return memory != item;
                                                        });
                                                this.filterItems();
                                            }} className="form-check-input" type="checkbox" value={item} id={"storageType" + key} />
                                            <label className="form-check-label" htmlFor={"storageType" + key} >
                                                {item}
                                            </label>
                                        </div>
                                    })}
                                </div>
                                <div className="accordion-body">
                                    <p>Объем(Гб): </p>
                                    <label htmlFor="storageMinCount" className="form-label">От {this.state.minStorageCount}</label>
                                    <input onChange={(ev) => {
                                        this.state.minStorageCount = ev.target.value
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.selectOption.storageDevice.minCount}
                                        max={this.state.maxStorageCount}
                                        defaultValue={this.state.selectOption.storageDevice.minCount} id="storageMinCount" />

                                    <label htmlFor="storageMaxCount" className="form-label">До {this.state.maxStorageCount}</label>
                                    <input onChange={(ev) => {
                                        this.state.maxStorageCount = ev.target.value;
                                        this.filterItems();
                                    }} type="range" className="form-range" min={this.state.minStorageCount}
                                        max={this.state.selectOption.storageDevice.maxCount}
                                        defaultValue={this.state.selectOption.storageDevice.maxCount} id="storageMaxCount" />
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
            procMinFrequency: data.processors.minFrequency,
            procMaxFrequency: data.processors.maxFrequency,


            minVideoCardCount: data.videoCard.minCount,
            maxVideoCardCount: data.videoCard.maxCount,


            powerUnitMinPower: data.powerSupplyUnit.minPower,
            powerUnitMaxPower: data.powerSupplyUnit.maxPower,

            
            minMemoryCount: data.ramMemory.minCount,
            maxMemoryCount: data.ramMemory.maxCount,
            minMemoryFrequency: data.ramMemory.minFrequency,
            maxMemoryFrequency: data.ramMemory.maxFrequency,


            minStorageCount: data.storageDevice.minCount,
            maxStorageCount: data.storageDevice.maxCount
        });
    }
}