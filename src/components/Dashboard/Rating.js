import React, { Component } from 'react';

export default class Rating extends Component {

    state = {
        rating: 0
    }

    getRating = (e) =>{
        this.setState({rating: e.target.id});
    }

    render() {
        return(
        <div className="rating" rating={this.state.rating}>
            <div className="star" onClick={this.getRating}><i className="fas fa-star" id="1"></i></div>
            <div className="star" onClick={this.getRating}><i className="fas fa-star" id="2"></i></div>
            <div className="star" onClick={this.getRating}><i className="fas fa-star" id="3"></i></div>
            <div className="star" onClick={this.getRating}><i className="fas fa-star" id="4"></i></div>
            <div className="star" onClick={this.getRating}><i className="fas fa-star" id="5"></i></div>
        </div>
        )
    }
}