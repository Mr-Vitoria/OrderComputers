import React, { Component } from 'react';

export class Header extends Component {
  constructor (props) {
    super(props);


  }

  render() {
      return (
          <header>
              <nav>
                  <div className="container">
                      <div>
                          <a href="/">
                              <img src={require('../public/images/OuTouch.png')} />
                          </a>
                      </div>
                      <div>
                          <a href="#">Модели</a>
                          <a href="/configuration">Конфигуратор</a>
                          <a href="#">Услуги</a>
                          <a href="#">Поддержка</a>
                      </div>
                      <div className="profileContainer">
                          <a href="/configuration">
                              <img src={require('../public/images/gearWheel.png')} />
                          </a>
                          <img src={require('../public/images/Bag.png')} />
                          <img src="https://www.pinclipart.com/picdir/big/178-1789203_user-icon-png-white-printer-logic-client-download.png" />
                      </div>
                  </div>
              </nav>
          </header>
    );
  }
}
