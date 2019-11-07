import React from 'react'
import GetFlag from "../GetFlag";

export default function Beer(props) {
    return(
        <div className="beer" id="">
            <div className="beerPhoto">
                <img src={props.photo} alt=""/>
            </div>
            <div className="beerSide">
                <div className="beerTitle">
                    <h1>{props.name}</h1>
                    <GetFlag flagName={props.country} />
                </div>
                <div className="beerInfo">
                    <h1>Alcohol: {props.alcohol}%</h1>
                    <h1>Rating: {props.rating}</h1>
                    <h1>IBU: {props.IBU}</h1>
                </div>
            </div>
        </div>  
    )
}