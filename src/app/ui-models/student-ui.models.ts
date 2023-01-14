import { Gender } from "../Models/api-model/gender.model";
import { Address } from "./address-ui.model";

export interface Student{
  id:string,
  firstName:string,
  lastName:string,
  dateOfBirth:string,
  email:string,
  mobile:number,
  profileImageUrl:string,
  genderId:string,
  gender:Gender,
  address:Address
}
