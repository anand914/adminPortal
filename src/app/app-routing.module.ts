import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student/student.component';
import { ViewstudentComponent } from './student/viewstudent/viewstudent/viewstudent.component';

const routes: Routes = [
 {path:'', component:StudentComponent},
 { path:'student' , component:StudentComponent},
 {
  path:'student/:id' , component:ViewstudentComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
