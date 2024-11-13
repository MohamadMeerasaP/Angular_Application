import { Component, inject, signal } from '@angular/core';
import { Department } from '../../model/interface/master';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulk-deparment-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bulk-deparment-table.component.html',
  styleUrl: './bulk-deparment-table.component.css'
})
export class BulkDeparmentTableComponent {
  isEdit = signal<boolean>(false);  // Initially set to false to show "Edit" button
  departmentList: Department[] = [];
  oldObj: Department = { departmentId: 0, departmentName: '', departmentLogo: '', isEdit: false };
  private messageService = inject(MessageService);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.http.get('https://projectapi.gerasim.in/api/Complaint/GetParentDepartment').subscribe((res: any) => {
      this.departmentList = res.data;
    });
  }

  addNew() {
    this.departmentList.unshift({ departmentId: 0, departmentLogo: '', departmentName: '', isEdit: true });
    this.isEdit.set(true);
  }

  onEdit() {
    this.isEdit.set(true);
  }

  onCancel() {
    this.isEdit.set(false);
    this.getAllDepartments();
  }

  bulkUpdate() {
    this.http.post('https://projectapi.gerasim.in/api/Complaint/AddBulkDepartment', this.departmentList).subscribe(
      (res: any) => {
        if (res.result) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Department updated successfully',
          });
          this.getAllDepartments();
          this.isEdit.set(false);  // Resets back to "Edit" mode after a successful update
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'API Error',
          });
        }
      }
    );
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      this.http.delete(`https://projectapi.gerasim.in/api/Complaint/DeletedepartmentBydepartmentId?departmentId=${id}`).subscribe(
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
