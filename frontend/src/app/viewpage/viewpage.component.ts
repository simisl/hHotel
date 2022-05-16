import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

interface user{
  id:number,
  name:string
}
interface data{
  hotelname:string,
  hotelimage:string,
  from:string,
  to:string,
  status:string
}
@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.scss']
})
export class ViewpageComponent implements OnInit {
  user:user[];
  displayData: data[];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData')||'')
    console.log(this.user)
    console.log(this.user[0].id)
    this.route.queryParams.subscribe(res=>{
      this.http.get<data[]>('api/hotel/viewBooking/'+this.user[0].id+'/'+res['status']).subscribe(response=>{
        this.displayData = response
        this.displayData.map(obj=>{
          obj.from = obj.from.split('T')[0]
          obj.to = obj.to.split('T')[0]
        })
      })
    })


  }

}
