import axios from "axios"

export function getUserAuth(){
    return axios.get("https://elicom-server-5013ed31e994.herokuapp.com/auth") 
        .then(function(response){
            if (response.data.error){
                console.log(response.data.error)
                return null
                
            }else{
                console.log("User Authenticated")
                return response.data
            }
        })
        .catch(function(error){
            console.log(error)
        });
}

export function userLogout(){
    return axios.get("https://elicom-server-5013ed31e994.herokuapp.com/auth/logout")
        .then(function(response){
            if (response.data.success){
                console.log(response.data)
                return true
            }else{
                return false
            }
        })
        .catch(function(error){
            console.log(error)
        });
}