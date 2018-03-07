import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../auth.service';
import {ToastsManager} from 'ng2-toastr';
import {debug} from 'util';

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

  constructor(private authService: AuthService, private snackBar: MatSnackBar,  public toastr: ToastsManager) {
  }

  ngOnInit() {
  }

  onLogIn() {
    this.loggingIn = true;
    this.authService.emailLogin(this.model)
      .catch(e => {
        this.loggingIn = false;
        this.toastr.error(e, 'Oops!');
      });
  }
}
