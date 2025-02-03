import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const users = service.getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should add a user', () => {
    const initialUsersCount = service.getUsers().length;
    service.addUser('Bob', 'Cycling', 60);
    const users = service.getUsers();
    expect(users.length).toBe(initialUsersCount + 1);
    expect(users[users.length - 1].name).toBe('Bob');
  });

  it('should add a workout to a user', () => {
    const userName = 'John';
    const user = service.getUsers().find(u => u.name === userName);
    const initialWorkoutCount = user?.workouts ? user.workouts.length : 0;
    service.addWorkout(userName, 'Cycling', 60);
    const updatedUser = service.getUsers().find(u => u.name === userName);
    expect(updatedUser?.workouts.length).toBe(initialWorkoutCount + 1);
    expect(updatedUser?.workouts[updatedUser.workouts.length - 1].type).toBe('Cycling');
  });

  it('should remove a user', () => {
    const userName = 'Alice';
    const initialUsersCount = service.getUsers().length;
    service.removeUser(userName);
    const users = service.getUsers();
    expect(users.length).toBe(initialUsersCount - 1);
    expect(users.some(u => u.name === userName)).toBeFalse();
  });
});
