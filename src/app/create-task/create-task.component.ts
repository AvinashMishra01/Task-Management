import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

export interface FormData {
  id: number;
  title: string;
  description: string;
  date: Date;
  status: string;
}



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  reactiveForm !: FormGroup;
  stylesheet: string[] = ['Pending', 'In-Progress', 'Completed'];
  task!: FormData;
 updateIsClicked: boolean = false;

  constructor(public taskService: TaskService, public router: Router, public routes: ActivatedRoute, public location: Location) { }

  async ngOnInit(): Promise<void> {

    this.reactiveForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      status: new FormControl('', [Validators.required])
    });


    const taskId = +this.routes?.snapshot.paramMap.get('id')!;
    if (taskId) {
      this.task = await this.taskService.getTaskById(taskId);
      console.log("Update data roe ", this.task)
      if (this.task) {
        this.updateIsClicked=true;
        // Populate form fields with task data using this.task
        this.reactiveForm.patchValue({
          title: this.task.title,
          description: this.task.description,
          date: this.task.date,
          status: this.task.status,
          id: this.task.id
        });
      }
    }

  }

  goBack(){
    this.location.back();
  }
  async generateRandom5DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber;
  }

  async onSubmit() {

    if (this.reactiveForm.valid) {
      const formValue = this.reactiveForm.value;
      console.log('Form submitted successfully.', formValue);
      const id = await this.generateRandom5DigitNumber();
      formValue['id'] = id;
      this.taskService.createTask(formValue);
      Swal.fire('Success', 'Task Created Successfully', 'success');
      this.router.navigate(['/tasks']);

    } else {
      console.log('Form has errors. Please fix them.');
      Swal.fire('Error!', 'Please fill all the fields', 'warning');

    }
  }

 async onUpdate(){
  if (this.reactiveForm.valid) {
    const formValue = this.reactiveForm.value;


    console.log('Form updated successfully.', formValue);
    console.log('Form reactive form.', this.reactiveForm);

    this.taskService.updateTask(formValue);
    Swal.fire('Success', 'Task Updated Successfully', 'success');
    this.router.navigate(['/tasks']);

  } else {
    console.log('Form has errors. Please fix them.');
    Swal.fire('Error!', 'Please fill all the fields', 'warning');

  }

  }



}




