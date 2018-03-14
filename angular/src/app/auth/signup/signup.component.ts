import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';
import {ToastsManager} from 'ng2-toastr';

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

  constructor(private authService: AuthService, public toastr: ToastsManager) {
  }

  ngOnInit() {
  }

  onSignUp() {
    this.signingUp = true;
    this.authService.emailSignUp(this.model)
      .catch(e => {
        this.signingUp = false;
        this.toastr.error(e, 'Oops!');
      });
  }
}
