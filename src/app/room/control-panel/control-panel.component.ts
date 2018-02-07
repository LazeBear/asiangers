import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {GameServiceService} from '../../services/game-service.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  buttonClass = 'button-disabled';
  gameDataSubscription: Subscription;
  gameData = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 'id': 0, 'name': ''};

  constructor(private wsService: WebsocketService,
              private gameService: GameServiceService) {
  }

  ngOnInit() {
    this.gameDataSubscription = this.gameService.armyLeft.subscribe((data) => {
      this.gameData = data;
      // console.log('update', this.gameData);
    });
  }

  startGame() {
    this.wsService.readyForStart();
  }

  finishGame() {
    this.wsService.finishGame();
    this.gameData = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 'id': 0, 'name': ''};
  }

  chooseArmy(number) {
    this.gameService.chooseArmyNumber(number);
  }

  endTurn() {
    this.gameService.endTurn();
  }
}
