import React, { useState, useEffect } from "react";
import "./css/style.css";
import Card from "../components/Card";

import axios from "axios";

const Discuss = (props)=>{

    const [ discussPost , setDiscussPost ]=useState([]);
    const [titleforum,settitleforum] = useState("");
    const [bodyforum, setbodyforum] = useState("");
    const [commentforum, setcommentforum] = useState("");


    useEffect(()=>{
        const fetchUrl = async ()=>{
            const { data: res} = await axios.get('http://localhost:8080/api/discusspost/all');
            setDiscussPost(res);
        };
        fetchUrl();
    },[]);
    const titlechange = async (event)=>{
        settitleforum(event.target.value);
    }   
    const bodychange = async (event)=>{
        setbodyforum(event.target.value);
    }
    const commentchange = async (event)=>{
        setcommentforum(event.target.value);
    }
    const adddiscussforum = async (event)=>{
        event.preventDefault();
        if(props.UserId != ""){

            try {
                // console.log(props);
                const discussPosted = await axios.post('http://localhost:8080/api/addnew/discusspost',
                    {
                        "title":titleforum,
                        "body":bodyforum,
                        // "likes":null,
                        "user_posted": props.UserId,
                        "user_posted_comment":props.UserId,
                        "commentBody":commentforum
                    },
                    {
                        headers: { 'Content-Type':'application/json'},
                    }
                )  
                console.log("discuss new :/ ",discussPosted.data);
                setDiscussPost([...discussPost,discussPosted.data]);
            } catch (error) {
                console.log("Comment Failed ! "+error);
            }
            settitleforum("");
            setbodyforum("");
            setcommentforum("created");
    
        }else{
            setcommentforum("not created"); 
        }
    }


    return(
        <>
           <div class="discuss-content">
                <button type="button" className="btnadddiscuss btn btn-outline-success" data-toggle="modal" data-target="#exampleModalCenter">ADD POST</button>
    
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">ADD New Discussion Post</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={adddiscussforum}>
                        <div class="form-group">
                            <input type="text" onChange={titlechange} name="title" value={titleforum} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title"/>
                        </div> <br></br>
                        <div class="form-group">
                            <input type="text" onChange={bodychange} name="body" value={bodyforum} class="form-control" id="exampleInputPassword1" placeholder="Body"/>
                        </div>
                        <br />
                        <div class="form-group">
                            <input type="text" onChange={commentchange} name="comment" value={commentforum} class="form-control" id="exampleInputPassword1" placeholder="Add Some comments"/>
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary">ADD</button>
                    </form>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                    </div>
                </div>
                </div>

                <div className="container">
                    <div className="row publishedDCard row-cols-1 row-cols-md-3 g-4">
                        
                        {
                            discussPost.map(post=> 
                                <Card
                                    Likes={post.likes.length} 
                                    title={post.title} 
                                    name={post.user_posted}
                                    numOfcom={post.comments.length} 
                                    time={post.createdAt}
                                    _id={post._id} 
                                    userId={props.UserId}
                                    modalId={"post"+post._id} 
                                    bodyCard={post.body}  
                                    postedAt="Post Time"
                                />
                            )
                        }

            
                    </div>      
                </div>
           </div>
        </>
    );
}


export default Discuss;