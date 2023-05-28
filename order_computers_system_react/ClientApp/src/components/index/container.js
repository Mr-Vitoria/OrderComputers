import React, { Component } from 'react';
import '../../public/css/index.css';

export class IndexContainer extends Component {
    static displayName = IndexContainer.name;

    constructor(props) {
        super(props);
        this.state = {
            model: null,
            loading: true
        };
    }

    componentDidMount() {
        this.getModel();
    }

    renderModel(model) {

        return (
            <>
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

                                <div className="card" style={{width:'18rem'}}>
                                    <img src={item.item2} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">{item.item1 }</p>
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
                            <a key={item.id } href="#">

                                <div className="card" style={{ width: '18rem' }}>
                                    <img src={item.imgUrl} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">{item.id}</p>
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

               
                <section>
                    <h1>Отзывы о нас</h1>
                    <div className="feedBack">
                        <div className="imgContainer">
                            <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" />
                        </div>
                        <p></p>
                    </div>
                    <div className="feedBack">
                        <div className="imgContainer">
                            <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" />
                        </div>
                        <p></p>
                    </div>
                    <div className="feedBack">
                        <div className="imgContainer">
                            <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" />
                        </div>
                        <p></p>
                    </div>
                    <div className="feedBack">
                        <div className="imgContainer">
                            <img src="https://games.mail.ru/hotbox/content_files/gallery/2020/12/24/0bfa60d58df9494580c305d074a4908e.jpg" />
                        </div>
                        <p></p>
                    </div>
                </section>
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p>Загрузка...</p>
            : this.renderModel(this.state.model);

        return (
            <div>
                {contents}
            </div>
        );
    }


    async getModel() {
        const response = await fetch('ordersystem/getindexmodel');
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({ model: data, loading: false });
    }
}


 //<section>
 //                   <h1>��� ������</h1>
 //                   <div className="cardsContainer">
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="...">
 //                               <div className="card-body">
 //                                   <p className="card-text">������</p>
 //                                   <p className="card-text">�� 10000</p>
 //                               </div>
 //                       </div>
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="..." />
 //                           <div className="card-body">
 //                               <p className="card-text">������</p>
 //                               <p className="card-text">�� 10000</p>
 //                           </div>
 //                       </div>
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="..." />
 //                           <div className="card-body">
 //                               <p className="card-text">������</p>
 //                               <p className="card-text">�� 10000</p>
 //                           </div>
 //                       </div>
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="..." />
 //                           <div className="card-body">
 //                               <p className="card-text">������</p>
 //                               <p className="card-text">�� 10000</p>
 //                           </div>
 //                       </div>
 //                   </div>
 //               </section>


 //               <section>
 //                   <h1>���������</h1>
 //                   <div className="cardsContainer">
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="..." />
 //                           <div className="card-body">
 //                               <p className="card-text">���������</p>
 //                               <p className="card-text">�� 10000</p>
 //                           </div>
 //                       </div>
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="..." />
 //                           <div className="card-body">
 //                               <p className="card-text">���������</p>
 //                               <p className="card-text">�� 10000</p>
 //                           </div>
 //                       </div>
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="..." />
 //                           <div className="card-body">
 //                               <p className="card-text">���������</p>
 //                               <p className="card-text">�� 10000</p>
 //                           </div>
 //                       </div>
 //                       <div className="card" style="width: 18rem;">
 //                           <img src="..." className="card-img-top" alt="..." />
 //                           <div className="card-body">
 //                               <p className="card-text">���������</p>
 //                               <p className="card-text">�� 10000</p>
 //                           </div>
 //                       </div>
 //                   </div>
 //               </section>