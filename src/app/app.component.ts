import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponent } from '../my/my.component';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
