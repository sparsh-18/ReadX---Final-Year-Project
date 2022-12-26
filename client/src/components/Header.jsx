import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import "./css/Header.css";
import Home from "../Pages/Home";
import Discuss from "../Pages/Discuss";
import IndDiscuss from "../Pages/IndDiscuss";
import Login from "../Pages/Login";
import Register from "../Pages/Register";


export default ()=>{

    const [loginStatus, setloginStatus] = useState("Login..");
    const [token, setToken] = useState(localStorage.token);
    const [loginActions, setloginActions] = useState("");
    const [urlLogout, setUrlLgt] = useState("/login");
    const [logNameUser,setLogName] = useState("");
    const [loguserId, setloguserId] = useState("");


    const logout = async ()=>{
        setloginStatus("Logout..");
        localStorage.clear();
    }
    useEffect(()=>{
        if(token===undefined){
            // means logout
            setloginStatus("Login..");
            setloginActions("");
        }else{
            setloginActions(logout);
            setUrlLgt("/");
            setloginStatus("Logout..");
        }
    },[loginStatus,token]);


    return(
        <> 
        <Router>
            <div class="">
            <nav className="allfixed navbar navbar-expand-lg navbar-light" >
                <div className="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="/">Read X</a>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                        {/* <a class="nav-link" href="#">Link</a> */}
                        <Link class="nav-link active" aria-current="page" to="/discuss">Discuss Forum</Link>
                        </li>
                    </ul>
                    <form class="d-flex search-bar">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    {
                        <Link class="nav-link" onClick={loginActions} to={urlLogout}>{loginStatus}</Link> 
                    }
                    {/* <a class="nav-link" href="#">Register ..</a> */}
                    {/* <a href="#" onClick={logout}>Logout..</a> */}
                    </div>
                </div>
            </nav>
            <div class="books-content">
                <div class="back-img-book"></div>
            </div>
            <div class="head-vis">
                <h1>Read X</h1>
            </div>
            <Routes>
                <Route path="/" element={<Home UserId={loguserId}/>} />
                <Route path="/discuss" element={<Discuss UserId={loguserId} />} /> 
                <Route path="/discuss/:id" element={<IndDiscuss userName={logNameUser} />}></Route>
                <Route path="/login" element={<Login  callback = {setToken} callbackForName={setLogName} callbacklogID={setloguserId} />}/>
                <Route path="/register" element={<Register/>} />
                <Route path="*" element={<Home UserId={loguserId}/>} />
            </Routes>
            </div>
        </Router>
        </>
    );
}