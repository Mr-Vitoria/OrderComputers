import React, { Component } from 'react';

export default class SelectMenuBodies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: props.model,
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
                        {this.state.selectItem == null ? <span>Корпус</span>
                            : <div className="container">
                                <img src={this.state.selectItem.imgUrl} />
                                <span>{this.state.selectItem.name}</span>
                                <div className="properties">
                                    <span>Форм-фактор: {this.state.selectItem.formFactor}</span>
                                </div>
                            </div>}

                    </div>
                    <ul className="selectMenu">
                        {
                            this.state.model.map(item => {
                                return <li key={item.id} className="selectoption container" onClick={(ev) => {
                                    this.setState({
                                        selectItem: item
                                    });
                                    this.changeItem(item);
                                }}>
                                    <img src={ item.imgUrl} />
                                    <span>{item.name}</span>
                                    <div className="properties">
                                        <span>Форм-фактор: {item.formFactor}</span>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </>
        );
    }
}