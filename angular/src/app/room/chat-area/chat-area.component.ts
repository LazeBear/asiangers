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

  systemMsg: Subscription;
  private active: boolean = true;

  constructor(private chatService: WebsocketService, private gameService: GameServiceService) {
  }

  ngOnInit() {
    this.chatService.onNewMessage()
      .takeWhile(() => this.active).subscribe(data => {
      this.msgHistory.push(data);
      // this.chatArea.scrollTop = this.chatArea.scrollHeight;
    });

    this.systemMsg = this.gameService.systemMsg
      .subscribe(data => {
        this.msgHistory.push({player: 'System', message: data});
        // this.chatArea.scrollTop = this.chatArea.scrollHeight;
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
