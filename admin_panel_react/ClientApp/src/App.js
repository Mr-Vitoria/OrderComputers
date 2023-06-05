import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import './custom.css';
import Cookies from 'universal-cookie';


export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.setTypePage = this.setTypePage.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.state = {
            typePage: '',
            message:null

        };
    }
    componentDidMount() {
        this.setTypePage('Login');
    }

    setMessage(Message) {
        this.setState({
            message: Message
        });
    }

    setTypePage(Page) {

        const cookies = new Cookies();

        if (Page == 'Login' && cookies.get('userId')!=null) {
            Page = 'Main';
        }
        if (Page == 'SignOut') {
            Page = 'Login';
            cookies.remove('userId', { path: '/' });
        }
        this.setState({
            typePage: Page
        });
    }
  render() {
      return (
           <>
              {
                  this.state.typePage == "Login" ?
                          <Login setTypePage={this.setTypePage} />
                      : null
              }
              {
                  this.state.typePage == "Main" ? <div>
                      <Layout setTypePage={this.setTypePage} setMessage={this.setMessage}>
                          <Routes>
                              {AppRoutes.map((route, index) => {
                                  const { element, ...rest } = route;
                                  return <Route key={index} {...rest} element={element} />;
                              })}
                          </Routes>
                      </Layout>
                      </div>
                      : null
              }          
              {
                  this.state.message != null ?

                      <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                          <div className="toast-header">
                              {/*<img src="..." className="rounded me-2" alt="..." />*/}
                              <button onClick={(ev) => {
                                  this.setMessage(null);
                              }} type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
                          <div className="toast-body">
                              {this.state.message }
                          </div>
                      </div>
                      : null
              }      

          </>
          
    );
  }
}
