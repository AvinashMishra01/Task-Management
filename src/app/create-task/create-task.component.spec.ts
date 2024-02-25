
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';


import { CreateTaskComponent } from './create-task.component';
import { TaskService } from '../task.service';
import { ActivatedRouteSnapshot,ParamMap,UrlSegment,ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTaskById', 'createTask', 'updateTask']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => {
            return '1'; // or any value you want to use for testing
          }
        } as ParamMap,
        url: [{ path: 'example' } as UrlSegment],
        params: {},
        queryParams: {},
        fragment: 'fragment',
      } as ActivatedRouteSnapshot
    };

    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      imports: [ReactiveFormsModule,MatCardModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Compile the component's template
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with task data if taskId is provided', async () => {
    const taskData = { id: 1, title: 'Task 1', description: 'Description 1', date: new Date(), status: 'Pending' };

    mockTaskService.getTaskById.and.returnValue(Promise.resolve(taskData));

    await component.ngOnInit();

    expect(mockTaskService.getTaskById).toHaveBeenCalledWith(1);
    expect(component.reactiveForm.value).toEqual(taskData);
  });

  it('should create new task when form is submitted', async () => {
    // Mock generateRandom5DigitNumber method to return a fixed value
    spyOn(component, 'generateRandom5DigitNumber').and.returnValue(Promise.resolve(12345));

    // Set up form value
    const formValue = { id: 1, title: 'Task 1', description: 'Description 1', date: new Date(), status: 'Pending' };
    component.reactiveForm.setValue(formValue);

    // Trigger form submission
    await component.onSubmit();

    // Expectations
    expect(component.reactiveForm.valid).toBe(true);
    expect(component.taskService.createTask).toHaveBeenCalledWith({ ...formValue, id: 12345 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should update task when form is submitted', () => {
    const formValue = { id: 1, title: 'Task 1', description: 'Description 1', date: new Date(), status: 'Pending' };
    component.reactiveForm.setValue(formValue);

    component.onUpdate();

    expect(mockTaskService.updateTask).toHaveBeenCalledWith(formValue);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});

