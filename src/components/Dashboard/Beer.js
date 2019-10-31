import React from 'react'

export default function Beer(props) {
    return(
        <div className="" id="">
            <div>
                {props.name}
            </div>
            <div>
                {props.country}
            </div>
            <div>
                {props.alcohol}
            </div>
            <div>
                {props.photo}
            </div>
        </div>
    )
}