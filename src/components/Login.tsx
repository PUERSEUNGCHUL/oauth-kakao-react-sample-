import kakaoLoginImg from '../assets/kakao_login_medium_narrow.png'
import mainImg from '../assets/main.png'
import TextField from '@mui/material/TextField';
import './css/Login.css'
import { useState } from 'react';
import axios from 'axios';

export const Login = () => {

    interface TokenResponse {
        responseData : ResponseData,
        errorInfo : string
    }
    interface ResponseData {
        accessToken: string
    }

    const accessToken = localStorage.getItem("accessToken");

    const [isLogin, setLogin] = useState(accessToken != null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const basicLogin = async () => {
        const response = await axios.post<TokenResponse>(
            'http://localhost:8080/members/login',
            {
                "email" : email,
                "password" : password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
         );

         console.log(response);

         if (response.data.errorInfo != null) {
            alert(response.data.errorInfo);
            return;
         }


         const accessToken:string = response.data.responseData.accessToken;

         localStorage.setItem("accessToken", accessToken);

         setLogin(true);
    }

    const saveEmail = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const savePassword = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const kakaoLogin = () => {
        
        const rest_api_key = '5d0054eea17533b46e366d23a750ddc6';
        const redirect_uri = 'http://localhost:5173/oauth/kakao';

        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

        window.location.href= kakaoURL;

        //const code = new URL(window.location.href).searchParams.get("code");

    }

    const Logout = () => {

        setLogin(false);
    }

  return (
    <>
        {!isLogin ?
        
            
            <div className='login-form'>
                <p>OAuth2.0 테스트</p>
                <img src={mainImg}/>
                <TextField id="standard-basic" label="이메일" variant="standard" type='email' onChange={saveEmail}/><br/>
                <TextField id="standard-basic" label="비밀번호" variant="standard" type='password' onChange={savePassword}/><br/>
                
                <div className="login-button email" onClick={basicLogin}>
                    <p>로그인</p>
                </div>
                <div className='login-button kakao' onClick={kakaoLogin}>

                    <p>카카오톡 로그인</p>
                </div>

            </div>
        
        :
        <>
            <p>로그인되었습니다!</p>
            <div className="login-button email"  onClick={Logout}>
                <p>로그아웃</p>
            </div>
        </>
        }
    </>
  )
}
