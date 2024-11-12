import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectEmployeeComponent } from './components/project-employee/project-employee.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { DeparmentTableComponent } from './components/deparment-table/deparment-table.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path:'',
    component: LayoutComponent,
    children : [
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'employee',
        component:EmployeeComponent
      },
      {
        path:'project',
        component:ProjectComponent
      },
      {
        path:'new-project/:id',
        component:ProjectFormComponent
      },
      {
        path:'project-employee',
        component:ProjectEmployeeComponent
      },
      {
        path:'department',
        component:DeparmentTableComponent
      },
    ]
  }
  

];
