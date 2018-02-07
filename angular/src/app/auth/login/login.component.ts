import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loggingIn = false;
  model = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onLogIn() {
    this.snackBar.dismiss();
    this.loggingIn = true;
    this.authService.emailLogin(this.model)
      .catch(e => {
        this.loggingIn = false;
        this.snackBar.open(e, 'X', {
          duration: 5000,
        });
      });
  }
}
