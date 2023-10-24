import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplaycountryComponent } from './components/displaycountry/displaycountry.component';
import { UpdatecountryComponent } from './components/updatecountry/updatecountry.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyinterceptorInterceptor } from './services/myinterceptor.interceptor';
import { DisplaycityComponent } from './components/displaycity/displaycity.component';
import { UpdatecityComponent } from './components/updatecity/updatecity.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplaycountryComponent,
    UpdatecountryComponent,
    LoginComponent,
    DisplaycityComponent,
    UpdatecityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    FormsModule,ReactiveFormsModule, FormsModule 
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,  useClass:MyinterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
