import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
  }
  bookingOpen(status:string){
    this.router.navigate(['/status'],{queryParams:{status:status}})
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
