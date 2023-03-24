import React, { useEffect, useState } from 'react'
// import "./home.css"
// import EachTask from '../EachTask/EachTask'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const username = user.email.split("@")[0]
    let [task,setTask]=useState("")
    let [tasks,setTasks]=useState([])
    let [addTask,setaddtask]=useState(false)
    let [isAnyStart,setIsAnyStart]=useState(false)
    let [completedTasks,setCompletedTasks]=useState([])
    let navigate=useNavigate()
    useEffect(()=>{
        fetch("/getAllTask",{
            method:"GET",
            headers:{
                "Content-type": "application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                
                setTasks(data)
               
            }
        })
    },[tasks])
    function add(){
        if(!task){
            alert("please enter some Task")
            return
        }
        setaddtask(!addTask)
        fetch("/addtask", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                Activity:task,
                Status:"Pending"
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    setIsAnyStart(false)
                }
            })
    }
    function logout(){
        localStorage.clear()
        navigate("/signIn")
    }
  return (
    <>
    <div className='home'>
        <div className='top'>
            {username}
        </div>
        <div className='content'>
            <div className='side'>
                <b className='to-do'>Task</b><br/>
                <br/>
                {
                    completedTasks.map((task)=>{
                        return(
                            <p>{task.Activity}&nbsp; &nbsp; {task.TimeTaken}</p>
                        )
                    })
                }
            <button onClick={logout} className='logout'>
                Logout
            </button>
            </div>
            <div className='all'>
                <div className='add'>

               
                    <input type="text" value={task} onChange={(e)=>{setTask(e.target.value)}} placeholder="add here"/>
                <button  onClick={add}>Add New Activity</button>
                
                </div>
                <table>
                    <thead>

                    <th>Activity</th>
                    <th>Status</th>
                    <th>Time Taken</th>
                    <th>Action</th>
                    </thead>
                    {
                        tasks.map((task)=>{
                            return(
                                <>
                                {/* <EachTask task={task} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} isAnyStart={isAnyStart} setIsAnyStart={setIsAnyStart}/>                         */}
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Home