import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface TokenResponse {
    responseData : ResponseData
}
interface ResponseData {
    accessToken: string
}

const KakaoLoginRedirect = () => {

    const params = new URL(location.href).searchParams;
    const kakaoToken = params.get("code");
    const navigator = useNavigate();

    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

    console.log(kakaoToken);

    const getAccessToken = async () => {

        if (accessTokenFetching) {
            return;
        }

        try {
         setAccessTokenFetching(true); // 작업중 팻말 걸어두기
         
         const response = await axios.post<TokenResponse>(
            'http://localhost:8080/members/login/social/kakao/redirect',
            {
                
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "OpenAuthorization" : kakaoToken
                }
            }
         );


         const accessToken:string = response.data.responseData.accessToken;

         localStorage.setItem("accessToken", accessToken);

         navigator("/");

         
        } catch(error) {
                
        }
    }

    useEffect(() => {
        getAccessToken();
    }, [kakaoToken])

  return (
    <div>로그인을 실행중입니다...</div>
  )
}

export default KakaoLoginRedirect