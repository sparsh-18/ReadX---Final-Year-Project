import React, {useState, useEffect}  from "react";
import {BrowserRouter as  Link} from "react-router-dom";
import "./css/login.css";
import axios from "axios";


const Register = (props)=>{

    const [inputEmail,setInputEmail]=useState("");
    const [inputpass,setInputPass]=useState("");
    const [validEmail, setValidEmail] = useState("");
    const [registerSuccess,setSuccessStatus] = useState("");
    const [inputname,setInputName] = useState("");

// for validation

    const validateEmail = (email)=>{
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

// ***********

    const onchangeName = async (event)=>{
        setInputName(event.target.value);
    }
    const onchangeEmail = async (event)=>{
        setInputEmail(event.target.value);
        if(validateEmail(event.target.value)){
            setValidEmail("Valid Email..");
        }else{
            setValidEmail("Invalid Email..");
        }
    }
    const onchangePass = async (event)=>{
        setInputPass(event.target.value);
    }

 

    const registerSubmit = async (event)=>{
        event.preventDefault();
        // const url = "http://localhost:8080/api/users/register";
        // headers: { "Content-Type": "multipart/form-data" },

        try {
            const token_data = await axios.post('http://localhost:8080/api/users/register',
                {
                    name:inputname,
                    email:inputEmail,
                    password:inputpass
                },
                {
                    headers: { 'Content-Type':'application/json'},
                }
            )  
            if(token_data.data.length !=0){
                setSuccessStatus("registered");
            }
            else{
                setSuccessStatus("");
            }
        } catch (error) {
            console.log("Load Failed ! "+error);
        }
        setInputEmail("");
        setInputPass("");
    }

    const googlesignin = ()=>{
        
    }


    return(
        <>
            <div className="backview">
                {
                    (registerSuccess.length != 0)?  <h5 className="log_successMsg reg_successMsg">{inputname} <span className="log_successMsg1">You are Succesfully Registered.</span></h5>  :null
                }
                <div className="login-form register-form">
                    <h4>Register Here ..</h4><br></br>
                    <form onSubmit={registerSubmit}>
                        <div class="mb-3">
                            <label for="exampleInputName" class="form-label">Name</label>
                            <input type="text" class="form-control" value={inputname} onChange={onchangeName} id="exampleInputName"/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" onChange={onchangeEmail} value={inputEmail} required id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <p className="valid_email">{validEmail}</p>
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" value={inputpass} onChange={onchangePass} id="exampleInputPassword1"/>
                        </div>
                        <button type="submit" class="btn btn-outline-success">Register</button>
                    </form>
                    {/* <span>or</span> */}
                    <span className="or">or</span>
                    <svg onClick={googlesignin} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="googlesign bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg>
                    {/* <p>if not have account .. <Link class="nav-link" to="/login">Login..</Link></p> */}
                    {/* <button class="btn btn-outline-success" onClick={logout} >Log out</button> */}
                </div>
            </div>
        </>
    );
}

export default Register;