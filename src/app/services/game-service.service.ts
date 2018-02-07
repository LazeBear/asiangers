import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Coordination} from '../models/position.model';
import {WebsocketService} from './websocket.service';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class GameServiceService {
  treasures = new Subject<Coordination[]>();
  fenceBuild = new Subject<Coordination>();
  systemMsg = new Subject<string>();
  errorMsg = new Subject<string>();
  infoMsg = new Subject<string>();
  successMsg = new Subject<string>();
  gameIsOver = new Subject<boolean>();
  armyBuild = new Subject<any>();
  armyLeft = new Subject<any>();
  newGame = new Subject<boolean>();
  captured = new Subject<Coordination[]>();
  private gameStarted: boolean = false;
  private currentPlayer = false;
  // private currentPlayerName = '';
  private lastMove: Coordination;
  private competitor = false;
  private battleBoard;
  private personalData = {};
  private armyNumber = 0;
  // private playerNumber = 0;
  private oneFenceLeft = false;

  constructor(private weService: WebsocketService) {
  }

  startListening() {
    console.log('listen');
    this.weService.onGameStart().subscribe(data => {
      this.newGame.next(true);
      this.treasures.next(data.treasures);
      this.battleBoard = data.battleBoard;
      this.gameStarted = true;
    });

    this.weService.onFightOn().subscribe(player => {
      this.competitor = true;
      // this.playerNumber = player.number;
      this.personalData = environment.playerData[player.size];
      this.personalData['id'] = player.number;
      this.armyLeft.next(this.personalData);
      // console.log(this.playerNumber, this.personalData);
    });

    this.weService.onMoveStart().subscribe((bool) => {
      this.currentPlayer = bool;
      // console.log('Lets go!');
      this.infoMsg.next('It\'s your turn now');
    });

    this.weService.onMoveEnd().subscribe(() => {
      this.currentPlayer = false;
      this.lastMove = null;
      // this.personalData['name'] = playerName;
      // console.log(playerName);
      // this.armyLeft.next(this.personalData);
      this.oneFenceLeft = false;
      // console.log('my move ends, next is ' + playerID);
      this.infoMsg.next('Your move ended');
    });

    this.weService.onCurrentPlayer().subscribe((player) => {
      this.personalData['name'] = player;
      this.armyLeft.next(this.personalData);
      this.infoMsg.next('Current player is ' + player);
    });

    this.weService.onOneFenceLeft().subscribe((pos) => {
      this.lastMove = new Coordination(pos.x, pos.y);
      this.oneFenceLeft = true;
      // console.log('can build one more fence');
      this.infoMsg.next('You can build one more fence');
    });

    this.weService.onBuildFence().subscribe((data) => {
      this.battleBoard[data.x][data.y] = 2;
      this.fenceBuild.next(data);
    });

    this.weService.onBuildArmy().subscribe((data) => {
      this.battleBoard[data.x][data.y] = data.player;
      this.armyBuild.next(data);
    });

    this.weService.onCaptured().subscribe((data) => {
      console.log('captured', data);
      this.captured.next(data.captured.map(i => {
        this.battleBoard[i.x][i.y] = 9;
        return new Coordination(i.x, i.y);
      }));
    });

    this.weService.onGameOver().subscribe((data) => {
      console.log('game oVER', data);
      data.forEach(i => {
        this.systemMsg.next(`player: ${i.player}, got ${i.totalGold} in total. The highest gold captured is ${i.highestGoldCaptured}`);
      });

      this.gameIsOver.next(true);
      this.gameOver();
    });

    this.weService.onGameTerminated().subscribe((player) => {
      // console.log('game terminated because ' + player + ' left the game!');
      this.gameOver();
      this.errorMsg.next('Game terminated because ' + player + ' left the game!');
    });
  }

  fenceOnClick(pos: Coordination, type: number) {
    if (!this.generalCheck(pos)) {
      return;
    }
    if (this.lastMove != null && this.lastMove.checkMove(pos)) {
      // console.log('this is not allowed');
      this.errorMsg.next('This is not allowed');
      return;
    }
    this.weService.buildFence({...pos, type});
  }

  groundOnClick(pos: Coordination) {
    if (!this.generalCheck(pos)) {
      return;
    }
    if (this.armyNumber === 0) {
      this.errorMsg.next('Please select character level first!');
      // console.log('please select character level first!');
      return;
    }
    if (this.oneFenceLeft) {
      this.errorMsg.next('You can not do that!');
      return;
    }
    if (this.personalData[this.armyNumber] === 0) {
      this.errorMsg.next('No level ' + this.armyNumber + ' character left!');
      // console.log('no level ' + this.armyNumber + ' character left!');
      return;
    } else {
      this.personalData[this.armyNumber]--;
      this.armyLeft.next(this.personalData);
    }
    this.weService.buildArmy({...pos, 'army': this.armyNumber});
  }

  chooseArmyNumber(type) {
    this.armyNumber = type;
  }

  endTurn() {
    if (this.oneFenceLeft) {
      this.weService.endTurn();
    } else {
      this.errorMsg.next('You cannot end your turn yet');
      // console.log('you cannot end your turn yet');
    }
  }

  private generalCheck(pos) {
    if (!this.gameStarted) {
      this.errorMsg.next('Game has not started!');
      // console.log('game has not started!');
      return false;
    }
    if (!this.competitor) {
      this.errorMsg.next('You are not in the game');
      // console.log('you are not in the game');
      return false;
    }
    if (!this.currentPlayer) {
      this.errorMsg.next('It\'s not your turn');
      // console.log("it's not your turn");
      return false;
    }
    if (this.battleBoard[pos.x][pos.y] !== 0) {
      // console.log('invalid move');
      this.errorMsg.next('Invalid move');
      return false;
    }
    return true;
  }

  private gameOver() {
    this.gameStarted = false;
    this.currentPlayer = false;
    this.lastMove = null;
    this.competitor = false;
    this.battleBoard = [];
    this.personalData = {};
    this.armyNumber = 0;
    // this.playerNumber = 0;
    this.oneFenceLeft = false;
    // this.currentPlayerName = '';
  }

  // private generateTreasureLocations() {
  //   for (let i = 0; i < environment.numOfTreasure; i++) {
  //     this.treasureLocations.push(this.generateSingleLocation());
  //   }
  //   this.treasures.next(this.treasureLocations);
  // }
  //
  // private generateSingleLocation() {
  //   const x = this.generateEvenNumber(environment.width * 2 - 1);
  //   const y = this.generateEvenNumber(environment.height * 2 - 1);
  //   const pos = new Coordination(x, y);
  //   for (let i = 0; i < this.treasureLocations.length; i++) {
  //     if (pos.equal(this.treasureLocations[i])) {
  //       return this.generateSingleLocation();
  //     }
  //   }
  //   return pos;
  // }
  //
  // private generateEvenNumber(range: number) {
  //   const num: number = Math.floor((Math.random() * range));
  //   return num % 2 === 0 ? num : this.generateEvenNumber(range);
  // }
}
