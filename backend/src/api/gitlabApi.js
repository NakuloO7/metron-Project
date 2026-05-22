import axios from "axios";


const BASE_URL = "https://gitlab.com/api/v4";

// we will get this username from the /scan req 

//- to use the gitlab api we will need the username from which we will get the Id
//- and from  that Id we will get the repo details

export const getUserRepos = async(username)=>{
    try {
        const userResponse = await axios.get(`${BASE_URL}/users?username=${username}`);
        const user = userResponse.data[0];

        if(!user){
            throw new Error("User not found");
        }

        const repo = await axios.get(`${BASE_URL}/users/${user.id}/projects`);

        return repo.data;
        
    } catch (error) {
        console.log(error);
    }
}