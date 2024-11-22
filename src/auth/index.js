import { APP_URL } from "../config";

// for signup 
// export const signup=user=>{
//     return fetch(`${APP_URL}/register`,{
//         method:"POST",
//         headers:{
//             accept:"application/json",
//             'content-type':'application/json'
//         },
//         body:JSON.stringify(user)
//     })
//     .then(res=>{
//         return res.json()
//     })
//     .catch(err=>console.log(err))
// }
// for signin 
export const signin = async (user) => {
    try {
        const response = await fetch(`${APP_URL}/signin`, {
            method: "POST",
            headers: {
                accept: "application/json",
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        return data
    }
    catch (error) {
        return { error: 'error connecting to the server ' }
    }
}

// authenticate and to store token in the local storage
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}
// redirect user by role by getting information from localstorage 
export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
        return false
    }
}

export const isLoggedIn = () => {
  const user = localStorage.getItem('user');
  return user ? { user: JSON.parse(user) } : null;  // Return parsed user object if exists, otherwise null
};