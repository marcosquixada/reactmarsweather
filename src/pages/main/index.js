import React, { Component } from "react";
import api from "../../services/api";

import './styles.css';

export default class Main extends Component{
    state = {
        products: [],
        page: 0,
        total: 0,
        startRec: 0,
        endRec: 25,
    }
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get("/");

        const endRec = 25*page;
        const startRec = endRec - 25;
        const total = response.data.length;

        this.setState({ products: response.data.slice(startRec, endRec), page: page, total: total});
    } 

    prevPage = () => {
        const { page, total, products } = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const { page, total, products } = this.state;
        if(page === total/25) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render(){
        const { products, page, total } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product.numericCode}>
                        <strong>
                            {product.name}
                        </strong>
                        <p>
                            {product.subregion}
                        </p>

                        <a href="">Access</a>
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