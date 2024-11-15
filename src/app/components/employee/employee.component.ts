import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';
import { MessageService } from 'primeng/api';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule,CommonModule,FilterPipe,UpperCasePipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  isFormVisible = signal<boolean>(false);
  masterSrv = inject(MasterService);
  private messageService = inject(MessageService);
  parentDeptList = signal<IParentDept[]> ([]);
  employeeList = signal<Employee[]> ([]);
  childDeptList = signal<IChildDept[]> ([]);
  parentDeptId: number = 0;
  employeeObj: Employee = new Employee();
  searchText: any;

  ngOnInit(): void {
    this.getParentDept();
    this.getEmployees();
  }

  getParentDept() {
    this.masterSrv.getAllDept().subscribe((res:IApiResponse) => {
      this.parentDeptList.set(res.data);
    })
  }

  getEmployees() {
    this.masterSrv.getAllEmp().subscribe((res:Employee[]) => {
      this.employeeList.set(res);
    })
  }

  onParentDeptChange() {
    this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((res : IApiResponse) => {
      this.childDeptList.set(res.data)
    })
  }

  onSave() {
    this.masterSrv.saveEmp(this.employeeObj).subscribe((res : IApiResponse) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee Created successfully',
      });
      this.getEmployees();
      this.employeeObj = new Employee();
    },
     error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'API Error',
      });
    })
  }

  onEdit(data : Employee) {
    this.employeeObj = data;
    this.isFormVisible.set(true);
  }

  onCancel() {
    this.isFormVisible.set(false)
    this.employeeObj = new Employee();

  }

  onUpdate() {
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res : IApiResponse) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee Updated successfully',
      });
      this.getEmployees();
      this.employeeObj = new Employee();
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
      this.masterSrv.deleteEmpById(id).subscribe((res : IApiResponse) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Deleted successfully',
        });
        this.getEmployees();
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

}
