import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/Envoirnments/enviornment.prod';
import { AddstudentRequest } from '../Models/api-model/AddRequestModel';
import { Student } from '../Models/api-model/student.model';
import { UpdateRequest } from '../Models/api-model/UpdateRequestModel';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
private BaseUrl= environment.BaseUrl;
  constructor(private httpclient:HttpClient) { }

  getStudents():Observable<Student[]>
  {
    return this.httpclient.get<Student[]>(this.BaseUrl + '/Student')
  }
  getstudent(studentId:string):Observable<Student>{
    return this.httpclient.get<Student>(this.BaseUrl + '/Student/' + studentId)
  }
  updateStudent(studentId:string,studentRequest:Student):Observable<Student>{
    const data: UpdateRequest={
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth : studentRequest.dateOfBirth,
      mobile:studentRequest.mobile,
      email:studentRequest.email,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    };
    return this.httpclient.put<Student>(this.BaseUrl + '/Student/' + studentId,data);
  }

  deleteStudent(studentId:string):Observable<Student>{
    return this.httpclient.delete<Student>(this.BaseUrl + '/Student/' + studentId)
  }

  addStudent(studentRequest:Student):Observable<Student>{
    const addstudentRequest:AddstudentRequest ={
      firstName: studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      mobile:studentRequest.mobile,
      email:studentRequest.email,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    };
    return this.httpclient.post<Student>(this.BaseUrl + '/Student/add' , addstudentRequest)
  }

  uploadImage(studentId:string,file:File):Observable<any>{
    debugger
   const formData = new FormData();
    formData.append('profileImage',file);
    return this.httpclient.post(this.BaseUrl + '/Student/' + studentId + '/UploadImage', formData,
      {
        responseType:'text'
      }
      );
  }

  getImagePath(relativePath: string) {
    return `${this.BaseUrl}/${relativePath}`;
  }
}
