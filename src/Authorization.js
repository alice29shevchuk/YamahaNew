import axios, { Axios } from 'axios';
import './Authorization.css';
import {Link} from 'react-router-dom';
function Authorization(){
    return(
        <div className='mainDivAuthorization'>
            <h1>Авторизация</h1>
            <input id='login' type="text" placeholder="Login" />
            <input id='pass'  type="password" placeholder="Password" />
           
            <button id='btnSubmitAuthorization' onClick={() => {
                axios({
                    method: 'post',
                    url: 'https://localhost:7031/api/Authentication/Login',
                    data: {
                        "userName": document.getElementById('login').value,
                        "password": document.getElementById('pass').value
                    },
                    dataType: "dataType",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }).then(data => {
                    sessionStorage.setItem('token', data['data']['token']);
                    window.location.href='/';
                });
            }}>Submit</button>
             <Link to="/registration" className='linkRegistration'>Sign Up</Link>
        </div>
    );
}
export default Authorization;