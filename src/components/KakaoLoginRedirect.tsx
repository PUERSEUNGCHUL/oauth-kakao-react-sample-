import React, { useEffect, useState } from 'react'
import axios from 'axios';

const KakaoLoginRedirect = () => {

    const params = new URL(location.href).searchParams;
    const kakaoToken = params.get("code");

    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

    console.log(kakaoToken);

    const getAccessToken = async () => {

        if (accessTokenFetching) {
            return;
        }

        try {
         setAccessTokenFetching(true); // 작업중 팻말 걸어두기
         
         const response = await axios.post(
            'http://localhost:8080/members/login/oauth',
            {
                
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "OpenAuthorization" : kakaoToken
                }
            }
         );

         console.log(response);
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