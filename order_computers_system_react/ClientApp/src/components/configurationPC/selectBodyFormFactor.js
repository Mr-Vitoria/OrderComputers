import React, { Component } from 'react';

export default class SelectBodyFormFactor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: ["Super/Ultra Tower", "Full Tower", "Mid Tower", "Mini Tower", "Small form factor","HTPC"],
            loading: true,
            selectItem: null
        };
        this.changeItem = props.changeItem;

        this.parentRef = React.createRef();
    }

    render() {
        return (
            <>
                <div ref={this.parentRef} onClick={(ev) => {
                    this.parentRef.current.classList.toggle('show');
                    this.parentRef.current.scrollTo(0, 0);
                }} className="select">
                    <div className="selectMenuValue">
                        {this.state.selectItem == null ? <span>Форм фактор корпуса</span>
                            : <div className="container">
                                <span>{this.state.selectItem}</span>
                            </div>}

                    </div>
                    <ul className="selectMenu">
                        {
                            this.state.model.map((item,key) => {
                                return <li key={key} className="selectoption container" onClick={(ev) => {
                                    this.setState({
                                        selectItem: item
                                    });
                                    //this.changeItem(item);
                                }}>
                                    <span>{item}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </>
        );
    }
}