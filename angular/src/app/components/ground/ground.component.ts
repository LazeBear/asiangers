import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {GameServiceService} from '../../services/game-service.service';
import {Coordination} from '../../models/position.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.css']
})
export class GroundComponent implements OnInit, OnDestroy {
  @Input() x: number;
  @Input() y: number;
  size: string = environment.groundSize;
  classList = 'ground';

  showTreasure: boolean = false;
  treasureNum = 0;
  // t1 = false;
  // t2 = false;
  // t3 = false;
  // t4 = false;
  // t5 = false;
  showAvatar: boolean = false;
  showElve: boolean = false;
  showWizard: boolean = false;
  showGiant: boolean = false;
  clickable: boolean = true;
  captured = false;
  gameOver = false;
  myPos: Coordination;
  treasureSubscription: Subscription;
  captureSubscription: Subscription;
  newGameSubscription: Subscription;
  armySubscription: Subscription;
  gameOverSubscription: Subscription;
  private armyAmount = 0;

  constructor(private gameService: GameServiceService) {
  }

  ngOnInit() {
    this.myPos = new Coordination(this.x, this.y);
    this.treasureSubscription = this.gameService.treasures.subscribe(
      (treasures) => {
        this.clickable = true;
        this.showTreasure = false;
        this.treasureNum = 0;
        for (let i = 0; i < treasures.length; i++) {
          if (this.myPos.equal(treasures[i])) {
            this.treasureNum = environment.treasureAllocation[i];
            this.showTreasure = true;
            this.clickable = false;
            break;
          }
        }
      }
    );

    this.captureSubscription = this.gameService.captured.subscribe(
      (captured) => {
        for (let i = 0; i < captured.length; i++) {
          if (this.myPos.equal(captured[i])) {
            this.classList = 'captured ground';
            this.clickable = false;
            // console.log('got captured', this.myPos);
            break;
          }
        }
      }
    );

    this.gameOverSubscription = this.gameService.gameIsOver.subscribe(
      (bool) => {
        if (bool) {
          this.gameOver = true;
        }
      }
    );

    this.newGameSubscription = this.gameService.newGame.subscribe(
      bool => {
        if (bool) {
          this.clickable = true;
          this.captured = false;
          this.showWizard = false;
          this.showGiant = false;
          this.showElve = false;
          this.showAvatar = false;
          this.showTreasure = false;
          this.treasureNum = 0;
          this.classList = 'ground';
          // this.t1 = false;
          // this.t2 = false;
          // this.t3 = false;
          // this.t4 = false;
          // this.t5 = false;
          this.gameOver = false;
        }
      }
    );

    this.armySubscription = this.gameService.armyBuild.subscribe(
      (data) => {
        if (this.myPos.equal(new Coordination(data.x, data.y))) {
          this.clickable = false;
          this.armyAmount = data.amount;
          switch (data.player) {
            case 1:
              this.showElve = true;
              break;
            case 2:
              this.showAvatar = true;
              break;
            case 3:
              this.showGiant = true;
              break;
            case 4:
              this.showWizard = true;
              break;
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.treasureSubscription.unsubscribe();
  }

  mouserOver() {
    if (this.showTreasure) {
      this.clickable = false;
    }
  }

  onClick() {
    console.log(this.myPos);
    if (!this.clickable) {
      console.log('cannot click');
      return;
    }
    // switch (this.myPos.y) {
    //   case 2:
    //     this.showAvatar = true;
    //     break;
    //   case 4:
    //     this.showElve = true;
    //     break;
    //   case 6:
    //     this.showGiant = true;
    //     break;
    //   default:
    //     this.showWizard = true;
    // }
    this.gameService.groundOnClick(this.myPos);
  }

}
