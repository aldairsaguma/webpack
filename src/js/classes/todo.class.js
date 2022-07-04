class Todo{

    static fromJson({uid, task, completed, created}){
        const tempTodo = new Todo(task);
        tempTodo.uid = uid;
        tempTodo.completed = completed;
        tempTodo.created = created;

        return tempTodo;
    }

    constructor(task){
        this.task = task
        this.uid = new Date().getTime();
        this.completed = false;
        this.created = new Date();
    }
}

export {Todo}