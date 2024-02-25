###  Task-Management
Welcome to the Angular Task Management App! This application allows users to manage tasks by adding, viewing, updating, and deleting tasks. It is built using Angular and implements various Angular features and best practices.

# Features

# User Interface:
Task list: Display a list of tasks with options to mark tasks as completed or delete them.
Create a New task: Allow users to create a new task.
Update task: Enable users to edit existing tasks.

# Task Management:

CRUD operations for tasks.
Angular forms for capturing task information.
Validation for form inputs.
User-friendly feedback on task actions.

# Angular Features:
Angular components for each view.
Two-way data binding.
Angular services and dependency injection.
Routing and navigation using Angular Router.

# Local Storage:
Client-side data persistence mechanism to store tasks.

# Code Quality:
Clean, organized, and maintainable code following Angular best practices.
Comments for explaining complex logic or decisions.
Use of Angular CLI for project setup and generation.

# Testing:
Unit tests for critical parts of the application.
Angular testing tools (TestBed and Jasmine) for writing tests.

# Getting Started

To run the Angular Task Management App locally, follow these steps:

* Clone the repository to your local machine:

git clone <repository-url>
Navigate to the project directory:
cd angular-task-management-app

Install dependencies:
npm install

Start the development server:
ng serve

Open your browser and visit http://localhost:4200 to view the application.

# How to Use

* Use the navigation menu to switch between different views: Task List, Task Details, Create Task, Edit Task.
* If the task list is empty, you will be automatically redirected to the Create Task page.
* On the Create Task page, provide the title, description, due date, and select the status of the task, then click the  "Save" button to add the task.
* Once a task is added, you will be redirected to the Task List view.

# In the Task List view:
 * Each task is displayed with its title, due date, and status.
 * Hover over the status icon to view the current status of the task.
 * If a task is in pending or in progress, you will find a button to mark it as complete. Clicking this button will prompt for confirmation before completing the task.
* To delete a task, click the delete icon next to the task. A confirmation message will appear before deleting the task.
* Use the navigation links or browser buttons to navigate back and forth between views.

# Testing

To run unit tests for the application, use the following command:
ng test


## Note
While running the ng test, you may encounter an error like:

* ' Error: NG0304: 'mat-card' is not a known element (used in the 'TaskListComponent' component template):
1. If 'mat-card' is an Angular component, then verify that it is part of an @NgModule where this component is declared.
2. If 'mat-card' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. '
This error is not caused by any fault in the developer's code. This is because the main developer of the Material UI library has not implemented it. You can verify this fact on GitHub here. They mention, "Unfortunately, this is an intentional issue, as part of the labs is to fix the tests."
You can also check here:- https://github.com/nrwl/nx-workshop/issues/27

However, the tests for the reactive form have been correctly implemented by the developer.


