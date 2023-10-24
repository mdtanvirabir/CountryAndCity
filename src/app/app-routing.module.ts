import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DisplaycountryComponent } from './components/displaycountry/displaycountry.component';
import { UpdatecountryComponent } from './components/updatecountry/updatecountry.component';
import { DisplaycityComponent } from './components/displaycity/displaycity.component';
import { UpdatecityComponent } from './components/updatecity/updatecity.component';

const routes: Routes = [
  {path:'',redirectTo:'login' , pathMatch:'full'},
  {path:'login' , component:LoginComponent},
  { path:'display',component:DisplaycountryComponent},
  { path: 'update-country/:id', component: UpdatecountryComponent },
  { path:'displaycity',component:DisplaycityComponent},
  { path: 'update-city/:id', component: UpdatecityComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
