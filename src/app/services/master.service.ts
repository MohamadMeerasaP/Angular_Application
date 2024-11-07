import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';
import { DashboardData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor(private http: HttpClient) { }

  getAllDept() : Observable<IApiResponse> {
    return this.http.get<IApiResponse>( this.apiUrl + "GetParentDepartment")
  }
  getChildDeptById(deptId : number) : Observable<IApiResponse> {
    return this.http.get<IApiResponse>( `${this.apiUrl}GetChildDepartmentByParentId?deptId= ${deptId}`);
  }
  saveEmp(obj : Employee) : Observable<IApiResponse> {
    return this.http.post<IApiResponse>( this.apiUrl + "CreateEmployee", obj)
  }
  getAllEmp() : Observable<Employee[]> {
    return this.http.get<Employee[]>( this.apiUrl + "GetAllEmployees")
  }
  updateEmp(obj : Employee) : Observable<IApiResponse> {
    return this.http.put<IApiResponse>( this.apiUrl + "UpdateEmployee/" + obj.employeeId, obj)
  }
  deleteEmpById(id : number) : Observable<IApiResponse> {
    return this.http.delete<IApiResponse>( this.apiUrl + "DeleteEmployee/" + id)
  }
  saveProject(obj : Employee) : Observable<IProject> {
    return this.http.post<IProject>( this.apiUrl + "CreateProject", obj)
  }
  getAllProjects() : Observable<IProject[]> {
    return this.http.get<IProject[]>( this.apiUrl + "GetAllProjects")
  }
  getProjectById(id: number) : Observable<IProject> {
    return this.http.get<IProject>( this.apiUrl + "GetProject/"+ id)
  }
  UpdateProject(obj : IProject) : Observable<IProject> {
    return this.http.put<IProject>( this.apiUrl + "UpdateProject/"+obj.projectId, obj)
  }
  deleteProjectById(id: number) : Observable<IProject> {
    return this.http.delete<IProject>( this.apiUrl + "DeleteProject/"+ id)
  }
  getProjectEmp() : Observable<IProjectEmployee[]> {
    return this.http.get<IProjectEmployee[]>( this.apiUrl + "GetAllProjectEmployees")
  }
  saveProjectEmp(obj : IProjectEmployee) : Observable<IProjectEmployee> {
    return this.http.post<IProjectEmployee>( this.apiUrl + "CreateProjectEmployee", obj)
  }
  UpdateProjectEmp(obj : IProjectEmployee) : Observable<IProjectEmployee> {
    return this.http.put<IProjectEmployee>( this.apiUrl + "UpdateProjectEmployee/"+obj.empProjectId, obj)
  }
  getDashboardValue() : Observable<DashboardData[]> {
    return this.http.get<DashboardData[]>( this.apiUrl + "GetDashboard")
  }
}
