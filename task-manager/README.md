# Task Manager – Node.js CLI

This project is a basic command-line Task Manager built using Node.js.  
It lets you keep track of tasks by storing them in a JSON file and provides simple commands to manage them from the terminal.

---

## Overview

The application works using core Node.js modules:
- **fs** → to read/write task data  
- **path** → to manage file paths  
- **process.argv** → to read command-line input  

Tasks are saved in `tasks.json` and each task contains:
- an **id**
- a **text label**
- a **status** (`pending` or `done`)

---

## Available Commands

1. Add a Task: each task must have an id, label and status (pending/done)
2. List all the tasks (with their id and status)
3. Remove a task
4. Update a task
5. Mark task as “done”

