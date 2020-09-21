import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignIn } from 'react-auth-kit';
import axios from 'axios';

//  Recoge los datos del usuario. Si la sesión caduca realiza una nueva llamada y
//  actualiza el token.
export function getUser(setUser) {
  const authUser = useAuthUser();
  const signIn = useSignIn();

  useEffect(() => {
    axios
      .get('http://163.172.183.16:32545/employee/' + authUser().id, {
        headers: {
          token: authUser().token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.result);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          axios
            .post('http://163.172.183.16:32545/token', {
              RefreshToken: authUser().refreshToken,
            })
            .then((res) => {
              console.log(authUser());
              console.log(res.data);
              if (
                signIn({
                  token: res.data.result.AccessToken, //Just a random token
                  tokenType: 'Bearer', // Token type set as Bearer
                  authState: {
                    mail: authUser().mail,
                    id: authUser().id,
                    token: res.data.result.AccessToken,
                    refreshToken: authUser().refreshToken,
                  }, // Dummy auth user state
                  expiresIn: 10, // Token Expriration time, in minutes
                })
              ) {
                // If Login Successfull, then Redirect the user to secure route
                location.reload();
              } else {
                // Else, there must be some error. So, throw an error
                alert('Error Occoured. Try Again');
              }
            });
        }
      });
  }, []);
}

/*
import axios from "axios";
import Cookie from "js-cookie"

export default (history=null)=>{

  const baseUrl = "http://163.172.183.16:32545";

  let headers = {
    token:""
  }

  if(Cookie.get("AccessToken")){
    headers.token = Cookie.get("AccessToken")
  }

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers,
  });

  axiosInstance.interceptors.response.use(
    response => {
      console.log(response)
      return response
    },
    error => {
      console.log("test")
      // Reject promise if usual error
      // if (error.status !== 401) {
      //   return Promise.reject(error);
      // }



      return axios.post(baseUrl+'/token', {
        'RefreshToken': Cookie.get('RefreshToken')
      }).then(response => {
        console.log(response.data)
        Cookie.set("AccessToken", response.data.result.AccessToken)
        error.response.config.headers['token'] =Cookie.get("AccessToken") ;
        return axios(error.response.config);
      }).catch(error => {
        console.log(error)
        return Promise.reject(error);
      })

    }
  );
  return axiosInstance;
}
*/
