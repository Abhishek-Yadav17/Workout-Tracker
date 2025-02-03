import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutComponent } from './workout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../workout.service';

class MockWorkoutService {
  getUsers() {
    return [
      { name: 'John', workouts: [{ type: 'Running', minutes: 30 }] },
      { name: 'Alice', workouts: [{ type: 'Yoga', minutes: 30 }] },
    ];
  }

  addUser(name: string, workoutType: string, workoutMinutes: number) {}

  addWorkout(userName: string, type: string, minutes: number) {}

  removeUser(userName: string) {}
}

describe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutComponent],
      imports: [FormsModule, CommonModule],
      providers: [{ provide: WorkoutService, useClass: MockWorkoutService }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new user', () => {
    const initialUserCount = component.users.length;

    component.newUserName = 'Alice';
    component.newWorkoutType = 'Yoga';
    component.newWorkoutMinutes = 30;
    component.addUser();

    expect(component.users.length).toBe(initialUserCount + 1);
    const addedUser = component.users[component.users.length - 1];
    expect(addedUser.name).toBe('Alice');
    expect(addedUser.workouts[0].type).toBe('Yoga');
    expect(addedUser.workouts[0].minutes).toBe(30);
  });

  it('should edit user name', () => {
    const user = component.users[0];
    const initialName = user.name;
    component.editUserName(user);

    const newName = 'John Doe Updated';
    user.name = newName;
    expect(user.name).toBe(newName);
  });

  it('should calculate total workout minutes correctly', () => {
    const user = component.users[0];
    const totalMinutes = component.getTotalWorkoutMinutes(user.workouts);
    expect(totalMinutes).toBe(30);
  });

  it('should remove a user', () => {
    const initialUserCount = component.users.length;
    const userToRemove = component.users[0];
    component.removeUser(userToRemove);
    expect(component.users.length).toBe(initialUserCount - 1);
  });

  it('should filter users by name', () => {
    component.searchQuery = 'John';
    const filteredUsers = component.filteredUsers;
    expect(filteredUsers.length).toBeGreaterThan(0);
    expect(filteredUsers[0].name).toContain('John');
  });

  it('should filter users by workout type', () => {
    component.workoutFilter = 'Running';
    const filteredUsers = component.filteredUsers;
    expect(filteredUsers.length).toBeGreaterThan(0);
    expect(filteredUsers[0].workouts.some(workout => workout.type === 'Running')).toBeTrue();
  });

  it('should correctly paginate users', () => {
    component.currentPage = 1;
    const paginatedUsers = component.filteredUsers;
    expect(paginatedUsers.length).toBeLessThanOrEqual(component.itemsPerPage);
  });

  it('should add a workout to a user', () => {
    const user = component.users[0];
    const initialWorkoutCount = user.workouts ? user.workouts.length : 0;
    component.addWorkout(user.name, 'Cycling', 30);

    expect(user.workouts.length).toBe(initialWorkoutCount + 1);
    expect(user.workouts[user.workouts.length - 1].type).toBe('Cycling');
    expect(user.workouts[user.workouts.length - 1].minutes).toBe(30);
  });
});
