import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { HttpClient} from '@angular/common/http';
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
interface draftData{
    from:string,
    to:string,
    userid:number,
    hotelid:number
    status:'draft'
}
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  img!: string;
  id:number;
  data:hotelDetails;
  hotelData: hotelDetails[];
  draftDetails:draftData;
  user:loginData[];

  constructor(private router: Router, private service: BackendService, private http: HttpClient) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('pageData') || '')
    this.hotelData = JSON.parse(localStorage.getItem('hotelData') || '[]')
    console.log(this.hotelData)
    this.img = this.data.image
    this.id = this.data.id
    console.log(this.img,history.state)
    if(history.state.value){
      console.log(this.data.visitors+1)
      var count = this.data.visitors+1
      this.service.updateVisitorCount(count,this.data.id).subscribe(data=>{
        console.log('res',data)
      })
    }
    else
    {
      console.log(this.data.visitors)
    }
    }
  bookHotel(){
    this.draftDetails = JSON.parse(localStorage.getItem('draft') || '')
    if(this.draftDetails.from && this.draftDetails.to){
      this.user = JSON.parse(localStorage.getItem('userData') || '')
      let booking = {
        from:this.draftDetails.from,
        to:this.draftDetails.to,
        userid:this.user[0].id,
        hotelid:this.data.id,
        status:'booked'

      }
      this.http.put('api/hotel/hotelBooking/',booking).subscribe(response=>{
        console.log(response)
        if(response){
          alert("Your Booking is confirmed")
        }

      })

    }
    else{
      alert('Please select from date and to date from the front page')
    }
  }


}
