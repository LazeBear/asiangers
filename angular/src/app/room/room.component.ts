import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {GameServiceService} from '../services/game-service.service';
import {AuthService} from '../auth/auth.service';
import {WebsocketService} from '../services/websocket.service';
import {Identity} from '../models/identity.model';
import {ToastsManager} from 'ng2-toastr';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  idenity: Identity = {
    player: '',
    uid: ''
  };
  errorMsgSub: Subscription;
  infoMsgSub: Subscription;
  private alive: boolean = true;

  constructor(private gameService: GameServiceService,
              private authService: AuthService,
              private wsService: WebsocketService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.idenity.player = this.authService.currentUserDisplayName;
    this.idenity.uid = this.authService.currentUserId;
    this.wsService.joinServer(this.idenity);

    this.wsService.onJoinSuccess().takeWhile(
      () => this.alive)
      .subscribe(data => {
        this.showSuccess(data);
      });

    this.wsService.onInvalid().takeWhile(
      () => this.alive)
      .subscribe(data => {
        this.showError(data);
      });

    this.infoMsgSub = this.gameService.infoMsg.subscribe(msg => {
      this.showInfo(msg);
    });

    this.errorMsgSub = this.gameService.errorMsg.subscribe(msg => {
      this.showError(msg);
    });
  }

  ngOnDestroy() {
    this.wsService.disconnect();
    this.errorMsgSub.unsubscribe();
    this.infoMsgSub.unsubscribe();
    this.alive = false;
  }

  showSuccess(msg) {
    this.toastr.success(msg, 'Great!');
  }

  showError(msg) {
    this.toastr.error(msg, 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo(msg) {
    this.toastr.info(msg);
  }
}
