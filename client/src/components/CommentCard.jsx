import React from "react";
import "./css/Header.css";

export default (props)=>{
    return(
        <>
            {/* CFpa3nK.jpg */}
            <div class="comments mt-4 text-justify float-left"> 
                <img src="https://i.imgur.com/CFpa3nK.jpg" alt=""
                    class="rounded-circle" width="40" height="40"/>
                <h4>{props.name}</h4> <span>- 20 October, 2018</span> <br></br>
                <p> <span className="comment_body">#</span> {props.body} </p>
            </div>
        </>
    );
}