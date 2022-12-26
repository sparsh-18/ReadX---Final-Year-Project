import React,{useState,useEffect} from "react";
import axios from "axios";
import "./css/Header.css";


export default (props)=>{

    const [userPosted , setuserPosted] = useState("");
    const [url, setUrl] = useState("");

    useEffect(()=>{
      const fetchUrl = async (url)=>{
          const { data: res} = await axios.get(url);
          setuserPosted(res.name);
      };
      var url = "http://localhost:8080/api/users/"+props.user;
      fetchUrl(url);
        // set url image
      var urlImage = "images/"+props.imageurl;
      setUrl(urlImage);

    },[]);


    return(
        <>
          <div class="col-md-3">
            <div className="postCard">
             <img className="imgpostcard"  src={url} alt="" />
              <div className="card-body">
                <h5 className="card-title"> { props.bookname } </h5>
                <p className="card-text">  <b>Author of the book </b> {props.author}</p>
                <p className="card-text">  User Posted  @ {userPosted}</p>
              </div>
            </div> 
          </div>
        </>
    );
}