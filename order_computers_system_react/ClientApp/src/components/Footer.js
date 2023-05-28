import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <footer>
                <div className="container">
                    &copy; 2023 - OuTouch <span>8 (800) 555 3535</span>
                </div>
            </footer>
        );
    }
}
