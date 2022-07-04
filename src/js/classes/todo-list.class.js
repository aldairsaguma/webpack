import { Todo } from "./todo.class";

class TodoList{

    constructor(){
        this.loadFromLocalStorage();
    }

    newTodo (todo){
        this.todos.push(todo);
        this.saveInlocalStorage();
    }

    deleteTodo(uid){
      this.todos = this.todos.filter(todo => todo.uid !== uid );
      this.saveInlocalStorage();
    }

    markCompleted(uid){
        for (const todo of this.todos) {
            if(todo.uid == uid){
                todo.completed = !todo.completed;
                this.saveInlocalStorage();
                break;
            }
        }
    }

    deleteAllCompleted(){
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveInlocalStorage();
    }

    saveInlocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    loadFromLocalStorage(){
         this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo'))  : [];
         this.todos = this.todos.map(Todo.fromJson);
    }   
}

export { TodoList };