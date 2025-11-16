import {Component, Input} from '@angular/core';
import {Response} from '../../models/response';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-response',
  imports: [
    NgClass
  ],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  @Input() message = '';
  @Input() success: boolean | null = null;
  show = false;

  trigger(message: string, success: boolean, duration: number = 3000) {
    this.message = message;
    this.success = success;
    this.show = true;
    setTimeout(() => this.show = false, duration);
  }
}
