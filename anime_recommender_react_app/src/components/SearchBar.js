import React from 'react';
import { useEffect, useState } from "react";
import './Serach_bar.css';
import Card from "./Card";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar(props) {
    const [AnimeList, SetAnimeList] = useState([]);
    const GetAnimeList = async (query) => {
      console.log(query);
      const temp = await fetch(`http://127.0.0.1:5000/${query}`).then(res => res.json());
      Object.values(temp).map(item => {
        SetAnimeList(item);
      });
    };
    const handleSearch=() => {
      GetAnimeList(wordEnter);
      setWordEnter("");
      setFilteredData([]);
    };

    const [filteredData,setFilteredData]=useState([]);
    const [wordEnter,setWordEnter]=useState("");
    const handleFilter = event =>{
        const enteredWord = event.target.value;
        setWordEnter(enteredWord)
        if (enteredWord === "") {
            setFilteredData([]);
            return;
        }
        const temp= props.inputName.filter(value =>{
            return value.toLowerCase().includes(enteredWord.toLowerCase());
        });
        setFilteredData(temp);
    };
    return (
        <>
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder='Type for seacrh' value={wordEnter} onChange={handleFilter} />
                <div className="icon" onClick={handleSearch}><SearchIcon/></div>
            </div>
            {filteredData.length!==0 && (
                <div className="result">
                <div className="suggest-box">
                {filteredData.slice(0,15).map(title =>{
                    return <div className="suggest-box-item" onClick={()=>setWordEnter(title)} key = {props.inputName.indexOf(title)}>{title}</div>
                })}
                </div>
            </div>
            )}
        </div>
        {AnimeList.length!==0 &&(<Card title= {AnimeList}/>)}
        </>
    );
}
