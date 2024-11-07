import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../services/master.service';
import { AsyncPipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { IProject } from '../../model/interface/master';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

  projectForm : FormGroup = new FormGroup ({});
  private messageService = inject(MessageService);

  empList$ : Observable<Employee[]> = new Observable<[]>;
  masterSrv = inject(MasterService);
  activatedRoute = inject(ActivatedRoute);

  constructor(){
    this.empList$ = this.masterSrv.getAllEmp();
    this.initializeForm();
    this.activatedRoute.params.subscribe((res : any)=> {
      if(res.id !=0){
        this.getProject(res.id)
      }
    })
  }

  initializeForm(data?: IProject) {
    this.projectForm = new FormGroup ({
      projectId: new FormControl(data ? data.projectId : 0),
      projectName: new FormControl(data ? data.projectName : ''),
      clientName: new FormControl(data ? data.clientName : ''),
      startDate: new FormControl(data ? data.startDate : ''),
      leadByEmpId: new FormControl(data ? data.leadByEmpId : ''),
      contactPerson: new FormControl(data ? data.contactPerson : ''),
      contactNo: new FormControl(data ? data.contactNo : ''),
      emailId: new FormControl(data ? data.emailId : '')
    })
  }

  getProject(id :number) {
    this.masterSrv.getProjectById(id).subscribe((res : IProject) => {
      this.initializeForm(res)
    },
     error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'API Error',
      });
    })
  }


  onSaveProject() {
    const formValue = this.projectForm.value
    this.masterSrv.saveProject(formValue).subscribe((res : IProject) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Project Created Successfully',
      });
      this.projectForm.reset();
    },
     error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'API Error',
      });
    })
  }

  onUpdateProject() {
    const formValue = this.projectForm.value
    this.masterSrv.UpdateProject(formValue).subscribe((res : IProject) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Project Updated Successfully',
      });
      this.projectForm.reset();
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
