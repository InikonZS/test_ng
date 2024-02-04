import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'counter-component',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input() count: number = 0;
  @Output() testOutput = new EventEmitter<string>();

  emitTest() {
    this.testOutput.emit('dggd');
  }
}
