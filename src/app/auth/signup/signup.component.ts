import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signingUp = false;
  hide = true;
  model = {
    email: '',
    password: '',
    username: ''
  };

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSignUp() {
    this.snackBar.dismiss();
    if (this.model.username === '') {
      this.snackBar.open('Please fill in your display name', 'X', {
        duration: 5000,
      });
      return;
    }
    this.signingUp = true;
    this.authService.emailSignUp(this.model)
      .catch(e => {
        this.signingUp = false;
        this.snackBar.open(e, 'X', {
          duration: 5000,
        });
      });
  }
}
