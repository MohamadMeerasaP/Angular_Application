export interface RegisterPostData {
  fullName: string;
  email: string;
  password: string;
}

export interface User extends RegisterPostData {
  username : string;
  id: string;
}

export interface DashboardData extends RegisterPostData {
  totalUsers : number,
  activeUsers : number,
  activeEmail : number,
  totalEmployee : number,
  totalProject : number
}
