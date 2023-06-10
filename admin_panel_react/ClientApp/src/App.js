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

              {/*<img className="chibiImg" src="https://sun6-23.userapi.com/impg/MfbIkixM8vbvnkIiz3sZcah4yHlEO_bfRxZplQ/l7qiy32ZodU.jpg?size=604x604&quality=96&sign=ebd61ead561be6f64dbdc02f404a022d&c_uniq_tag=xHqTKFttY3FtB54arr1dk_iOHCrZ4h6SNTtXxBuWh0c&type=album" />*/}
              <img className="chibiImg" src="https://sun6-23.userapi.com/s/v1/ig2/2J2_vsBto7pdIrKHpbr1MU6gVlPhSitwgv5DlYAPIKIenWG8HgWNZCFRbJe13gb7CL-o8AGQL4iQxjZvRkzjKUqF.jpg?size=414x672&quality=96&crop=157,0,414,672&ava=1" />
          </>
          
    );
  }
}
