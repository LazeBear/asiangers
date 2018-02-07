import {Component, OnInit} from '@angular/core';
import {GameServiceService} from './services/game-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private gameService: GameServiceService) {

  }

  ngOnInit() {

    this.gameService.startListening();
  }


}
