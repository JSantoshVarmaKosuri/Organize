import { Component, Input } from '@angular/core';
import { TodoListModel } from '../../SharedModule/Stores/Models/org.list.model';

@Component({
    selector: 'org-todo',
    templateUrl: 'org.organize.todo.html',
    styleUrls: ['org.organize.todo.scss']
})
export class OrganizeEditorTodoComponent {
    @Input() todoList: TodoListModel;
    showAddTodo: boolean;

    constructor() {
        this.showAddTodo = true;
    }

    onRemoveActiveItem(index: number) {
        this.todoList.active.splice(index, 1);
        this.checkAddTodoState();
    }

    onChangeActiveItem(index: number) {
        this.todoList.completed.push(this.todoList.active[index]);
        this.onRemoveActiveItem(index);
        this.checkAddTodoState();
    }

    onAddActiveItem() {
        this.todoList.active.push('');
        this.checkAddTodoState();
    }

    onTextType(event, index: number) {
        this.todoList.active[index] = event.target.value;
        this.checkAddTodoState();
    }

    checkAddTodoState() {
        if (!!this.todoList.active[this.todoList.active.length - 1]) {
            this.showAddTodo = true;
        } else {
            this.showAddTodo = false;
        }
    }

    onChangeCompletedItem(index: number) {
        this.todoList.active.push(this.todoList.completed[index]);
        this.todoList.completed.splice(index, 1);
        this.checkAddTodoState();
    }
}