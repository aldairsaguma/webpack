import "./styles.css";

/*Si es que no se especifica el nombre del archivo
busca el index por defecto*/
import {TodoList } from './js/classes/index';
import { createTodoHtml } from './js/componentes';

export const todoList = new TodoList();

//Se puede omitir el todo del forEach si solo es un elemento
//todoList.todos.forEach( todo  => createTodoHtml(todo) );
todoList.todos.forEach( createTodoHtml );
console.log(todoList.todos[0])
