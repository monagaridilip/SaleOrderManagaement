import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username,setUserName] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('authenticated', 'true');
            console.log("Loggged In")
            navigate('/')
          } else {
            alert('Invalid credentials');
          }
    }
    
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <form className="p-4 border rounded">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">UserName</label>
                    <input type="text" className="form-control" value={username} onChange={(e)=>setUserName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='username'/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1" placeholder='password'/>
                </div>
                <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </div>
</div>
  )
}
