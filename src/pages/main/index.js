import React, { Component } from "react";
import api from "../../services/api";

import './styles.css';

export default class Main extends Component{
    state = {
        sols: [],
        page: 0,
        total: 0,
        startRec: 0,
        endRec: 25,
    }
    componentDidMount(){
        this.loadsols();
    }

    loadsols = async (page = 1) => {
        const response = await api.get("/");

        const endRec = 25*page;
        const startRec = endRec - 25;
        const total = response.data.length;

        this.setState({ sols: response.data.data.content.slice(startRec, endRec), page: page, total: total});
    } 

    prevPage = () => {
        const { page, total, sols } = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadsols(pageNumber);
    }
    nextPage = () => {
        const { page, total, sols } = this.state;
        if(page === total/25) return;

        const pageNumber = page + 1;

        this.loadsols(pageNumber);
    }

    render(){
        const { sols, page, total } = this.state;

        return (
            <div className="product-list">
                {sols.map(sol => (
                    <article key={sol.id}>
                        <strong>
                            SOL: {sol.id}
                        </strong>
                        <p>
                            Avg Weather: {sol.av}
                        </p>

                        <a href="">Details</a>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Before</button>
                    <button disabled={page === total/25} onClick={this.nextPage}>After</button>
                </div>
            </div>
        );
    }
}