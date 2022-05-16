import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }
  loadHotels(){
    return this.http.get<hotelDetails[]>('/api/hotel/hotelDetails')
  }
  updateVisitorCount(count:number, id:number){
    console.log('id',id)
    let data = {
      visitors:count
    }
    console.log(data)
    return this.http.put('/api/hotel/updateVisitors/'+id,data)
  }

}
