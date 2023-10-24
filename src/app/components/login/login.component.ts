import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResult } from 'src/app/models/commonmodel';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frm!: FormGroup;
  status: LoginResult = { success: false, message: '', token: '' };

  constructor(
    private signupService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  // onPost() {
  //   this.status = { success: false, message: 'Wait...', token: '' };
  //   this.signupService.login(this.frm.value).subscribe({
  //     next: (res) => {
  //       this.status = res;
  //       if (res.success) {
  //         this.router.navigate(['./display']);
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.status = { success: false, message: 'Some error on server side', token: '' };
  //     }
  //   });
  // }
  onPost() {
    this.status = { success: false, message: 'Wait...', token: '' };
    const { Email, Password } = this.frm.value; // Destructure form values
    
    this.authService.login({ Email, Password }).subscribe({
      next: (res) => {
        this.status = res;
        if (res.success) {
          this.router.navigate(['./display']);
        }
      },
      error: (err) => {
        console.log(err);
        this.status = { success: false, message: 'Some error on the server side', token: '' };
      }
    });
  }
  
  

  ngOnInit(): void {
    this.frm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['./display']);
    }
  }
}
