import { Component, inject, OnInit, signal } from '@angular/core';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { RouterLink } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrls: ['./project-employee.component.css']  // Corrected property name
})
export class ProjectEmployeeComponent implements OnInit {

  // Correctly initialize signal with an empty array as the default value
  projectEmployeeList = signal<IProjectEmployee[]>([]);
  masterSrv = inject(MasterService);
  private messageService = inject(MessageService);
  form : FormGroup = new FormGroup({})
  projectList$ : Observable<IProject[]> = new Observable<IProject[]>;
  empList$ : Observable<Employee[]> = new Observable<Employee[]>;


  constructor(){
    this.initializeForm();
    this.projectList$ = this.masterSrv.getAllProjects();
    this.empList$ = this.masterSrv.getAllEmp()
  }

  ngOnInit(): void {
    this.getAllData();
  }

  initializeForm() {
    this.form = new FormGroup({
      empProjectId: new FormControl(0),
      projectId: new FormControl(0),
      empId: new FormControl(0),
      assignedDate: new FormControl(''),
      role : new FormControl(''),
      isActive: new FormControl(false),
    })
  }

  getAllData() {
    this.masterSrv.getProjectEmp().subscribe((res: IProjectEmployee[]) => {
      this.projectEmployeeList.set(res);  // Use .set to update the signal
    });
  }

  onSave() {
    const formValue = this.form.value;
    this.masterSrv.saveProjectEmp(formValue).subscribe((res : IProjectEmployee) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee Added to Project Successfully',
      });
      this.getAllData();
      this.form.reset();
    },
     error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'API Error',
      });
    })
  }
}
