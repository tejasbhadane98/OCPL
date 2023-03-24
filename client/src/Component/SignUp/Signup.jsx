import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import "../SignUp/Signup.css"

const SignUp = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setconfirmPassword]=useState("")
    const [terms,setTerms]=useState(false)
    const navigate=useNavigate()
    function signUphandler(e){
        e.preventDefault()
        if(email==="" || password==="" || confirmPassword===""){
            return alert("please fill all details")
        }
        if(terms===false){
            return alert("please accept terms and condition")
        }
        fetch("/signUp",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email,password,confirmPassword
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                return alert(data.error)
            }
            alert(data.message)
            navigate("/")
        })
    }

  return (
    <div style={{"border":"1px solid black", "width":"fit-content", "padding":"20px 40px","marginLeft":"auto","marginRight":"auto", marginTop:"150px" , backgroundColor:"aqua"}}>
        <h2 className='a'>Sign Up Page</h2>
        <form style={{"display":"flex",flexDirection:"column","marginLeft":"auto","marginRight":"auto"}}>
        <label>Email:</label> 
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label>Password:</label> 
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <label>Confirm Password:</label> 
        <input type="password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>
        <div>
            
        <input type="checkbox" id='terms' value={terms} onChange={()=>setTerms(!terms)}/>
        <label for="terms">I agree with terms and conditions</label> 
        </div>
        <button onClick={(e)=>signUphandler(e)}>Submit</button>
        </form>
        <Link to="/">Already have an account? sign in here</Link>

    </div>
  )
}

export default SignUp