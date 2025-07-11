import {Component, Input} from '@angular/core';
import {Response} from '../../models/response';

@Component({
  selector: 'app-response',
  imports: [],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  @Input() response!: Response;
}
