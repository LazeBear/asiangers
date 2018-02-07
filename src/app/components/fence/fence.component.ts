import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {Coordination} from '../../models/position.model';
import {GameServiceService} from '../../services/game-service.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-fence',
  templateUrl: './fence.component.html',
  styleUrls: ['./fence.component.css']
})

export class FenceComponent implements OnInit, OnDestroy {
  // type: fenceType;
  clickable: boolean = true;
  captured = false;
  fenceWidth: string = environment.fenceSize;
  fenceHeight: string = environment.fenceSize;
  showHrzFence: boolean = false;
  showVrtFence: boolean = false;
  @Input() x: number;
  @Input() y: number;
  @Input() type: number; // 0 = stand, 1 = vert, 2 = hrz
  myPos: Coordination;

  fenceBuildSubscription: Subscription;
  newGameSubscription: Subscription;
  captureSubscription: Subscription;

  constructor(private gameService: GameServiceService) {
  }

  ngOnInit() {
    this.myPos = new Coordination(this.x, this.y);
    if (this.type === 0) {
      this.clickable = false;
    } else if (this.type === 2) {
      this.fenceWidth = environment.groundSize;
      // this.showHrzFence = true;
    } else {
      this.fenceHeight = environment.groundSize;
      // this.showVrtFence = true;
    }

    this.fenceBuildSubscription = this.gameService.fenceBuild.subscribe(
      pos => {
        if (this.myPos.equal(pos)) {
          console.log(this.myPos, pos);
          if (this.type === 2) {
            this.showHrzFence = true;
          } else if (this.type === 1) {
            this.showVrtFence = true;
          }
          this.clickable = false;
        }
      }
    );
    this.newGameSubscription = this.gameService.newGame.subscribe(
      bool => {
        if (bool) {
          this.showVrtFence = false;
          this.showHrzFence = false;
          this.captured = false;
          this.clickable = this.type !== 0;
        }
      }
    );

    this.captureSubscription = this.gameService.captured.subscribe(
      (captured) => {
        for (let i = 0; i < captured.length; i++) {
          if (this.myPos.equal(captured[i])) {
            this.captured = true;
            this.clickable = false;
            break;
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.fenceBuildSubscription.unsubscribe();
  }

  onClick() {
    if (!this.clickable) {
      console.log('cannot click');
      return;
    }
    this.gameService.fenceOnClick(this.myPos, this.type);
  }
}
