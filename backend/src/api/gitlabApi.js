import axios from "axios";


const BASE_URL = "https://gitlab.com/api/v4";

// we will get this username from the /scan req 

//- to use the gitlab api we will need the username from which we will get the Id
//- and from  that Id we will get the repo details

export const getUserRepos = async(username)=>{
    try {
        // const userResponse = await axios.get(`${BASE_URL}/projects`);
            // Find user

    const userResponse = await axios.get(`${BASE_URL}/users/${username}/projects`);


    // Get repos of user
    // const repoResponse = await axios.get( `${BASE_URL}/users/${user.id}/projects`);

    return userResponse.data;

        // const repositories = userResponse.data.slice(0, 5);
        // return userResponse.data; //first 5 repos only

        // if(!user){
        //     throw new Error("User not found");
        // }

    } catch (error) {
        console.log(error);
    }
}