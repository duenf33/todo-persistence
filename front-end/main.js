const readline = require('readline');
const fs = require('fs');


const PATH_TO_TODOS_FILE = __dirname + './../back-end/todos.json';
let todos = [];
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const displayMenu = () => {
  const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Remove all completed todos.
4. Toggle a todo's completion status.
5. Toggle a todo's priority.
6. Quit.

`

  interface.question(menu, handleMenu);
}

fs.readFile('./../back-end/todos.json', 'utf8', (err, data) => {
  if(err){
    console.log(err);
  }
  const obj = JSON.parse(data);
  todos = obj.todos;
  displayTodos();
})

const saveTodos = (todo) => {
  const obj = {todos: todos}
  const data = JSON.stringify(obj, null, 2);
  fs.writeFile('./../back-end/todos.json', data, 'utf8', (err) => {
    if(err){
      console.log(error);
      return;
    }
    console.log('Changes have been saved.');
    displayTodos();
  })
}

const displayTodos = () => {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    console.log(i + 1 + '. ' + todos[i].text + ' ' + (todos[i].isComplete ? '✅' : '✖'));
  }
}

const add = answer => {
  const todo = {
    text: answer,
    priority: 2,
    isComplete: false,
  }

  todos.unshift(todo);
  saveTodos();
  displayTodos();
  displayMenu();
}

const remove = num => {
  todos.splice(num - 1, 1);
  displayTodos();
  displayMenu();
}

const toggleComplete = num => {
  const todo = todos[num - 1];
  if (todo.isComplete) {
    todo.isComplete = false;
  } else {
    todo.isComplete = true;
  }

  displayTodos();
  displayMenu();
}

// or, with a bang operator:
const toggleCompleteAlt = num => {
  const todo = todos[num - 1];
  todo.isComplete = !todo.isComplete;

  displayTodos();
  displayMenu();
}

const togglePriority = num => {
  const todo = todos[num - 1];
  if (todo.priority === 1) {
    todo.priority = 2;
  } else if (todo.priority === 2) {
    todo.priority = 1;
  }

  displayTodos();
  displayMenu();
}

const removeCompletedTodos = () => {
  todos = todos.filter(function(todo) {
    return todo.isComplete === false;
  })

  displayTodos();
  displayMenu();
}

// or with a nifty one-line arrow function
const removeCompletedTodosAlt = () => {
  todos = todos.filter((todo) => todo.isComplete === false);

  displayTodos();
  displayMenu();
}

const handleMenu = cmd => {
  if (cmd === '1') {
    interface.question('\nWhat should go on your list? ', add);
  } else if (cmd === '2') {
    displayTodos();
    interface.question('\nPlease pick a todo to remove: ', remove);
  } else if (cmd === '3') {
    removeCompletedTodos();
  } else if (cmd === '4') {
    displayTodos();
    interface.question('\nPlease pick a todo to check complete or incomplete: ', toggleComplete);
  } else if (cmd === '5') {
    displayTodos();
    interface.question('\nPlease pick a todo to toggle its priority: ', togglePriority);
  } else {
    console.log('Quitting!');
    interface.close();
  }
}

displayTodos();
displayMenu();
