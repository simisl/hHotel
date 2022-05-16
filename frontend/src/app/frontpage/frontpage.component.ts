import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { HttpClient} from '@angular/common/http';
import * as _ from 'underscore';
interface loginData{
  name:string,
  id:number
}
interface hotelDetails{
  name:string
  image:string
  id:number,
  outdoorpool:string,
  freewifi:string,
  freeparking:string,
  breakfast:string,
  spa:string,
  seaview:string,
  visitors:number,
  description:string[]
}
interface checkBoxData{
  id:number,
  name:string,
  value:string,
  checked:boolean
}

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {
  hotels: string[]=[];
  today:string;
  from: string;
  to: string;
  user:loginData[];
  checkBox: checkBoxData[];
  // hotelDetails: hotelDetail[]=[];
  hotelData: hotelDetails[]=[];

  constructor(private router: Router,
              private service: BackendService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.checkBox = [
      {id:1, name:'Free Parking', value:'freeparking', checked:false},
      {id:2, name:'Free Wifi', value:'freewifi', checked:false},
      {id:3, name:'Sea View', value:'seaview', checked:false},
      {id:4, name:'Spa', value:'spa', checked:false},
      {id:5, name:'Outdoor Pool', value:'outdoorpool', checked:false},
      {id:6, name:'Breakfast', value:'breakfast', checked:false}
    ]
    this.today = new Date().toISOString().split('T')[0];
    this.service.loadHotels().subscribe(data=>{
      this.hotelData = data

    })

  }
  openHotelPage(hotel: hotelDetails){
    console.log(this.from,this.to)
    let data = {
      image:hotel.image,
      visitors:hotel.visitors,
      name:hotel.name,
      id: hotel.id,
      description:hotel.description,
      outdoorpool:hotel.outdoorpool,
      freewifi:hotel.freewifi,
      freeparking:hotel.freeparking,
      breakfast:hotel.breakfast,
      spa:hotel.spa,
      seaview:hotel.seaview
    }


    localStorage.setItem('pageData',JSON.stringify(data))
    localStorage.setItem('hotelData',JSON.stringify(this.hotelData))
    if(this.from!='' && this.to!=''){
      this.user = JSON.parse(localStorage.getItem('userData') || '')
      console.log('userid',this.user)
      let draft = {
        from:this.from,
        to:this.to,
        userid:this.user[0].id,
        hotelid:hotel.id,
        status:'draft',
        hotelname:hotel.name,
        hotelimage:hotel.image

      }
      localStorage.setItem('draft',JSON.stringify(draft))
      this.http.post('/api/hotel/saveDraft',draft).subscribe(response=>{
        console.log(response)
      })
    }
    else{
      localStorage.removeItem('draft')
    }
    this.router.navigate(['hotel'],{queryParams:{hotelname:hotel.name},state:{value:true}})
    // console.log('p=',pic)
  }
  checkedData(data:any,e:Event){
    var checked = (e.target as HTMLInputElement).checked
    if(checked){
      data.checked = true
      console.log(data.value,checked)
    }
    else{
      data.checked = false
    }
    let checkedFields = this.checkBox.filter(obj=>obj.checked)
    let fields = _.pluck(checkedFields,"value")
    if(fields.length>0){
      this.http.get<hotelDetails[]>('/api/hotel/filterHotel/'+fields).subscribe(response=>{
        this.hotelData = response
        console.log('filter',response)
      }
        )
    }
    if(fields.length===0){
      this.service.loadHotels().subscribe(data=>{
        this.hotelData = data

      })
    }
  }


}
