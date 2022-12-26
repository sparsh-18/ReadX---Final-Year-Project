import React,{ useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/Postcard";
import "./css/style.css";

const Home = (props)=>{

    const [ allexchangePost , setallexchangePost ]=useState([]);

<<<<<<< HEAD
    const [ exchangePost , setExchangePost ]=useState([]);
=======
    // const [ exchangePost , setExchangePost ]=useState([]);
>>>>>>> 5f922603492b4ee9eef3bea89f5d406f5466d33a
    const [nameforum,setnameforum] = useState("");
    const [authorforum, setauthorforum] = useState("");
    const [latforum, setlat] = useState("");
    const [lonforum, setlon] = useState("");
<<<<<<< HEAD
=======
    const [inputRange, setInputRange] = useState(1);
>>>>>>> 5f922603492b4ee9eef3bea89f5d406f5466d33a

    useEffect(()=>{
        const fetchUrl = async ()=>{
            const { data: res} = await axios.get('http://localhost:8080/api/exchangeposts/all');
            setallexchangePost(res);
            console.log(props);
        };
        fetchUrl();
    },[]);

<<<<<<< HEAD
=======
    const inputRangeHander = async (event)=>{
        setInputRange(event.target.value);
        try {
            const { data: res} = await axios.get('http://localhost:8080/api/exchangeposts/25.471190/81.826409/'+ (inputRange*1000));
            setallexchangePost(res);
            console.log("range filtered : " +res);
        } catch (error) {
            console.log("Load Failed ! "+error);
        }
    }

>>>>>>> 5f922603492b4ee9eef3bea89f5d406f5466d33a
//=====================================================================================================================
    async function getpos() {
          //  console.log("here");
          navigator.geolocation.getCurrentPosition(async (position) => {
           // console.log(position);
            setlat(position.coords.latitude);
            setlon(position.coords.longitude);
        });
        
      }
      
    const namechange = async (event)=>{
        setnameforum(event.target.value);
    }   
    const authorchange = async (event)=>{
        setauthorforum(event.target.value);
    }
<<<<<<< HEAD
  
=======
    // console.log("pro : "+props);
>>>>>>> 5f922603492b4ee9eef3bea89f5d406f5466d33a
    const addexchangeforum = async (event)=>{
        event.preventDefault();
        if(props.UserId != ""){

            try {
                
                  const exchangePosted = await axios.post('http://localhost:8080/api/addnew/exchangepost',
                      {
                          "book_name":nameforum,
                          "author":authorforum,
                          "user_posted": props.UserId,
                          "latitude": latforum,
                          "longitude": lonforum,
<<<<<<< HEAD
                          "image_name": ""
=======
                          "image_name": "states2.jpeg"
>>>>>>> 5f922603492b4ee9eef3bea89f5d406f5466d33a
                      },
                      {
                          headers: { 'Content-Type':'application/json'},
                      }
                  )  

                  setallexchangePost([...allexchangePost,exchangePosted.data]);
                 

            } catch (error) {
                console.log(error);
            }
            setnameforum("");
            setauthorforum("");
            setlat("");
            setlon("");
    
<<<<<<< HEAD
=======
        }else{
            alert("Please Login First ..") 
>>>>>>> 5f922603492b4ee9eef3bea89f5d406f5466d33a
        }
    }
//=========================================================================================================

    return(
        <>

        <button type="button" className="btnadddiscuss btn btn-outline-success" data-toggle="modal" data-target="#exampleModalCenter">ADD POST</button>
    
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">ADD New Exchange Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <form onSubmit={addexchangeforum}>
                <div class="form-group">
                    <input type="text" onChange={namechange} name="name" value={nameforum} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Book Name"/>
                </div> <br></br>
                <div class="form-group">
                    <input type="text" onChange={authorchange} name="body" value={authorforum} class="form-control" id="exampleInputPassword1" placeholder="Author Name"/>
                </div>
                <br />
                <div class="form-group"> <button type="button" class="btn btn-sm btn-primary" onClick={getpos}>Add location</button> </div>
                <div class="form-group">
                    <input type="text" name="lat" value={latforum} class="form-control" id="exampleInputPassword1" placeholder="latitude"/>
                    <input type="text" name="lon" value={lonforum} class="form-control" id="exampleInputPassword1" placeholder="longitude"/>
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




            <div className="Home container">
                <div className="row">
                <div class="container-xxl menu-nav">
                    <label for="customRange1" class="form-label">Location range (km): <span id="range_val">{inputRange}</span></label>
                    <input type="range" class="form-range" min="1" max="50" step="1" id="customRange1" value={inputRange} onChange={inputRangeHander}/>
                </div>
                </div>
                <div className="container cardposted">
                    <div className="row postCardsection">

                    {
                        allexchangePost.map(post=>
                            <PostCard
                                bookname={post.book_name}
                                author={post.author}
                                user={post.user_posted}
                                imageurl={post.post_img}
                            />
                        )
                    }

                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;