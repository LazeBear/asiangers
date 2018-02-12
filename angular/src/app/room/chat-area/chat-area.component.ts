import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {GameServiceService} from '../../services/game-service.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit, OnDestroy {
  message: string;
  // @ViewChild('chat') chatArea: HTMLDivElement;
  msgHistory = [];
  showPlayerList = true;
  showGamerList = false;
  gamerList = [];
  playerList = [];
  playerName = '';

  systemMsg: Subscription;
  private gamerCharater = ['Elves', 'Avatars', 'Giants', 'Wizards'];
  private active: boolean = true;

  constructor(private chatService: WebsocketService,
              private gameService: GameServiceService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.playerName = this.authService.currentUserDisplayName;
    this.chatService.onNewMessage()
      .takeWhile(() => this.active).subscribe(data => {
      this.msgHistory.push(data);
      console.log(data);
    });

    this.chatService.onSystemMsg()
      .takeWhile(() => this.active).subscribe(msg => {
      this.msgHistory.push({player: 'SySteMM', message: msg});
    });

    this.chatService.onGamerList()
      .takeWhile(() => this.active).subscribe(gamer => {
      this.gamerList = gamer.map((i, index) => {
        return {'character': this.gamerCharater[index], 'player': i};
      });
    });

    this.chatService.onPlayerList()
      .takeWhile(() => this.active).subscribe(player => {
      this.playerList = player;
    });

    this.systemMsg = this.gameService.systemMsg
      .subscribe(data => {
        this.msgHistory.push({player: 'SySteMM', message: data});
      });
  }

  ngOnDestroy() {
    this.systemMsg.unsubscribe();
    this.active = false;
  }

  sendMsg() {
    if (this.message === '') return;
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
