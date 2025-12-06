const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

function loadTasks() {
  try {
    const text = fs.readFileSync(filePath, "utf8");
    return JSON.parse(text);
  } catch (err) {
    return [];
  }
}

function saveTasks(tasks) {
  const json = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(filePath, json);
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {

  case "add": {
    const label = args.slice(1).join(" ");

    if (label === "") {
      console.log("Enter a task");
      break;
    }

    const tasks = loadTasks();

    let id;
    if (tasks.length === 0) {
      id = 1;
    } else {
      id = tasks[tasks.length - 1].id + 1;
    }
    
    const newTask = {
      id: id,
      label: label,
      status: "pending"
    };

    tasks.push(newTask);
    saveTasks(tasks);

    console.log("Task added:", label);
    break;
  }
  
  
  case "list": {
    const tasks = loadTasks();

    if (tasks.length === 0) {
       console.log("No tasks found.");
    } else {
    tasks.forEach(function(t) {
      console.log(t.id + ". " + t.label + " [" + t.status + "]");
    });
   }

    break;
   }


 case "remove": {
    const id = Number(args[1]);

    if (!id) {
      console.log("Please enter a task ID.");
      break;
    }

    const tasks = loadTasks();
    let newTasks = [];
    let found = false;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        found = true;
      } else {
        newTasks.push(tasks[i]);
      }
    }

    if (!found) {
      console.log("Task not found.");
    } else {
      saveTasks(newTasks);
      console.log("Task removed:", id);
    }

    break;
  }



  case "update": {
    const id = Number(args[1]);
    const newLabel = args.slice(2).join(" ");

    if (!id || newLabel === "") {
      console.log("Usage: node app.js update <id> \"new label\"");
      break;
    }

    const tasks = loadTasks();
    let found = false;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].label = newLabel;
        found = true;
      }
    }

    if (!found) {
      console.log("Task not found.");
    } else {
      saveTasks(tasks);
      console.log("Task updated:", id);
    }

    break;
  }

  case "done": {
    const id = Number(args[1]);

    if (!id) {
      console.log("Enter a task ID");
      break;
    }

    const tasks = loadTasks();
    let found = false;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].status = "done";
        found = true;
      }
    }

    if (!found) {
      console.log("Task not found.");
    } else {
      saveTasks(tasks);
      console.log("Task marked as done:", id);
    }

    break;
  }

  default:
    console.log("Try: add, list, remove, update, done");
}
