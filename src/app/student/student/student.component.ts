import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/Services/student.service';
import { Student } from 'src/app/ui-models/student-ui.models';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent  implements OnInit{
  student:Student[]=[];
  displayedColumns: string[] = ['firstName','lastName','dateOfBirth','email','mobile','gender','edit'];
  dataSource:MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString='';

  constructor(private services:StudentService){}

  ngOnInit(): void {
    //Fetch students//
    this.services.getStudents().subscribe(
      (response) => {
       this.student = response;
       this.dataSource = new MatTableDataSource<Student>(this.student);
        if(this.matPaginator){
         this.dataSource.paginator = this.matPaginator;
       }
       if(this.matSort){
        this.dataSource.sort = this.matSort;
       }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filterStudent(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
