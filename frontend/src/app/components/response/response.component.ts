import {Component, Input} from '@angular/core';
import {Response} from '../../models/response';

@Component({
  selector: 'app-response',
  imports: [],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  @Input() message = '';
  show = false;

  trigger(message: string, duration: number = 3000) {
    this.message = message;
    this.show = true;
    setTimeout(() => this.show = false, duration);
  }
}
