import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {GameServiceService} from '../../services/game-service.service';
import {Subscription} from 'rxjs/Subscription';

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

  systemMsg: Subscription;
  private gamerCharater = ['Elves', 'Avatars', 'Giants', 'Wizards'];
  private active: boolean = true;

  constructor(private chatService: WebsocketService, private gameService: GameServiceService) {
  }

  ngOnInit() {
    this.chatService.onNewMessage()
      .takeWhile(() => this.active).subscribe(data => {
      this.msgHistory.push(data);
      // this.chatArea.scrollTop = this.chatArea.scrollHeight;
    });

    this.chatService.onSystemMsg()
      .takeWhile(() => this.active).subscribe(msg => {
      this.msgHistory.push({player: 'System', message: msg});
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
        this.msgHistory.push({player: 'System', message: data});
      });
  }

  ngOnDestroy() {
    this.systemMsg.unsubscribe();
    this.active = false;
  }

  sendMsg() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
