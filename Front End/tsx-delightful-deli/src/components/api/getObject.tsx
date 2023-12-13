import api from "../../api";
import { GetObjectsType } from "../../types/GetObjType";
import { GetSetterType } from "../../types/GetObjType";
import domainRouter from "./domainRouter";

const getObject = async (domain: string, objects: GetObjectsType, setter: GetSetterType) => {
  const url = domainRouter(domain);
  const response = await api.get(url);
  console.log("Get request status: ", response.status)

//Handler pings API until the data is up to date
  if (response.data.length !== objects.length) {
      setter(response.data);
      console.log("Retrieving State from domain: ", domain);
    } else if (response.status === 404) {
      console.log("Failed to obtain object: ", domain)
      return
    }
}

export default getObject;
