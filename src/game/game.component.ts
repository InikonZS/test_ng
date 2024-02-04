import { Component, ElementRef, ViewChild } from '@angular/core';
import { initApp } from '../slots/loader';
import { Slots } from '../slots/slots';

@Component({
  selector: 'game-component',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  imports: []
})
export class GameComponent {
  slots: Slots | null = null;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined = undefined;
  @ViewChild('gameContainer') container: ElementRef<HTMLElement> | undefined = undefined;
  ngAfterViewInit(){
    const loader = initApp(this.canvas?.nativeElement);
    loader.then(app=>{
      this.slots = app;
    });
  }

  startPlay(){
    this.slots?.startPlay(()=>{
      console.log('stop');
    });
  }
}
