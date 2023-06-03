import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../../public/css/index.css';

export class IndexContainer extends Component {
    static displayName = IndexContainer.name;

    constructor(props) {
        super(props);
        this.state = {
            model: null,
            loading: true,
            user: null
        };

        this.inputTextFeedbackRef = React.createRef();

        this.addFeedback = this.addFeedback.bind(this);
    }

    componentDidMount() {
        this.getModel();
    }

    async addFeedback() {

        await fetch('ordersystem/addFeedback?userId=' + this.state.user.id
            +'&text=' + this.inputTextFeedbackRef.current.value);
    }

    renderModel(model) {

        return (
            <div className="indexContainer">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                </div>

                <section>
                    <h1>Наши модели</h1>
                    <div className="cardsContainer">

                        {model.typesComputerAssembly.map((item, key) =>
                            <a key={key} href="#">

                                <div className="card" style={{ width: '18rem' }}>
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
                    <div className="cardsContainer">

                        {model.bestComputerAssemblies.map(item =>
                            <a key={item.id} href="#">

                                <div className="card" style={{ width: '18rem' }}>
                                    <img src={item.imgUrl} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">{item.name}</p>
                                        <p className="card-text">От {item.costPrice} руб.</p>
                                    </div>
                                </div>
                            </a>
                        )}
                    </div>
                </section>


                <section>
                    <h1>Собрать самому</h1>
                    <div className="cardsContainer">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Конфигуратор</p>
                            </div>
                        </div>
                        <div className="card" style={{ width: '18rem' }}>
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Заказать</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h1>Доверяй нам</h1>
                    <div className="TextContainer">
                        <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" />
                        <p>Лучшие специалисты</p>
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
                            <div className="imgContainer">
                                <img src={item.user.imgUrl} /> <span>{item.user.name}</span>
                            </div>
                            <p>{item.text}</p>
                        </div>
                    )}


                </section>
            </div>
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