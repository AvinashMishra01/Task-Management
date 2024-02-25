import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasksList';
  private taskList: any[] = []

 async getTasks(): Promise<any[]> {
    const tasks = localStorage.getItem(this.tasksKey);
    this.taskList = tasks ? JSON.parse(tasks) : [];
    return this.taskList
  }

 async saveTasks(tasks: any[]): Promise<void> {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  createTask(task: any): void {
    this.taskList.push(task);
    this.saveTasks(this.taskList);
  }



async deleteTask(idToDelete: number): Promise<void> {
  const indexToDelete = this.taskList.findIndex(task => task.id === idToDelete);
  if (indexToDelete !== -1) {
    this.taskList.splice(indexToDelete, 1); 
    await this.saveTasks(this.taskList); 
  } else {
    console.error(`Task with id ${idToDelete} not found.`);
  }
}

// update part 

async getTaskById(id: number): Promise<any> {
  const tasks = await this.getTasks();
  return tasks.find(task => task.id === id);
}

async updateTask(task:any){
  const index = this.taskList.findIndex(t => t.id === task.id);
  if(index !== -1){
    this.taskList[index] = task;
    await this.saveTasks(this.taskList);
  }else {
    console.error(`Task with id ${task.id} not found.`);
  }
}

compliteTask(taskId: number):void{
  const task= this.taskList.filter(t => t.id === taskId)
 if(task){
  task[0].status='Completed'
  this.updateTask(task[0])
  
 }
}


}
