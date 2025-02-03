import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  showAddUserForm = false; 

  toggleAddUserForm() {
    this.showAddUserForm = !this.showAddUserForm;
  }

  searchQuery = '';
  workoutFilter = '';
  currentPage = 1; 
  itemsPerPage = 5; 

  newUserName = '';
  newWorkoutType = '';
  newWorkoutMinutes = 0;

  showAddWorkoutModal = false;
  selectedUser: User | null = null;
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  addWorkout(name: string, workoutType: string, minutes: number) {
    const newUser = this.users.find(user => user.name === name);
    if (newUser) {
      newUser.workouts.push({ type: workoutType, minutes });
    }
  }

  addUser() {
    if (!this.newUserName || !this.newWorkoutType || this.newWorkoutMinutes <= 0) {
      alert('Please provide valid user and workout details.');
      return;
    }

    const newUser: User = {
      id: this.users.length + 1,
      name: this.newUserName,
      workouts: [{ type: this.newWorkoutType, minutes: this.newWorkoutMinutes }]
    };

    this.users.push(newUser);

    this.newUserName = '';
    this.newWorkoutType = '';
    this.newWorkoutMinutes = 0;

    alert(`User "${newUser.name}" has been added successfully!`);
  }

  editWorkout(user: User, workout: Workout) {
    const newMinutes = prompt('Enter new minutes for the workout:', workout.minutes.toString());
    const newType = prompt('Enter new workout type:', workout.type);
    
    if (newMinutes && newType) {
      workout.minutes = parseInt(newMinutes, 10);
      workout.type = newType;
    }
  }

  editUserName(user: User) {
    const newName = prompt('Enter new name for the user:', user.name);
    if (newName) {
      user.name = newName;
    }
  }

  removeWorkout(user: User, workout: Workout) {
    const index = user.workouts.indexOf(workout);
    if (index > -1) {
      user.workouts.splice(index, 1);
    }
  }

  removeUser(user: User) {
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  getTotalWorkoutMinutes(workouts: Workout[]): number {
    return workouts.reduce((acc, curr) => acc + curr.minutes, 0);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get filteredUsers() {
    const filtered = this.users.filter(user => {
      return user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
             (this.workoutFilter ? user.workouts.some(workout => workout.type === this.workoutFilter) : true);
    });

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return filtered.slice(startIndex, endIndex);
  }

  get totalPages() {
    const filtered = this.users.filter(user => {
      return user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
             (this.workoutFilter ? user.workouts.some(workout => workout.type === this.workoutFilter) : true);
    });

    return Math.ceil(filtered.length / this.itemsPerPage);
  }

  openAddWorkoutModal(user: User) {
    this.selectedUser = user;
    this.showAddWorkoutModal = true;
    this.newWorkoutType = '';
    this.newWorkoutMinutes = 0;
  }

  closeAddWorkoutModal() {
    this.showAddWorkoutModal = false;
    this.selectedUser = null;
  }

  saveWorkout() {
    if (!this.selectedUser || !this.newWorkoutType || this.newWorkoutMinutes <= 0) {
      alert('Please provide valid workout details.');
      return;
    }

    this.selectedUser.workouts.push({
      type: this.newWorkoutType,
      minutes: this.newWorkoutMinutes
    });

    this.closeAddWorkoutModal();
  }
}
