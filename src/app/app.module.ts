import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RoomComponent} from './room/room.component';
import {GameBoardComponent} from './room/game-board/game-board.component';
import {GroundComponent} from './components/ground/ground.component';
import {FenceComponent} from './components/fence/fence.component';
import {LongFenceDirective} from './directives/long-fence.directive';
import {FenceTileDirective} from './directives/fence-tile.directive';
import {GroundTileDirective} from './directives/ground-tile.directive';
import {StandTileDirective} from './directives/stand-tile.directive';
import {GameServiceService} from './services/game-service.service';
import {ChatAreaComponent} from './room/chat-area/chat-area.component';
import {ChatService} from './services/chat.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WebsocketService} from './services/websocket.service';
import {LoginComponent} from './auth/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialDesignModule} from './material-design/materialDesign.module';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment.prod';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './auth/auth.service';
import {SignupComponent} from './auth/signup/signup.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ControlPanelComponent} from './room/control-panel/control-panel.component';
import {ToastModule} from 'ng2-toastr';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    GameBoardComponent,
    GroundComponent,
    FenceComponent,
    LongFenceDirective,
    FenceTileDirective,
    GroundTileDirective,
    StandTileDirective,
    ChatAreaComponent,
    LoginComponent,
    SignupComponent,
    ControlPanelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialDesignModule,
    AngularFireModule.initializeApp(environment.firebase, 'asiangers'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule,
    ToastModule.forRoot()
  ],
  providers: [WebsocketService, GameServiceService, ChatService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
