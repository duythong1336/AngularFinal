import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    Email: ['', [Validators.email, Validators.required]],
    Password: ['', [Validators.required]],
  });
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  async tryGoogleLogin() {
    // try {
    //   await this.authService.signinGmail()
    //   console.log('login successfuly')
    // }
    // catch (err) {
    //   console.log(err);
      
      
    // }
    // console.log('abcd')
    this.authService.signinGmail().then((res) => {
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/admin'])
      // location.href = '/admin/product';
    });
  }
  LoginbyEmailandPass() {
    var email = this.loginForm.controls['Email'].value;
    var password = this.loginForm.controls['Password'].value;
    this.authService
      .signinFirebase(email, password)
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/admin'])
      })
      .catch((err) => {
        Swal.fire(err.message, '', 'error');
      });
  }
}

