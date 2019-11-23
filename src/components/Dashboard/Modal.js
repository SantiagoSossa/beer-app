import React, { Component } from 'react';
import Backdrop from './Backdrop';
import firebase from 'firebase';
import 'firebase/database'; 
import "firebase/auth";
import undefined from 'firebase/database';
import officialBeerHandler from '../officialBeerHandler';
import MessageModal from './MessageModal';

export default class Modal extends Component {

    state = {
        modalDeleteShow:false,
        modalEditShow: false
    }

    handleModalOpen = () => {
        this.setState({modalDeleteShow: true});
    }

    handleModalClose = () => {
        this.setState({modalDeleteShow: false});
    }

    handleEditModalOpen = () => {
        this.setState({modalEditShow: true});
    }

    handleEditModalClose = () => {
        this.setState({modalEditShow: false});
    }

    editBeer = async (e) => {
        e.preventDefault();
        const { name, country, alcohol, ibu, rating, photo } = e.target.elements;
        this.editBeerInfo(name,country,alcohol,ibu,rating,(typeof photo.files[0] == 'undefined')? this.props.beer.photo : await this.editBeerPicture(photo));
    }

    editBeerInfo = (name, country, alcohol, ibu, rating, url) => {
        const db =  firebase.database();
        db.ref('beers/'+firebase.auth().currentUser.uid+"/"+this.props.id).update({
            name: name.value,
            country: country.value,
            alcohol: alcohol.value,
            ibu: ibu.value,
            rating: rating.value,
            photo: url
        });
    }

    editBeerPicture = async (photo) => {
        const user = (firebase.auth().currentUser.uid).toString();
        const fileName = photo.files[0].name;
        const fileDate = photo.files[0].lastModified.toString();
        console.log("test", user+fileDate+fileName);
        var blob = photo.files[0].slice(0, photo.files[0].size, 'image/png'); 
        const newFile = new File([blob], user+fileDate+fileName , {type: 'image/png'});
        const photoUpload = await firebase.storage().ref('beer_photos/'+ newFile.name);
        await photoUpload.put(newFile);
        
        const url = await firebase.storage().ref().child('beer_photos/'+newFile.name).getDownloadURL();

        //delete old image
        this.deletePhoto();
        return url;
    }

    deletePhoto = async ()=>{
        const firstSplitName = this.props.beer.photo.split("%2F");
        const secondSplitName = firstSplitName[1].split("?alt");
        const imageRef = firebase.storage().ref().child('beer_photos/'+secondSplitName[0]);
        await imageRef.delete().then(function() {
            // Image deleted
          }).catch(function(error) {
            // Error
          });
    }

    deleteBeer = async () =>{
        console.log("borrar", this.props.id)
        const db =  firebase.database();
        await db.ref().child('beers/'+firebase.auth().currentUser.uid+"/"+this.props.id).remove();
        this.deletePhoto();
    }

    checkRating = (e) => {
        if(this.props.beer.rating == e.target.value){
            return true;
        }
        else{
            return false;
        }
    }

    render() {
        const beer ={
            name:this.props.beer.name,
            alcohol:this.props.beer.alcohol,
            country:this.props.beer.country,
            photo:this.props.beer.photo,
            IBU:this.props.beer.IBU,
            rating:this.props.beer.rating
        }
        let modal = null;
        if(this.state.modalDeleteShow){
            console.log("hi");
            modal = <MessageModal 
                show={this.state.modalDeleteShow}
                modalClosed={this.handleModalClose}
                clicked={this.deleteBeer}
                message={'Are you sure you want to delete this beer?'}
                type={'delete'}>
            </MessageModal>;
        }
        if(this.state.modalEditShow){
            modal = <MessageModal 
                show={this.state.modalDeleteShow}
                modalClosed={this.handleEditModalClose}
                message={'successfully edited'}
                type={'update'}>
            </MessageModal>;
        }
        return(
            <div>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className="editModal">
                <h1>Edit Beer</h1>
                <div className="modalBody">
                    <div className="modalPhoto">
                        <img src={this.props.beer.photo} alt="Beer Photo"/>
                        <button className="btn btn-block btn-primary rounded btn-shadow-hover" 
                                    onClick={()=>{officialBeerHandler.request(beer)}}>Request this beer</button>
                    </div>
                    <div className="modalInfo">
                        <form className="" onSubmit={this.editBeer}>
                            <div className="form-group-modal">
                            <label style={{"color": "black"}}>
                                Name
                                <input className="form-control" type="text" name="name" id="" defaultValue={this.props.beer.name} placeholder="Beer Name"/>
                            </label>
                            </div>
                            <div className="form-group-modal">
                            <label style={{"color": "black"}}>
                                Country
                                <input className="form-control" type="text" name="country" id="" defaultValue={this.props.beer.country} placeholder="Beer Country"/>
                            </label>
                            </div>
                            <div className="form-group-modal">
                            <label style={{"color": "black"}}>
                                Alcohol
                                <input className="form-control" type="text" name="alcohol" id="" defaultValue={this.props.beer.alcohol} placeholder="Beer Acohol %"/>
                            </label>
                            </div>
                            <div className="form-group-modal">
                            <label style={{"color": "black"}}>
                                IBU
                                <input className="form-control" type="text" name="ibu" id="" defaultValue={this.props.beer.IBU} placeholder="Beer IBU"/>
                            </label>
                            </div>
                            <div className="form-group-modal">
                            <label style={{"color": "black"}}>
                            <div className="star-rating">
                                Rating
                                <div className="rate">
                                    <input type="radio" id="star5" name="rating" value="5" checked={this.checkRating}/>
                                    <label htmlFor="star5" title="text">5 stars</label>
                                    <input type="radio" id="star4" name="rating" value="4" checked={this.checkRating}/>
                                    <label htmlFor="star4" title="text">4 stars</label>
                                    <input type="radio" id="star3" name="rating" value="3" checked={this.checkRating}/>
                                    <label htmlFor="star3" title="text">3 stars</label>
                                    <input type="radio" id="star2" name="rating" value="2" checked={this.checkRating}/>
                                    <label htmlFor="star2" title="text">2 stars</label>
                                    <input type="radio" id="star1" name="rating" value="1" checked={this.checkRating}/>
                                    <label htmlFor="star1" title="text">1 star</label>
                                </div>
                            </div>
                            </label>
                            </div>
                            <div className="form-group-modal">
                            <label style={{"color": "black"}}>
                                Photo
                                <br></br>
                                <span><i class="fas fa-camera"></i></span>
                                <input className="form-control" type="file" style={{display:'none'}} name="photo" id="" placeholder="Beer Photo"/>
                            </label>
                            </div>
                            <div className="modalButtons">
                                <button type="submit" className="btn btn-block btn-primary rounded btn-shadow-hover" onClick={this.handleEditModalOpen}>Edit</button>
                                <button className="btn btn-block btn-primary rounded btn-shadow-hover" style={{backgroundColor:'#DE3F44'}} onClick={this.handleModalOpen}>Delete</button>
                                <button className="btn btn-block btn-primary rounded btn-shadow-hover" style={{backgroundColor:'#ccc'}} onClick={this.props.modalClosed}>Close</button>
                            </div>
                            {modal}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}