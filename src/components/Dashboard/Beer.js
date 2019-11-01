import React from 'react'

export default function Beer(props) {
    return(
        <div className="beer" id="">
                <h1>Name: {props.name}</h1>
                <h1>Country: {props.country}</h1>
                <h1>Alcohol: {props.alcohol}%</h1>
                <h1>{props.photo}</h1>
        </div>
    )
}