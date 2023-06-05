import React, { Component } from 'react';
import AssemblyBlock from './assemblyBlock'
import '../../public/css/assemblyList.css';
import SortBlock from './sortBlock';

export class AssemblyListContainer extends Component {
    static displayName = AssemblyListContainer.name;

    constructor(props) {
        super(props);
        this.state = {
            sortItems: null,
            defaultItems: null,
            loading: true,
            descriptionItem: null
        };

        this.changeSortItems = this.changeSortItems.bind(this);
        this.setDescriptionItem = this.setDescriptionItem.bind(this);
    }

    componentDidMount() {

        this.getAssemblies();
    }

    changeSortItems(sortItems) {
        this.setState({
            sortItems: sortItems
        });
    }

    setDescriptionItem(Item) {
        this.setState({ descriptionItem: Item });
    }

    renderModel(model) {
        return (
            <>
                <div className="modal fade" id="descriptionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                {this.state.descriptionItem != null ? <>
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{this.state.descriptionItem.name}</h1>
                                </>
                                    : null
                                }
                                
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {this.state.descriptionItem != null ? <>
                                    <img src={this.state.descriptionItem.imgUrl} />

                                    <h2>Процессор:</h2>
                                    <p>Название: {this.state.descriptionItem.compProcessor.name}</p>
                                    <p>Производитель: {this.state.descriptionItem.compProcessor.producer}</p>
                                    <p>Сокет: {this.state.descriptionItem.compProcessor.socket}</p>
                                    <p>Количество ядер: {this.state.descriptionItem.compProcessor.countCores}</p>
                                    <p>Количество потоков: {this.state.descriptionItem.compProcessor.countThreads}</p>
                                    <p>Частота(МГц): {this.state.descriptionItem.compProcessor.frequency}</p>
                                    <p>Встроенное графическое ядро: {this.state.descriptionItem.compProcessor.haveVideoCard ? "Имеет" : "Не имеет"}</p>
                                    <p>Цена: {this.state.descriptionItem.compProcessor.price} руб.</p>


                                    <h2>Видеокарта:</h2>
                                    <p>Название: {this.state.descriptionItem.videoCard.name}</p>
                                    <p>Производитель: {this.state.descriptionItem.videoCard.producer}</p>
                                    <p>Семейство: {this.state.descriptionItem.videoCard.family}</p>
                                    <p>Поколение: {this.state.descriptionItem.videoCard.generation}</p>
                                    <p>Серия: {this.state.descriptionItem.videoCard.series}</p>
                                    <p>Тип памяти: {this.state.descriptionItem.videoCard.type}</p>
                                    <p>Объем памяти(Мб): {this.state.descriptionItem.videoCard.count}</p>
                                    <p>Цена: {this.state.descriptionItem.videoCard.price} руб.</p>


                                    <h2>Материнская плата:</h2>
                                    <p>Название: {this.state.descriptionItem.motherCard.name}</p>
                                    <p>Размер: {this.state.descriptionItem.motherCard.size}</p>
                                    <p>Сокет для процессора: {this.state.descriptionItem.motherCard.socket}</p>
                                    <p>Цена: {this.state.descriptionItem.motherCard.price} руб.</p>


                                    <h2>Блок питания:</h2>
                                    <p>Название: {this.state.descriptionItem.powerSupplyUnit.name}</p>
                                    <p>Форм фактор: {this.state.descriptionItem.powerSupplyUnit.formFactor}</p>
                                    <p>Мощность(Вт): {this.state.descriptionItem.powerSupplyUnit.power}</p>
                                    <p>Цена: {this.state.descriptionItem.powerSupplyUnit.price} руб.</p>
                                    
                                    <h2>Оперативная память:</h2>
                                    <p>Название: {this.state.descriptionItem.ramMemory.name}</p>
                                    <p>Тип памяти: {this.state.descriptionItem.ramMemory.type}</p>
                                    <p>Объем памяти(Мб): {this.state.descriptionItem.ramMemory.count}</p>
                                    <p>Частота(МГц): {this.state.descriptionItem.ramMemory.frequency}</p>
                                    <p>Цена: {this.state.descriptionItem.ramMemory.price} руб.</p>


                                    <h2>{this.state.descriptionItem.storageDevice.type}:</h2>
                                    <p>Название: {this.state.descriptionItem.storageDevice.name}</p>
                                    <p>Объем памяти(Мб): {this.state.descriptionItem.storageDevice.count}</p>
                                    <p>Цена: {this.state.descriptionItem.storageDevice.price} руб.</p>


                                    <h2>Корпус:</h2>
                                    <p>Название: {this.state.descriptionItem.compBody.name}</p>
                                    <p>Форм фактор: {this.state.descriptionItem.compBody.formFactor}</p>
                                    <p>Цена: {this.state.descriptionItem.compBody.price} руб.</p>
                                </>
                                    : null
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="assemblyListContainer">

                    <section>
                        <h2>Наши сборки</h2>
                        <div className="d-flex flex-row justify-content-between">
                            <SortBlock defaultItems={this.state.defaultItems} changeSortItems={this.changeSortItems} />
                            {model.length != 0 ?
                                <div className="assemblyList">
                                    {model.map((item) => {

                                        return <AssemblyBlock setDescriptionItem={this.setDescriptionItem} item={item} key={item.id} />

                                    })}
                                </div>
                                : <div className="errorContainer">
                                    <h1>По выбранным фильтрам сборок не найдено.</h1>
                                    <h2>Попробуйте изменить фильтры</h2>
                                </div>
                            }
                        </div>

                    </section>

                </div>
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <div className="preloader">
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5ebd3e" />
                            <stop offset="33%" stopColor="#ffb900" />
                            <stop offset="67%" stopColor="#f78200" />
                            <stop offset="100%" stopColor="#e23838" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#e23838" />
                            <stop offset="33%" stopColor="#973999" />
                            <stop offset="67%" stopColor="#009cdf" />
                            <stop offset="100%" stopColor="#5ebd3e" />
                        </linearGradient>
                    </defs>
                    <g fill="none" strokeLinecap="round" strokeWidth="16">
                        <g className="ip__track" stroke="#ddd">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g strokeDasharray="180 656">
                            <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                    </g>
                </svg>
            </div>
            : this.renderModel(this.state.sortItems);

        return (
            <div>
                {contents}
            </div>
        );
    }


    async getAssemblies() {
        const response = await fetch('ordersystem/getassemblylist');
        const data = await response.json();
        this.setState({ defaultItems: data, sortItems: data, loading: false });
    }
}



