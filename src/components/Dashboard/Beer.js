import React, { Component } from 'react';
import GetFlag from "../GetFlag";
import officialBeerHandler from '../officialBeerHandler';
import Modal from './Modal';

export default class Beer extends Component {

    state = {
        editBeer:false
    }

    handleModalOpen = () => {
        console.log("open")
        this.setState({editBeer: true});
    }

    handleModalClose = () => {
        this.setState({editBeer: false});
    }

    render() {
        const beer ={
            name:this.props.name,
            alcohol:this.props.alcohol,
            country:this.props.country,
            photo:this.props.photo,
            IBU:this.props.IBU
        }
        let modal = null;
        if(this.state.editBeer){
            modal = <Modal 
                show={this.state.editBeer}
                modalClosed={this.handleModalClose}
                id={this.props.id}
                beer={beer}>
            </Modal>;
        }
        return(
            <div>
                <div className="beer" id="">
                <div className="beerPhoto">
                    <img src={this.props.photo} alt=""/>
                </div>
                <div className="beerSide">
                    <div className="beerTitle">
                        <h1>{this.props.name}</h1>
                        <GetFlag flagName={this.props.country} />
                    </div>
                    <div className="beerInfo">
                        <h1>Alcohol: {this.props.alcohol}%</h1>
                        <h1>Rating: {this.props.rating}</h1>
                        <h1>IBU: {this.props.IBU}</h1>
                        <button onClick={()=>{officialBeerHandler.request(beer)}}>Make request</button>
                    </div>
                </div>
                <i className='fas fa-ellipsis-v' onClick={this.handleModalOpen}></i>{modal}
                </div> 
            </div>
            
        )
    }
}