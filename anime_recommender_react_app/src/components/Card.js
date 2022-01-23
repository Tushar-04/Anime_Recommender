import React from 'react';
import PopUp from './PopUp';
import { useState } from "react";
export default function Card(props) {
    const [animeDetails,setAnime] = useState({})
    const [popupBtn,setPopupbtn]=useState(false)
    return (
        <>
        <div className="row justify-content-md-center mx-1 my-5">
            {props.title.map(anime=> (
                <div className="col-md-auto card mx-3 my-3" key={anime.mal_id} style={{ width:"auto",maxWidth: "350px" ,backgroundColor:"white" }}>
                    <div className="card my-2" style={{ width: "300px", border: "0px",alignSelf:"center" }}>
                        <img src={anime.images} className="card-img-top" alt="..." style={{ width: "300px", height:"450px"}} />
                        <div className="card-body">
                            <h5 className="card-title">{anime.title}</h5>
                            <p className="card-text">Score : {anime.score}</p>
                            <button type="button" className="btn btn-primary" onClick={()=>{setAnime(anime);setPopupbtn(true)} }>See Details</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <PopUp trigger={popupBtn} setTrigger={setPopupbtn} data={animeDetails}></PopUp>
        </>
    );
}
