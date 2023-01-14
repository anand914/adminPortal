import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/Services/student.service';
import { Student } from 'src/app/ui-models/student-ui.models';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.css'],
})
export class ViewstudentComponent implements OnInit {
  studentId:string | null |undefined;
  student:Student={
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
     gender:{
      id:'',
      description:''
     },
     address:{
      id:'',
      physicalAddress:'',
      postalAddress:''
    }
  };
  constructor(
    private readonly studentsrvc: StudentService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.studentId = param.get('id');

      if (this.studentId) {
        this.studentsrvc.getstudent(this.studentId).subscribe(
          (successResponse) => {
             this.student = successResponse;
          }
        );
      }
    });
  }
}
