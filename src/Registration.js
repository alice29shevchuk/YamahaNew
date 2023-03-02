import axios, { Axios } from 'axios';
import './Registration.css';
function Registration(){
    return(

        
        <div className='mainDivReg'>
            <h1>Регистрация</h1>
            <input id='loginReg' type="text" placeholder="Login" />
            <input id='passReg'  type="password" placeholder="Password" />
            <input id='passRepeatReg'  type="email" placeholder="Email" />
            {/* <input id='emailReg' type="text" placeholder="Login" /> */}
            <button id='btnSubmitReg' onClick={() => {
                axios({
                    method: 'post',
                    url: 'https://shop20230228183528.azurewebsites.net/api/Authentication/regUser',
                    data: {
                        "userName": document.getElementById('loginReg').value,
                        "password": document.getElementById('passReg').value,
                        "email":document.getElementById('passRepeatReg').value
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
        </div>
    );
}
export default Registration;