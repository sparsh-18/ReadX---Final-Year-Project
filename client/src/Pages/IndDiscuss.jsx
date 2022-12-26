import axios from "axios";
import React,{ useState, useEffect } from "react";
import { useParams } from "react-router";
import "./css/style.css";
import CommentCard from "../components/CommentCard";


const IndDiscuss = (props)=>{

    // get id from url here
    const demo = useParams().id;
    const [singlePost, setSinglePost]= useState([]);
    const [allcomments, setComments] = useState([]);

    // for form
    const [input, setInput]= useState("");


    useEffect(()=>{
        const fetchUrl = async (url)=>{
           axios.get(url)
           .then(res=>{
            //    get global data
               setSinglePost(res.data);
               setComments(res.data.comments);

            //    fetch which user 
           })
           .catch(err=>{
               console.log("Load Failed: "+err);
           })
        };
        const url = "http://localhost:8080/api/discusspost/"+demo;
        fetchUrl(url);
    },[]);

    const addComment = async (event)=>{
        event.preventDefault();
        setComments([...allcomments,{user_posted:props.userName,body:input}]);
        try {
            const commented = await axios.post('http://localhost:8080/api/discusspost/commented',
                {
                    id:demo,
                    user_name:props.userName,
                    comment_body:input,
                },
                {
                    headers: { 'Content-Type':'application/json'},
                }
            )  
        } catch (error) {
            console.log("Comment Failed ! "+error);
        }

        setInput(" ");
    }
    const onInputChange = async (event)=>{
        setInput(event.target.value);
    }


    return(
        <>
            <div class="discuss-content">
                <div className="container Individual-content">
                    <section>
                        <div className="row">
                            <div class="col-sm-5 col-md-7 col-12 pb-4">
                            <h3 className="comment_markup">Comments of ./  <span className="title_name_markup">{singlePost.title}</span></h3>
                            <div className="row">
                            {
                                allcomments.map(comment=> 
                                    <CommentCard
                                        body={comment.body}
                                        name={comment.user_posted}
                                />)
                            }
                            </div>
                            {/* {
                                allcomments.map(comment=> 
                                    <CommentCard
                                        body={comment.body}
                                        name={comment.user_posted}
                                />)
                            } */}
                            </div>
                            <div class="stck col-md-5 ">
                                <h1 className="title_name_markup">Leave Comment Here .. {props.userName} </h1> <br></br>
                                <form onSubmit={addComment} className="row">
                                    <div className="col-8">
                                    <div className="form-floating">
                                    <textarea class="form-control"  
                                        placeholder="Leave a comment here" 
                                        id="floatingTextarea"
                                        value={input}
                                        required
                                        onChange={onInputChange}
                                    >
                                    </textarea>
                                    <label for="floatingTextarea">Comments</label>
                                    </div>
                                    </div>
                                    <div className="col-4">
                                    <button type="submit" className="btn btn-outline-info">Post</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
           </div>
        </>
    );
}

export default IndDiscuss;