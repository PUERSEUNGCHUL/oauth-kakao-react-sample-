import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface TokenResponse {
    responseData : ResponseData
}
interface ResponseData {
    accessToken: string
}

const SocialLoginRedirect = () => {

    const params = new URL(location.href).searchParams;
    const socialToken = params.get("code");
    const navigator = useNavigate();

    const { provider } = useParams();

    

    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

    console.log(socialToken);

    const getAccessToken = async () => {

        if (accessTokenFetching) {
            return;
        }

        try {
         setAccessTokenFetching(true); // 작업중 팻말 걸어두기
         
         const response = await axios.post<TokenResponse>(
            'http://localhost:8080/members/login/social/'+provider+'/redirect',
            {
                
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "OpenAuthorization" : socialToken
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
    }, [socialToken])

  return (
    <div>로그인을 실행중입니다...</div>
  )
}

export default SocialLoginRedirect