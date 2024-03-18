## Requirements

To run this application, you will need:

* Docker installed on your machine
* A terminal or command prompt

## Installation

To install this application, follow these steps:

* Clone this repository to your machine: `git clone https://github.com/JHorlamide/oakslab-audition-assignment.git`
* Navigate to the project directory: `cd oakslab-audition-assignment`

## Running the Application

To start the application use docker compose:

* `docker-compose up --build`
* To test the API endpoints, you can use a tool like [Postman](https://www.postman.com/downloads/) or [curl](https://curl.se/). For example, to create a new resource using `curl`, you can run the following command:

  * ```
    curl -X POST -H "Content-Type: application/json" -d '{ "name": "Growth", "description": "Scale the business" }' http://localhost:8080/api/phases
    ```

## Usage

The API endpoints of this application are described below:

* `POST /api/phases`: Create a new phase of a startup.
* `GET /api/phases`: Get all created phases.
* `POST /api/phases/:phaseId/tasks:` Create new task for a phase.
* `PUT /api/phases/:phaseId/tasks/:taskId:` Mark a task as completed.
* `PUT /api/phases/:phaseId/tasks/:taskId/reopen:` Reopen a task.

## Solution proposition for reopening a completed task

To implement the ability to reopen or undo a completed task, we can add a "completed" field to the task object in the phase's tasks array. When a task is completed, the "completed" field is set to true. To reopen or undo a completed task, we can set the "completed" field to false.

To update the "done" field of the phase when a task is reopened, we need to iterate through all the tasks in the phase's tasks array and check the "completed" field of each task. If all tasks are completed, we can set the "done" field of the phase to true. Otherwise, we set it to false. We can then return a success message indicating that the task was reopened successfully.

Here is an example of the API endpoint to reopen a completed task:

```
PUT /api/phases/c6a753a7/task/d7d0fbf6/reopen
```

## Database schema design using MongoDB

If we are using MongoDB as the database, we can use a document-based schema to store the data. We can create a collection named "phases" to store the phase data. The document structure for each phase could be something like this:

```
{
  _id: ObjectId("..."), // Unique identifier for the phase
  name: "foundation",
  description: "Setup the important things",
  tasks: [
    {
      _id: ObjectId("..."), // Unique identifier for the task
      name: "Task 1",
      description: "Description of Task 1",
      completed: false
    },
    {
      _id: ObjectId("..."), // Unique identifier for the task
      name: "Task 2",
      description: "Description of Task 2",
      completed: false
    },
    // ... more tasks
  ],
  done: false
}
```

Here, we have an `_id` field that is a unique identifier for the phase, which is automatically generated by MongoDB. We also have a `name` and `description` field for the phase. The `tasks` field is an array of task objects, each with an `_id`, a `name`, `description`, and `completed` field. The `completed` field is set to `false` by default and can be updated to `true` when the task is completed. Finally, we have a `done` field to indicate if all tasks in the phase are completed.

This schema allows us to easily query and update the data using MongoDB's built-in methods.

## Running Test

To ensure the reliability and accuracy of the application, I have implemented a simple suite of tests. While these tests are not exhaustive, but they cover some critical aspects of the API implementation. To run the tests, use the following commands:

* To run the tests in watch mode, use the command `npm run test:watch`.
* To run the tests without watch mode, use the command `npm run test`.

I take application testing seriously and am committed to ensuring the highest possible quality of software :)
