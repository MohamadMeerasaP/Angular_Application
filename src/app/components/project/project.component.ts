import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProject } from '../../model/interface/master';
import { MasterService } from '../../services/master.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent  implements OnInit{

  projectList: IProject[] =[];
  masterSrv = inject(MasterService)
  private messageService = inject(MessageService);
  router = inject(Router)

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this.masterSrv.getAllProjects().subscribe((res: IProject[])=>{
      this.projectList = res;
    })
  }

  onEdit(id: number){
    this.router.navigate(['new-project', id])
  }

  onDelete (id : number) {
    const isDelete = confirm("Are you sure want to Delete");
    if(isDelete) {
      this.masterSrv.deleteProjectById(id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Deleted successfully',
        });
        this.getProjects();
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
