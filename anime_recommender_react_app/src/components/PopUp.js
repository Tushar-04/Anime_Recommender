import React from 'react';
import './PopUp.css';
export default function PopUp(props) {
    console.log(props.data);
    return (props.trigger) ? <>
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn btn-close" aria-label="Close" onClick={() => props.setTrigger(false)}></button>
                <div className="popup-box" style={{width: "100%",height:"600px"}}>
                    <img src={props.data.images} className="card-img-top mt-3" style={{width:"100%",height:"450px"}} alt="..."/>
                        <div className="popup-box-body py-3">
                            <h4 className="title ">{props.data.title}</h4>
                            <h6 className="line-1">Score : {props.data.score} , {props.data.rating} , Type : {props.data.type} , Episodes : {props.data.episodes } </h6>
                            <h6 className="text">Genres : {props.data.genres}</h6>
                            <h6 className="text">Popularity : {props.data.popularity} , Rank:{props.data.rank}</h6>
                            <h6 className="text">Season : {props.data.season} , Status : {props.data.status}</h6>
                            <p className="text">{props.data.synopsis}</p>
                        </div>
                </div>

            </div>
        </div>
    </> : "";
}