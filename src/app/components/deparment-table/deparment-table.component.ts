import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Department } from '../../model/interface/master';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FilterPipe } from '../../filter.pipe';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-deparment-table',
  standalone: true,
  imports: [CommonModule,FormsModule, FilterPipe, RouterLink],
  templateUrl: './deparment-table.component.html',
  styleUrl: './deparment-table.component.css'
})
export class DeparmentTableComponent implements OnInit {

  departmentList: Department [] = [];
  oldObj: Department = { departmentId: 0, departmentName: '', departmentLogo: '', isEdit: false }; // Default values
  private messageService = inject(MessageService);
  searchText : any;
  router = inject(Router);


  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.getAllDepartments()
  }

  getAllDepartments(){
    this.http.get('https://projectapi.gerasim.in/api/Complaint/GetParentDepartment').subscribe((res:any)=> {
      this.departmentList = res.data;
    })
  }

  onEdit(item : Department){
   item.isEdit = true;
   const strObj = JSON.stringify(item);
   const newObj = JSON.parse(strObj);
   this.oldObj = newObj;
  }

  onCancel(item : Department){
    item.isEdit = false;
    item.departmentName = this.oldObj.departmentName;
    item.departmentLogo = this.oldObj.departmentLogo;
    item.departmentId = this.oldObj.departmentId;
    this.getAllDepartments();
  }

  onUpdate(item : Department){
    this.http.post('https://projectapi.gerasim.in/api/Complaint/UpdateDepartment', item).subscribe((res:any)=> {
     if(res.result){
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Department Updated successfully',
      });
      this.getAllDepartments();
     } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'API Error',
      });
     }
    })
  }

  addNew(){
    this.departmentList.unshift({departmentId:0, departmentLogo :'',departmentName:'', isEdit : true})
  }

  onNewCreate(item: Department){
    this.http.post('https://projectapi.gerasim.in/api/Complaint/AddNewDepartment', item).subscribe((res:any)=> {
      if(res.result){
       this.messageService.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Department Created successfully',
       });
       this.getAllDepartments();
      } else {
       this.messageService.add({
         severity: 'error',
         summary: 'Error',
         detail: 'API Error',
       });
      }
     })
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.http.delete(`https://projectapi.gerasim.in/api/Complaint/DeletedepartmentBydepartmentId?departmentId=${id}`, {}).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department deleted successfully',
          });
          this.getAllDepartments();
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'API Error',
          });
        }
      );
    }
  }
}

