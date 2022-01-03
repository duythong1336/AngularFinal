import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(18)],
    ],
  });
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  
  ngOnInit(): void {
  }
  register() {
    var email = this.registerForm.controls.email.value;
    var password = this.registerForm.controls.password.value;
    this.authService
      .signUp(email, password)
      .then((email) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Register successful',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      
      .catch((err) => {
        Swal.fire(err.message, '', 'error');
      });
      this.router.navigate(['/login'])
  }

}
