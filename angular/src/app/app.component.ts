import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {GameServiceService} from './services/game-service.service';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private gameService: GameServiceService, vcr: ViewContainerRef, public toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.gameService.startListening();
  }


}
