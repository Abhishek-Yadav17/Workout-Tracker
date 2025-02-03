import { Component } from '@angular/core';
import { WorkoutComponent } from './workout/workout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workout-app';
}
