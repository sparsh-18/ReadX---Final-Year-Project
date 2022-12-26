import axios from "axios";
import React,{useState,useEffect} from "react";
import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import "./css/Header.css";

export default (props)=>{

    const [likes, setLikes] = useState(props.Likes);

    return(
        <>
            <p>if not have account .. <Link to="/register">Register..</Link></p>
        </>
    );
}