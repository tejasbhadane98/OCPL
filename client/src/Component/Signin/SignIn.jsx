import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const Signin = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    function signInhandler(e){
        e.preventDefault()
        fetch("/signIn",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                return alert(data.error)
            }
                alert(data.message)
                localStorage.setItem("user",JSON.stringify(data.user))

                navigate("/home")
            })
    }

  return (
    <div style={{"border":"1px solid black", "width":"fit-content", "padding":"20px 40px","marginLeft":"auto","marginRight":"auto", marginTop:"150px", backgroundColor:"aqua"}}>
        <h2>Login Page</h2>
        <form style={{"display":"flex",flexDirection:"column","marginLeft":"auto","marginRight":"auto"}}>
        <label>Email:</label> 
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <br></br>
        <label>Password:</label> 
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br></br>
        <button onClick={(e)=>signInhandler(e)}>Submit</button>
        </form>
    <Link to="/signUp">Don't have an account? sign up here</Link>
    </div>
  )
}

export default Signin