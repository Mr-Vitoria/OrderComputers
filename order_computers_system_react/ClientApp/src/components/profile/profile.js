import React, { Component } from 'react';

export default class Profile extends Component {
    static displayName = Profile.name;

    constructor(props) {
        super(props);
        this.inputPhoneRef = React.createRef();
        this.inputPasswordRef = React.createRef();
    }
    async checkUser() {

    }

    render() {

        return (
            <div>

            </div>
        );
    }
}