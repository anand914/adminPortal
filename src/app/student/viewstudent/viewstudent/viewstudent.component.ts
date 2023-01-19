import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderService } from 'src/app/GenderSrvc/gender.service';
import { StudentService } from 'src/app/Services/student.service';
import { Gender } from 'src/app/ui-models/gender-ui.models';
import { Student } from 'src/app/ui-models/student-ui.models';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.css'],
})
export class ViewstudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };
  isNewStudent = false;
  header='';
  displayProfileImageUrl='';
  genderList: Gender[] = [];

  constructor(
    private readonly studentsrvc: StudentService,
    private readonly route: ActivatedRoute,
    private _genderSrvc: GenderService,
    private snackbar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.studentId = param.get('id');
      if (this.studentId) {
        if(this.studentId.toLowerCase()==='Add'.toLowerCase()){
        this.isNewStudent =true;
        this.header='Add New Student';
        this.setImage();
        }
        else{
           this.isNewStudent = false;
           this.header='Edit Student';
           this.studentsrvc
           .getstudent(this.studentId)
           .subscribe((successResponse) => {
             this.student = successResponse;
             this.setImage();
           },(errorResponse)=>{
            this.setImage();
           });
        }
        this._genderSrvc.getGenders().subscribe((successRepsonse) => {
          this.genderList = successRepsonse;
          //console.log( this.genderList);
        });
      }
    });
  }
  onUpdate(): void {
    this.studentsrvc.updateStudent(this.student.id, this.student).subscribe(
      (successResponse) => {
        // !!! show notification
        this.snackbar.open('student Updated successfully', undefined, {
          duration: 3000,
        });
           this.router.navigateByUrl('/student');
      },
      (errorResponse) => {
        // Log it
      }
    );
  }
  onDelete(){
    this.studentsrvc.deleteStudent(this.student.id).subscribe(
      (successResponse)=>{
        this.snackbar.open('Data Deleted successfully', undefined, {
        duration: 3000,
      });
      setTimeout(()=>{
        this.router.navigateByUrl('/student');
      }, 2000);
      },
      (errorResponse)=>{
        // Log it
      }
    );
  }

  onAdd():void{
    this.studentsrvc.addStudent(this.student).subscribe(
      (successResponse)=>{
        this.snackbar.open('Data Added Successfully',  undefined,{duration:3000});
        this.router.navigateByUrl('/student');
        // setTimeout(() => {
        //   //this.router.navigateByUrl(`/student/${successResponse.id}`);

        // }, 3000);
      },
      (errorResponse)=>{
        //!! Log it here
        console.log(errorResponse);
      }
    );
  }
  uploadImage(event: any) : void {
    debugger;
    if(this.studentId){
     const file : File = event.target.files[0];
     this.studentsrvc.uploadImage(this.student.id,file).subscribe(
      (successResponse)=>{
        console.log(successResponse)
       this.student.profileImageUrl = successResponse;
       this.setImage();
       this.snackbar.open('Profile Image Updated',undefined,{
        duration: 2000
       });
      },
      (errorResposne)=>{
      }
     );

  }
  }


  private setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentsrvc.getImagePath(this.student.profileImageUrl);
    } else {
      // Display a default
      this.displayProfileImageUrl = '/assets/user1.png';
    }
  }
}
