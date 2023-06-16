import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            item: null,
            loading: true
        };
    }

    renderItem(item) {
        return (
            <div>
                <h1>Добрый день, { item.name}!</h1>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : this.renderItem(this.state.item);
        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        const cookies = new Cookies();
        const response = await fetch('users/detail?id=' + cookies.get('userId'));
        const data = await response.json();
        this.setState({ item: data, loading: false });
    }
}
