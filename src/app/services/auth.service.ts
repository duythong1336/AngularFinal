import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
  ) { }


  async signinGmail() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return await this.afAuth.signInWithPopup(provider).then((res) => {
      // this.sharingsrv.isUserLoggedIn.next(true);
      console.log(' login succesfully');
    });
  }

  signinFirebase(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        (res) => {
          resolve(res);
          //this.sharingService.isUserLoggedIn.next(true);
        },
        (err) => reject(err)
      );
    });
  }

  signUp(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then(
        (res) => {
          var email = res.user?.email;
          resolve(email);
        },
        (err) => reject(err)
      );
    });
  }

  logout() {
    this.afAuth.currentUser.then((res) => {
      this.afAuth.signOut();
      // this.sharingsrv.isUserLoggedIn.next(false);
    });
  }
}
