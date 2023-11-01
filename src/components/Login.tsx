import kakaoLoginImg from '../assets/kakao_login_medium_narrow.png'
import mainImg from '../assets/main.png'
import TextField from '@mui/material/TextField';
import './css/Login.css'

export const Login = () => {

    const kakaoLogin = () => {
        
        const rest_api_key = '5d0054eea17533b46e366d23a750ddc6';
        const redirect_uri = 'http://localhost:5173/oauth';

        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

        window.location.href= kakaoURL;

        const code = new URL(window.location.href).searchParams.get("code");

        alert(code);
    }

  return (
    <>
        <div className='login-form'>
            <p>OAuth2.0 테스트</p>
            <img src={mainImg}/>
            <TextField id="standard-basic" label="이메일" variant="standard" type='email' /><br/>
            <TextField id="standard-basic" label="비밀번호" variant="standard" type='password' /><br/>
            
            <div className="login-button email">
                <p>로그인</p>
            </div>
            <div className='login-button kakao' onClick={kakaoLogin}>

                <p>카카오톡 로그인</p>
            </div>

        </div>
    </>
  )
}
