import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            data: null,
            loading: true,
            itemId: props.itemId,
            imageUrl:""
        };
        this.setTypePage = props.setTypePage;

        this.inputIdRef = React.createRef();
        this.inputUserIdRef = React.createRef();
        this.inputTextRef = React.createRef();

    }

    componentDidMount() {
        this.getItem(this.state.itemId);

    }

    renderItem(data,item) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <input defaultValue={item.id } ref={this.inputIdRef} type="hidden" className="form-control" />
                            <div className="form-group">
                                <label className="control-label">User</label>
                                <select defaultValue={ item.user.id } ref={this.inputUserIdRef} className="form-control" >
                                    {data.users.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Text</label>
                                <textarea defaultValue={item.text} className="form-control" ref={this.inputTextRef}>

                                </textarea>
                            </div>
                            <div className="form-group">
                                <button onClick={(ev) => {
                                    ev.preventDefault();
                                    this.editItem();
                                }} className="btn btn-primary">Save</button>
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
            : this.renderItem(this.state.data, this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('feedbacks/detail?id=' + Id);
        const responseSelectList = await fetch('feedbacks/getselectlists');
        if (response.status == 200 && responseSelectList.status == 200) {

            const data = await response.json();
            const selectList = await responseSelectList.json();
            this.setState({ item: data, data: selectList, loading: false });
        }
        else {

            Layout.setMessage('Error get feedback ');
        }
    }

    async editItem() {

        const response = await fetch('feedbacks/edit?id=' + this.inputIdRef.current.value
            + '&userId=' + this.inputUserIdRef.current.value
            + '&text=' + this.inputTextRef.current.value);

        if (response.status == 200) {

            this.setTypePage("Index");
            Layout.setMessage('Feedback was edited! ');
        }
        else {
            Layout.setMessage('Error edit feedback: ' + response.statusText);
        }
    }
}