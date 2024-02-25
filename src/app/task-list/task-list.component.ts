import { Component,OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
// table designe 

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';


export interface UserData {
  id: number;
  title: string;
  descriptoin: string;
  date: Date;
  status: string;
}


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit,AfterViewInit {

 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  


  displayedColumns: string[] = ['Id', 'Title', 'Description', 'Date', 'Status', 'Action'];
  dataSource: MatTableDataSource<UserData> | any;

  constructor(private taskService: TaskService, public router: Router) { }

  goToCreateTaskPage(){
    this.router.navigate(['/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  tasks: any[] | undefined;

 async ngOnInit(): Promise<void> {
   await this.loadTasks();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
 async loadTasks() {
    this.tasks = await this.taskService.getTasks(); 
   this.dataSource= new MatTableDataSource(this.tasks.map(task => ({ 
      id: task.id,
      title: task.title,
      description: task.description,
      date: task.date,
      status: task.status
    })));
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if(this.tasks.length===0){
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "No data present in task list. Please create first!",
        showConfirmButton: false,
        timer: 2000
      });
      this.goToCreateTaskPage()
    }
  }


deleteConfirmation(index:number){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

    try {
        this.deleteTask(index);
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting task:', error);
        Swal.fire(
          'Error!',
          'An error occurred while deleting the task.',
          'error'
        );
      }
    }
  })
}

  
  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.loadTasks();
  }


  updateTask(toUpdateId:number){
    console.log('id is ', toUpdateId)
    this.router.navigate(['/edit', toUpdateId]); 
  }


  compliteConfirmation(toConpliteId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to complite this task!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Complite it!'
    }).then((result) => {
      if (result.isConfirmed) {

        try {
            this.compliteTask(toConpliteId);
            Swal.fire(
              'Complited!',
              'Your task has been complited.',
              'success'
            );
          } catch (error) {
            console.error('Error compliting task:', error);
            Swal.fire(
              'Error!',
              'An error occurred while compliting the task.',
              'error'
            );
          }
      }
    })
  }


  compliteTask(toCompliteId: number): void {
    this.taskService.compliteTask(toCompliteId);
    this.loadTasks();
  }


}
