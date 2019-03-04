import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = [];
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(addTodo: {value: string}) {
    if (addTodo && addTodo.value) {
      const newItem = {
        item: addTodo.value,
        isEditable: false
      };

      this.todoService.addTodo(newItem).subscribe( todos => {
        this.todos = todos;
        addTodo.value = '';
      });
    }
  }

  deleteTodo(deleteItem: {item: 'c', isEditable: false}) {
    if (deleteItem) {
      this.todoService.deleteTodo(deleteItem).subscribe( todos => {
        this.todos = todos;
      });
    }
  }

  editTodo(editItem = { isEditable: false}) {
      editItem.isEditable = true;
  }

  saveUpdatedTodo(event, todoItem, currEle ) {
     if (event && event.key === 'Enter') {
        this.saveNewItem(todoItem, currEle);
     }
  }

  saveNewItem(currentItem, CurrElem) {
    if (CurrElem && CurrElem.value) {
      const updatedItem = {
        item: CurrElem.value,
        isEditable: false
      };
      this.todoService.updateTodo(currentItem, updatedItem).subscribe( todos => {
        this.todos = todos;
      });
    }
  }
}
