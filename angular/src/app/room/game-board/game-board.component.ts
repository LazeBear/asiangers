import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  width: number[] = Array(environment.width * 2 - 1).fill(0).map((x, i) => i);
  height: number[] = Array(environment.height * 2 - 1).fill(0).map((x, i) => i);

  constructor() {
  }

  ngOnInit() {
  }

}
