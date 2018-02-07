import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {WebsocketService} from './websocket.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMessage(user, msg) {
    this.messages.next({'player': user, 'message': msg});
  }

}
