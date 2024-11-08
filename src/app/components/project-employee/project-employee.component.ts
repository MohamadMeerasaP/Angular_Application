import { Component, inject, OnInit, signal } from '@angular/core';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { RouterLink } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,AsyncPipe,CommonModule],
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

  initializeForm(data ? : IProjectEmployee) {
    this.form = new FormGroup({
      empProjectId: new FormControl(data? data.empProjectId :  0),
      projectId: new FormControl(data? data.projectId : 0),
      empId: new FormControl(data? data.empId : 0),
      assignedDate: new FormControl(data? data.assignedDate : ''),
      role : new FormControl(data? data.role : ''),
      isActive: new FormControl(data ? data.isActive :false),
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

  onEdit(data: IProjectEmployee) {
    this.form.patchValue({
      empProjectId: data.empProjectId,
      projectId: data.projectId,
      empId: data.empId,
      assignedDate: data.assignedDate,
      role: data.role,
      isActive: data.isActive
    });
  }
  

  onUpdateProjectEmp() {
    const formValue = this.form.value
    this.masterSrv.UpdateProjectEmp(formValue).subscribe((res : IProjectEmployee) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: ' Employee Project Updated Successfully',
      });
      this.getAllData();
      this.form.reset();
      this.initializeForm();
    },
     error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'API Error',
      });
    })
  }

  onDelete (id : number) {
    const isDelete = confirm("Are you sure want to Delete");
    if(isDelete) {
      this.masterSrv.deleteProjectEmpById(id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Deleted successfully',
        });
        this.getAllData();
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

  onCancel() {
    this.form.reset();
    this.initializeForm();
  }
}
