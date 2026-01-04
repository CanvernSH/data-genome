import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VisualiseData } from './visualise-data/visualise-data';

@Component({
  selector: 'app-root',
  imports: [VisualiseData],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('frontend');
}
