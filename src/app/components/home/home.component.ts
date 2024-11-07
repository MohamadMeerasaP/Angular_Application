import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { DashboardData, User } from '../../interfaces/auth';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule,CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  items: User[] = [];
  dashboard : DashboardData[] = [];
  masterSrv = inject(MasterService)
  dashboardData : any;

  imagePath:string = "images/5096157.jpg"


  constructor(private AuthService: AuthService){}
  private router = inject(Router);

  ngOnInit(): void {
    this.AuthService.getAllItem().subscribe((data)=>{
      this.items = data;
      this.masterSrv.getDashboardValue().subscribe((res : any)=>{
        this.dashboardData = res;
      })
  })
  }
}
