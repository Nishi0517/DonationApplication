import axios from "axios";


const baseUrl ="https://localhost:7048/api/";

export default{
    dCandidate(url = baseUrl + 'DCandidate/'){
        // Disable SSL certificate verification for development
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        return {
            fetchAll :()=>axios.get(url),
            fetchById: id => axios.get(url+id),
            create : newRecord => axios.post(url,newRecord),
            update:(id,updateRecord)=>axios.put(url + id ,updateRecord),
            delete:id => axios.delete(url+id)
        }
    }
}