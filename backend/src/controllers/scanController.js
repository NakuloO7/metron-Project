import {getUserRepos} from '../api/gitlabApi.js';
import { scanRepositories } from '../services/scannerService.js';

export const scanRepository = async(req, res)=>{
    const {username} = req.body;
    
            if(!username){
                return res.status(400).json({
                    message : "USer not foound"
                })
            }
    try {
        const allRepos = await getUserRepos(username);
        // console.log(allRepos)

        const scanResults = await scanRepositories(allRepos);

        return res.status(200).json({
            success : true,
            totalRepo : allRepos.length,
            scanResults
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}