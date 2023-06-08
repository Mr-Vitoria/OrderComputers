import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import '../../public/css/index.css';

export class IndexContainer extends Component {
    static displayName = IndexContainer.name;

    constructor(props) {
        super(props);
        this.state = {
            model: null,
            loading: true,
            user: null,
            descriptionItem: null
        };

        this.inputTextFeedbackRef = React.createRef();

        this.addFeedback = this.addFeedback.bind(this);
    }

    componentDidMount() {
        this.getModel();
    }

    async addFeedback() {


        await fetch('ordersystem/addFeedback?userId=' + this.state.user.id
            +'&text=' + this.inputTextFeedbackRef.current.value
            + '&date=' + new Date().toISOString().substring(0, 10));
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
                                    {this.state.descriptionItem.videoCard != null ?
                                        <>
                                        <p>Название: {this.state.descriptionItem.videoCard.name}</p>
                                    <p>Производитель: {this.state.descriptionItem.videoCard.producer}</p>
                                    <p>Семейство: {this.state.descriptionItem.videoCard.family}</p>
                                    <p>Поколение: {this.state.descriptionItem.videoCard.generation}</p>
                                    <p>Серия: {this.state.descriptionItem.videoCard.series}</p>
                                    <p>Тип памяти: {this.state.descriptionItem.videoCard.type}</p>
                                    <p>Объем памяти(Мб): {this.state.descriptionItem.videoCard.count}</p>
                                    <p>Цена: {this.state.descriptionItem.videoCard.price} руб.</p>
                                    </>
                                    :<p>Отсутствует</p>    
                                }

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
                                    <p>Объем памяти(Гб): {this.state.descriptionItem.storageDevice.count}</p>
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


            <div className="indexContainer">
                <OwlCarousel className='infoCarousel' loop items={1} margin={30} dots={false} autoplay={true}>
                    <div className="item ">
                        <img src="https://voltcave.com/wp-content/uploads/2020/05/Tech4Gaming-Retrowave-Featured-Image.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="item">
                        <img src="https://modguru.net/wp-content/uploads/2016/12/ttces1.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="item">
                        <img src="https://i.pinimg.com/originals/8a/6c/2e/8a6c2e45cfb9e32859e9e7fa80350ad1.jpg" className="d-block w-100" alt="..." />
                    </div>
                </OwlCarousel>

                <section>
                    <h1>Наши модели</h1>
                    <div className="cardsContainer modelsContainer">

                        {model.typesComputerAssembly.map((item, key) =>
                            <a key={key} href="#">

                                <div className="card">
                                    <img src={item.item2} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">{item.item1}</p>
                                        <p className="card-text">От {item.item3} руб.</p>
                                    </div>
                                </div>
                            </a>
                        )}
                    </div>
                </section>


                <section>
                    <h1>Лучшие сборки</h1>
                    <OwlCarousel className='cardsContainer' loop items={3 } margin={30} autoWidth={ true } dots={ false } autoplay={ true }>
                            {model.bestComputerAssemblies.map(item =>
                                <a key={item.id} href="#" onClick={(ev) => {
                                    this.setState({
                                        descriptionItem: item
                                    });
                                }}>

                                <div className="card">
                                    <img src={item.imgUrl} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">{item.name}</p>
                                        <p className="card-text">От {item.costPrice} руб.</p>
                                    </div>
                                </div>
                            </a>
                        )}
                    </OwlCarousel>
                </section>


                <section>
                    <h1>Собрать самому</h1>
                    <div className="cardsContainer servicesContainer">
                        <a href="/configuration">
                        <div className="card" >
                                <img src="https://cdn.onlinewebfonts.com/svg/download_542828.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Конфигуратор</p>
                            </div>
                            </div>
                        </a>
                        <a href="/configuration">
                        <div className="card">
                                <img src="https://cdn.onlinewebfonts.com/svg/download_542828.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Заказать</p>
                            </div>
                        </div>
                    </a>
                    </div>
                </section>

                <section>
                    <h1>Доверяй нам</h1>
                    <div className="TextContainer">
                        <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" />
                        <p>С нами работают только профессионалы своего дела</p>
                    </div>
                    <div className="TextContainer">
                        <p>Наша цель - помочь вам</p>
                        <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" />
                    </div>
                </section>


                <section className="feedbackSection">
                    <h1>Отзывы о нас</h1>
                    {this.state.user != null ? <>
                        <h2 style={{ textAlign: "left" }}>Оставить отзыв о нас</h2>
                        <div className="feedBack">
                            <div className="imgContainer">
                                <img src={this.state.user.imgUrl} /> <span>{this.state.user.name}</span>
                            </div>
                            <textarea ref={this.inputTextFeedbackRef}>
                            </textarea>
                        </div>
                            <button onClick={(ev) => {

                            this.addFeedback();
                            window.location.reload();
                        }}>Оставить</button>
                    </>
                        : null
                    }
                    <h2 style={{ textAlign: "left", margin: "40px 0" }}>Последние отзывы</h2>
                    {model.feedbacks.map(item =>
                        <div key={item.id} className="feedBack">
                            <div className="feedBackHeader">
                            
                            <div className="imgContainer">
                                <img src={item.user.imgUrl} /> 
                            </div>
                            <span>{item.user.name}</span>
                                <span>{item.date.slice(8, 10) + '.' + item.date.slice(5, 7) + '.' + item.date.slice(0, 4)}</span>
                            </div>
                                <p>{item.text}</p>
                        </div>
                    )}


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
            : this.renderModel(this.state.model);

        return (
            <div>
                {contents}
            </div>
        );
    }


    async getModel() {
        const response = await fetch('ordersystem/getindexmodel');
        const data = await response.json();



        this.setState({ model: data, loading: false });

        this.getUser();
    }


    async getUser() {

        const cookies = new Cookies();
        const response = await fetch('ordersystem/getuserbyid?id=' + cookies.get('userId'));
        if (response.status == 200) {

            const data = await response.json();

            this.setState({
                user: data,
                loading: false
            });
        } else {
            console.log('Error get user info: ');
        }
    }
}