import {Directive, ElementRef} from '@angular/core';
import {environment} from '../../environments/environment.prod';

@Directive({
  selector: '[appLongFence]'
})
export class LongFenceDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.width = environment.groundSize;
  }

}
