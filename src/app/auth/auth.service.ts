import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

// https://angularfirebase.com/snippets/angularfire2-version-4-authentication-service/
@Injectable()
export class AuthService {
  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else {
      return this.authState['displayName'] || 'UnKnowN';
    }
  }


  //// Email/Password Auth ////
  emailSignUp(obj) {
    return this.afAuth.auth.createUserWithEmailAndPassword(obj.email, obj.password)
      .then((user) => {
        this.authState = user;
        // this.updateUserData()
        this.authState.updateProfile({
          displayName: obj.username,
          photoURL: null
        }).then(() => {
          this.router.navigate(['/room']);
        });
      });
  }

  emailLogin(obj) {
    return this.afAuth.auth.signInWithEmailAndPassword(obj.email, obj.password)
      .then((user) => {
        this.authState = user;
        console.log(this.authState);
        this.router.navigate(['/room']);
      });
  }

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }


  //// Helpers ////
  // private updateUserData(): void {
  //   // Writes user name and email to realtime db
  //   // useful if your app displays information about users or for admin features
  //   let path = `users/${this.currentUserId}`; // Endpoint on firebase
  //   let data = {
  //     email: this.authState.email,
  //     name: this.authState.displayName
  //   }
  //
  //   this.db.object(path).update(data)
  //     .catch(error => console.log(error));
  //
  // }
  //
}
