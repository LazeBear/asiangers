import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ToastsManager} from 'ng2-toastr';

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

  constructor(private authService: AuthService, public toastr: ToastsManager) {
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
