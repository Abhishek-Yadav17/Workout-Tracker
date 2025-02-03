import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private users = [
    { name: 'John', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Swimming', minutes: 45 }] },
    { name: 'Alice', workouts: [{ type: 'Yoga', minutes: 30 }] },
  ];

  getUsers() {
    return [...this.users];
  }

  addUser(name: string, workoutType: string, workoutMinutes: number) {
    const newUser = { name, workouts: [{ type: workoutType, minutes: workoutMinutes }] };
    this.users.push(newUser);
  }

  addWorkout(userName: string, type: string, minutes: number) {
    const user = this.users.find(u => u.name === userName);
    if (user) {
      user.workouts.push({ type, minutes });
    }
  }

  removeUser(userName: string) {
    this.users = this.users.filter(u => u.name !== userName);
  }
}
