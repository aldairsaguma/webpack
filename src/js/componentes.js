import { Todo } from './classes/todo.class';
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const newTodoValue = document.querySelector('.new-todo');
const clearCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

const createTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ todo.completed ? 'completed' : '' }" data-id="${todo.uid}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    return divTodoList.innerHTML += htmlTodo
}
//Events
newTodoValue.addEventListener('keyup', event => {
    if(event.keyCode === 13 && newTodoValue.value.length > 0){
        const newTodo = new Todo(newTodoValue.value); 
        todoList.newTodo(newTodo);
        createTodoHtml(newTodo);
        newTodoValue.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nameElement = event.target.localName; //input, label, button
    const parentElement = event.target.closest('li');
    const todoId = parseInt(parentElement.getAttribute('data-id'));
    if(nameElement.includes('input')){
        todoList.markCompleted(todoId);
        parentElement.classList.toggle('completed');
    }else if(nameElement.includes('button')){
            todoList.deleteTodo(todoId);
            divTodoList.removeChild(parentElement)
    }
});

clearCompleted.addEventListener('click', () => {
    const allList = document.querySelectorAll('.completed');
    todoList.deleteAllCompleted();
    for (const list of allList) {
        list.remove();
    }
});

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text;
    if(!filter) return;
    anchorFilters.forEach((element) => element.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const children of divTodoList.children) {
       children.classList.remove('hidden');
       const completed = children.classList.contains('completed');
       switch (filter) {
        case 'Pendientes':
            if(completed) children.classList.add('hidden');
            break;
        
        case 'Completados':
            if(!completed) children.classList.add('hidden');
        break;
       
        default:
            break;
       } 
    }
    

});

export { createTodoHtml }