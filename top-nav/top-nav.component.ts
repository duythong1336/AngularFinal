import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  displayName: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private sharingService: SharingService
  ) { }

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .then((user) => (this.displayName = user.email));
    // this.sharingService.isUserLoggedIn.subscribe((value) => {
    //   if (value) {
    //     this.userService.getCurrentUser().then((user) => {
    //       this.displayName = user.email;
    //       alert(user.email);
    //     });
    //   } else {
    //     alert(this.displayName);
    //   }
    // });
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/home']);
  }
}


