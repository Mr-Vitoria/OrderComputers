import React, { Component } from 'react';
import { Layout } from '../Layout';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: [],
            loading: true,
            itemId: props.itemId
        };
        this.setTypePage = props.setTypePage;
    }

    componentDidMount() {
        this.getItem(this.state.itemId);
    }

    renderItem(item) {
        return (
            <>
                <div>
                    <h4>Detail user</h4>
                    <hr />
                    <dl className="row">
                        <dt className="col-sm-2">
                            Image
                        </dt>
                        <dd className="col-sm-10">
                            <img src={item.imgUrl} />
                        </dd>
                        <dt className="col-sm-2">
                            Name
                        </dt>
                        <dd className="col-sm-10">
                            {item.name }
                        </dd>
                        <dt className="col-sm-2">
                            Surname
                        </dt>
                        <dd className="col-sm-10">
                            {item.surname}
                        </dd>
                        <dt className="col-sm-2">
                            Phone
                        </dt>
                        <dd className="col-sm-10">
                            {item.phone }
                        </dd>
                        <dt className="col-sm-2">
                            Email
                        </dt>
                        <dd className="col-sm-10">
                            {item.email }
                        </dd>
                        <dt className="col-sm-2">
                            Password
                        </dt>
                        <dd className="col-sm-10">
                            {item.password}
                        </dd>
                        <dt className="col-sm-2">
                            Img url
                        </dt>
                        <dd className="col-sm-10">
                            {item.imgUrl}
                        </dd>
                        <dt className="col-sm-2">
                            Type user
                        </dt>
                        <dd className="col-sm-10">
                            {item.typeUser }
                        </dd>
                    </dl>
                </div>
                <div>
                    <a onClick={(ev) => {
                        this.setTypePage("Edit", item.id);
                    } }>Edit</a> |
                    <a onClick={(ev) => {
                        this.setTypePage("Index");
                    }}>Back</a>
                </div>
            </>

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
            : this.renderItem(this.state.item);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async getItem(Id) {
        const response = await fetch('users/detail?id=' + Id);
        if (response.status == 200) {

            const data = await response.json();
            this.setState({ item: data, loading: false });
        } else {

            Layout.setMessage('Error get user: ' + response.statusText);
        }
    }
}