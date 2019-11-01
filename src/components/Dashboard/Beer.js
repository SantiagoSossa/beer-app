import React from 'react'

export default function Beer(props) {
    return(
        <div className="beer" id="">
            <div className="beerPhoto">
                <img src="{props.photo}" alt=""/>
            </div>
            <div className="beerInfo">
                <h1>Name: {props.name}</h1>
                <h1>Country: {props.country}</h1>
                <h1>Alcohol: {props.alcohol}%</h1>
                <h1>Rating: {props.rating}</h1>
                <h1>IBU: {props.IBU}</h1>
            </div>
        </div>  
    )
}