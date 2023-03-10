import http from "../http-common";

class UserDataService{
    login(data){
        return http.post("/login",data);
    }

    signup(data){
        return http.post("/signup",data);
    }

    getUser(userId){
        return http.get("/user/"+userId);
    }

    updateUser(user){
        return http.put("/user/"+user.id,{user:user})
    }

}

export default new UserDataService()
