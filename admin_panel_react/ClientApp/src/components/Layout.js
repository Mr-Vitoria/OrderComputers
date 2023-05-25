import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;
    static setTypePage;
    constructor(props) {
        super(props);
        Layout.setTypePage = props.setTypePage;
    }

  render() {
      return (
          <>
              <NavMenu />
              <Container tag="main">
                  {this.props.children}
              </Container>            
          </>
    );
  }
}
