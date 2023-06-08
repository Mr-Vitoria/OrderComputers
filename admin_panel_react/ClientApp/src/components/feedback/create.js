import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            imageUrl:""
        };
        this.inputUserIdRef = React.createRef();
        this.inputTextRef = React.createRef();
        this.inputDateRef = React.createRef();


        this.setTypePage = props.setTypePage;
    }

    componentDidMount() {
        this.getData();
    }

    renderForm(data) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>

                            <div className="form-group">
                                <label className="control-label">User</label>
                                <select ref={this.inputUserIdRef} className="form-control" >
                                    {data.users.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Text</label>
                                <textarea className="form-control" ref={this.inputTextRef}>

                                </textarea>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Date</label>
                                <input ref={this.inputDateRef} className="form-control" type="date" />
                            </div>

                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.createItem();
                                }} className="btn btn-primary" >Add</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <a onClick={(ev) => {

                        this.setTypePage("Index");
                    }
                    }>Back to list</a>
                </div>
            </div>
        );
    }
    render() {
        let contents = this.state.loading
            ? <div className="middle">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
                <div className="bar bar4"></div>
                <div className="bar bar5"></div>
                <div className="bar bar6"></div>
                <div className="bar bar7"></div>
                <div className="bar bar8"></div>
            </div>
            : this.renderForm(this.state.data);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getData() {
        const response = await fetch('feedbacks/getselectlists');
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ data: data, loading: false });
        }
        else {

            Layout.setMessage('Error get feedback data: ' + response.statusText);
        }
    }

    async createItem() {
        const response = await fetch('feedbacks/create?'
            + 'userId=' + this.inputUserIdRef.current.value
            + '&date=' + this.inputDateRef.current.value
            + '&text=' + this.inputTextRef.current.value);


        if (response.status == 200) {

            Layout.setMessage('Feedback was created! ');
            this.setTypePage("Index");
        }
        else {

            Layout.setMessage('Error create feedback: ' + response.statusText);
        }
    }
}