import {Directive, ElementRef, HostListener, Injectable, OnDestroy, OnInit} from '@angular/core';
import {GameServiceService} from '../services/game-service.service';
import {Subscription} from 'rxjs/Subscription';

@Directive({
  selector: '[appGroundTile]'
})
@Injectable()
export class GroundTileDirective implements OnInit, OnDestroy {

  actionSubscription: Subscription;
  response: boolean;

  constructor(private el: ElementRef, private gameService: GameServiceService) {
  }

  ngOnInit() {
    // this.actionSubscription = this.gameService.action.subscribe(
    //   (action: string) => {
    //     if (action === 'ground') {
    //       this.response = true;
    //     } else {
    //       this.response = false;
    //     }
    //   }
    // );
    // this.response = true;
    // this.el.nativeElement.style.backgroundColor = 'blue';
  }

  ngOnDestroy() {
    this.actionSubscription.unsubscribe();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('red');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
