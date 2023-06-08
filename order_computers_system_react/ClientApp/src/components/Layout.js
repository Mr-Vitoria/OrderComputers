import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Header } from './Header';
import { Footer } from './Footer';
import '../public/css/site.css'

export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {
        super(props);
        this.state = {
            message: null
        };
        Layout.changeMessage = this.changeMessage.bind(this);
    }

    changeMessage(Message) {
        this.setState({
            message: Message
        });
    }

    render() {
        return (
            <div>
                {this.state.message != null ?

                    <div className="alert alert-dark alert-dismissible fade show" role="alert">
                        {this.state.message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={(ev) => { Layout.changeMessage(null) }} aria-label="Close"></button>
                    </div>
                :null
                }
                <Header />
                <Container tag="main">
                    {this.props.children}
                </Container>
                <Footer />
            </div>
        );
    }
}
