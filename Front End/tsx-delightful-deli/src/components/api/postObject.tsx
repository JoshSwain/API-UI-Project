import api from "../../api";
import { PostBodyType } from '../types/PostObjType'
import domainRouter from "./domainRouter";

const postObject = async (domain: string, body: PostBodyType, handler: () => void, secondary_handler?: () => void ) => {

  const url = domainRouter(domain);

  const postResponse = await api.post(url, body);

  console.log("Post Response: ", postResponse.status);

  if (postResponse.status === 201) {
    handler()
    if (secondary_handler) {
        secondary_handler()
    }
  }
}

export default postObject;
