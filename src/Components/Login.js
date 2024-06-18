import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login = () =>{

    const [email,setEmail]= React.useState('');
    const [password,setPassword]= React.useState('');
    const navigate= useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth)
            {
                navigate("/")
            }
    })
    const handLogin= async ()=> {
        console.warn(email,password)
        let result = await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result))
            navigate("/")
        }else{
            alert("Please Enter Connect Details!");
        }
    }

    return(
        <div className="login">
            <h1>Login Page</h1>
            <input type="text" className="inputBox" placeholder="enter email"
            onChange={(e)=>setEmail(e.target.value)} value={email} />

            <input type="password" className="inputBox" placeholder="enter password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button onClick={handLogin} className="appButton" type="button">Login</button>

        </div>
    )
}

export default Login;