import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

interface loginData{
  name:string,
  id:number
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  name:string;
  password:string;
  user:loginData[];

  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  login(){

    if(this.name&&this.password){

      let data={
        name:this.name,
        password:this.password
      }

      this.http.post<loginData[]>('/api/hotel/loginUser',data).subscribe(response=>{
        this.user = response
          if(this.user.length>0){
            localStorage.setItem('userData',JSON.stringify(this.user))
            this.router.navigate(['/home'])
          }

        else{
          alert('Login error')
        }
      })
    }
    else{
      alert('Please fil the fields')
    }


  }
}
