import { Component, OnInit } from '@angular/core';
import { LoginService } from './longin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 username:string="";
 password:string="";
 constructor(private _loginService: LoginService, private router: Router){
   
 }
 ngOnInit(){
  let token =  localStorage.getItem('token');
  // localStorage.getItem("token")
  if(token!=null){
    this.router.navigate(['/products']);
  }
  
 }
 login(){
  console.log(this.username);
  console.log(this.password);
  const data={
    username: this.username,
    password: this.password
  }
  this._loginService.login(data).subscribe({next:(res)=>{
    console.log(res)
    localStorage.setItem("token",res.token) //valida el token
    this.router.navigate(['/products']); //redirige a productos
  },error:(err)=>{
    console.log(err)
    alert(err.error.message)
  }});
 }
}

