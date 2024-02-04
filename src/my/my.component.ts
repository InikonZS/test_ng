import { Component } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'my-component',
  standalone: true,
  templateUrl: './my.component.html',
  styleUrl: './my.component.css',
  imports: [CounterComponent, NgFor]
})
export class MyComponent {
  count = 0;

  handleButtonClick(param: number){
    this.count++;
    console.log('clicked', param);
  }

  subscribeTest(e: string){
    console.log('receive ', e);
  }
}
