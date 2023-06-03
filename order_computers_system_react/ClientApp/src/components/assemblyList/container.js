import React, { Component } from 'react';
import AssemblyBlock from './assemblyBlock'
import '../../public/css/assemblyList.css';
import SortBlock from './sortBlock';

export class AssemblyListContainer extends Component {
    static displayName = AssemblyListContainer.name;

    constructor(props) {
        super(props);
        this.state = {
            sortItems: null,
            defaultItems: null,
            loading: true,
        };

        this.changeSortItems = this.changeSortItems.bind(this);
    }

    componentDidMount() {

        this.getAssemblies();
    }

    changeSortItems(sortItems) {
        this.setState({
            sortItems: sortItems
        });
    }

    renderModel(model) {
        return (
            <div className="assemblyListContainer">

                <section>
                    <h2>Наши сборки</h2>
                    <div className="d-flex flex-row justify-content-between">
                        <SortBlock defaultItems={this.state.defaultItems} changeSortItems={this.changeSortItems} />
                        {model.length != 0 ?
                            <div className="assemblyList">
                                {model.map((item) => {

                                    return <AssemblyBlock item={item} key={item.id} />

                                })}
                        </div>
                            : <div className="errorContainer">
                                <h1>По выбранным фильтрам сборок не найдено.</h1>
                                <h2>Попробуйте изменить фильтры</h2>
                            </div>
                        }
                    </div>
                    
                    
                </section>

            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <div className="preloader">
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5ebd3e" />
                            <stop offset="33%" stopColor="#ffb900" />
                            <stop offset="67%" stopColor="#f78200" />
                            <stop offset="100%" stopColor="#e23838" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#e23838" />
                            <stop offset="33%" stopColor="#973999" />
                            <stop offset="67%" stopColor="#009cdf" />
                            <stop offset="100%" stopColor="#5ebd3e" />
                        </linearGradient>
                    </defs>
                    <g fill="none" strokeLinecap="round" strokeWidth="16">
                        <g className="ip__track" stroke="#ddd">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g strokeDasharray="180 656">
                            <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                    </g>
                </svg>
            </div>
            : this.renderModel(this.state.sortItems);

        return (
            <div>
                {contents}
            </div>
        );
    }


    async getAssemblies() {
        const response = await fetch('ordersystem/getassemblylist');
        const data = await response.json();
        this.setState({ defaultItems: data, sortItems:data, loading: false });
    }
}



