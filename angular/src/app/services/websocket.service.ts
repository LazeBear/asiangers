import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs/Observable';
import {Identity} from '../models/identity.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket;

  constructor(private authService: AuthService) {
    this.socket = io(environment.ws_url);
    // this.onDisconnect().subscribe(() => {
    //   this.authService.signOut();
    // });
    this.socket.on('disconnect', (error) => {
      console.log('disconnected');
      // this.gameService.errorMsg.next('disconnected');
      this.authService.signOut();
    });
    this.socket.on('connect_timeout', (error) => {
      console.log('timeout');
    });
  }

  disconnect() {
    this.socket.emit('disconnect');
  }

  sendMessage(msg: string) {
    this.socket.emit('chat', msg);
  }

  // HANDLER
  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('chat', msg => {
        observer.next(msg);
      });
    });
  }

  joinServer(identity: Identity) {
    this.socket.emit('joinServer', identity);
  }

  finishGame() {
    this.socket.emit('finishGame');
  }

  onJoinSuccess() {
    return Observable.create(observer => {
      this.socket.on('joinServer', msg => {
        observer.next(msg);
      });
    });
  }

  readyForStart() {
    this.socket.emit('readyForStart');
  }

  onGameStart() {
    return Observable.create(observer => {
      this.socket.on('gameStart', msg => {
        observer.next(msg);
      });
    });
  }

  onCurrentPlayer() {
    return Observable.create(observer => {
      this.socket.on('currentPlayer', player => {
        observer.next(player);
      });
    });
  }

  onFightOn() {
    return Observable.create(observer => {
      this.socket.on('fightOn', player => {
        observer.next(player);
      });
    });
  }

  buildFence(data) {
    this.socket.emit('buildFence', data);
  }

  onMoveStart() {
    return Observable.create(observer => {
      this.socket.on('moveStart', () => {
        observer.next(true);
      });
    });
  }

  onMoveEnd() {
    return Observable.create(observer => {
      this.socket.on('moveEnd', (pos) => {
        observer.next(pos);
      });
    });
  }

  onOneFenceLeft() {
    return Observable.create(observer => {
      this.socket.on('oneFenceLeft', (data) => {
        observer.next(data);
      });
    });
  }

  endTurn() {
    this.socket.emit('endTurn');
  }

  onBuildFence() {
    return Observable.create(observer => {
      this.socket.on('buildFence', (pos) => {
        observer.next(pos);
      });
    });
  }

  buildArmy(data) {
    this.socket.emit('buildArmy', data);
  }

  onBuildArmy() {
    return Observable.create(observer => {
      this.socket.on('buildArmy', (data) => {
        observer.next(data);
      });
    });
  }

  onCaptured() {
    return Observable.create(observer => {
      this.socket.on('captured', (captured) => {
        observer.next(captured);
      });
    });
  }

  onInvalid() {
    console.log('on invalid');
    return Observable.create(observer => {
      this.socket.on('invalid', (msg) => {
        console.log('got invalid msg');
        observer.next(msg);
      });
    });
  }

  onGameOver() {
    return Observable.create(observer => {
      this.socket.on('gameOver', (data) => {
        observer.next(data);
      });
    });
  }

  onGameTerminated() {
    return Observable.create(observer => {
      this.socket.on('gameTerminated', (player) => {
        observer.next(player);
      });
    });
  }
}
