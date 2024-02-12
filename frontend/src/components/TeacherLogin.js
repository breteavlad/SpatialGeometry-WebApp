import React, { useState } from 'react'


function TeacherLogin(){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

function handleSubmit(event){
    event.preventDefault();
}

    return(
        <div >
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                <label htmlFor="username">Username</label>
                <input type="username placeholder='Enter username"
                 onChange={e => setUsername(e.target.value)}/>   
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter Password'
                onChange={e => setPassword(e.target.value)}/>
                    </div>
            <button>Login</button>
                </form>
            </div>
        </div>
    )
}
export default TeacherLogin