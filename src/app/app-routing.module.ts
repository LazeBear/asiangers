import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RoomComponent} from './room/room.component';
import {NgModule} from '@angular/core';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuardService} from './auth/auth-guard.service';

const appRoute: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'room',
    component: RoomComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  providers: [AuthGuardService],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
