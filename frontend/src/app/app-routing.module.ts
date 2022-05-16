import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';
import { ViewpageComponent } from './viewpage/viewpage.component';

const routes: Routes = [
  {
    path:'home',
    component:FrontpageComponent
  },
  {
    path:'',
    component:LoginComponent
  },

  {
    path:'hotel',
    component:HotelComponent
  },
  {
    path:'status',
    component:ViewpageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
