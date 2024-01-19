import api from "../../api";
import { PostBodyType } from '../../types/PostObjType'
import domainRouter from "./domainRouter";

//Saves an object of a specified domain to the database 
const saveObject = async (domain: string, body: PostBodyType, handler: () => void, secondary_handler?: () => void ) => {

  const url = domainRouter(domain);

  const postResponse = await api.post(url, body);

  console.log("Post Response: ", postResponse.status);

//Secondary Handler refreshes the items list after a transaction is posted
  if (postResponse.status === 201) {
    handler()
    if (secondary_handler) {
        secondary_handler()
    }
  } else if (postResponse.status === 404) {
    console.log("Failed to post object: ", domain)
    return
  }
}

export default saveObject;
