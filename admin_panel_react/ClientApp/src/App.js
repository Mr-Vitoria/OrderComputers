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
        this.state = {
            typePage: ''

        };
    }
    componentDidMount() {
        this.setTypePage('Login');
    }

    setTypePage(Page) {

        const cookies = new Cookies();

        if (Page == 'Login' && cookies.get('userId')!=null) {
            Page = 'Main';
        }
        if (Page == 'SignOut') {
            Page = 'Login';
            cookies.set('userId', null, { path: '/' });
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
                      <Layout setTypePage={this.setTypePage}>
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
          </>
          
    );
  }
}
