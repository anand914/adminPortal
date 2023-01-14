import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/api-model/student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
private BaseUrl='https://localhost:44395/api/Student';
  constructor(private httpclient:HttpClient) { }

  getStudents():Observable<Student[]>
  {
    return this.httpclient.get<Student[]>(this.BaseUrl + '/GetStudents')
  }
  getstudent(id:string):Observable<Student>{
    return this.httpclient.get<Student>(this.BaseUrl + '/GetStudentdByID/' + id)
  }
}
