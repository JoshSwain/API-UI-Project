import api from "../../api";
import { GetObjectsType, GetSetterType } from "../types/GetObjType"
import domainRouter from "./domainRouter";

const getObject = async (domain: string, objects: GetObjectsType, setter: GetSetterType) => {
  const url = domainRouter(domain);
  const response = await api.get(url);
  console.log("Get request status: ", response.status)

  if (response.data.length !== objects.length) {
      setter(response.data);
      console.log("Retrieving State from domain: ", domain);
    }
}

export default getObject;
