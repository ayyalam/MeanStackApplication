import { TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let todoService: TodoService;
  let spyGetTodo;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        TodoComponent
      ],
      providers: [
        TodoService
      ]
    });
    component = TestBed.createComponent(TodoComponent).componentInstance;
    todoService = TestBed.get(TodoService);
    spyGetTodo =  spyOn(todoService, 'getTodos').and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the todos to empty array', () => {
    component.ngOnInit();
    expect(spyGetTodo).toHaveBeenCalled();
    expect(component.todos).toBeDefined();
    expect(component.todos).toEqual([]);
  });
  describe('#addTodo', () => {
    let spyAddTodo;
    beforeEach(() => {
      spyAddTodo =  spyOn(todoService, 'addTodo').and.returnValue(of([
        {item: 'a', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false} ]));
      component.ngOnInit();
    });
    it('should add Item', () => {
      component.todos = [{item: 'a', isEditable: false},
        {item: 'b', isEditable: false}];
      component.addTodo({value: 'c'});
      expect(component.todos.length).toEqual(3);
      expect(spyAddTodo).toHaveBeenCalled();
      expect(spyAddTodo).toHaveBeenCalledWith({item: 'c', isEditable: false });
    });

    it('should not add Item', () => {
      component.addTodo(undefined);
      expect(spyAddTodo).not.toHaveBeenCalled();
      expect(component.todos.length).toEqual(0);
    });

    it('should not add Item', () => {
      component.addTodo({value: undefined});
      expect(spyAddTodo).not.toHaveBeenCalled();
      expect(component.todos.length).toEqual(0);
    });
  });

  describe('#deleteTodo', () => {
    let spyDeleteTodo;
    beforeEach(() => {
      spyDeleteTodo =  spyOn(todoService, 'deleteTodo').and.returnValue(of([
        {item: 'a', isEditable: false},
        {item: 'b', isEditable: false}]));
      component.ngOnInit();
    });
    it('should delete Item', () => {
      component.todos = [
        {item: 'a', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false} ];
      component.deleteTodo({item: 'c', isEditable: false });
      expect(component.todos.length).toEqual(2);
      expect(spyDeleteTodo).toHaveBeenCalled();
      expect(spyDeleteTodo).toHaveBeenCalledWith({item: 'c', isEditable: false});
    });

    it('should not delete Item', () => {
      component.todos = [
        {item: 'a', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false} ];
      component.deleteTodo(undefined);
      expect(spyDeleteTodo).not.toHaveBeenCalled();
      expect(component.todos.length).toEqual(3);
    });
  });

  describe('#EditTodo', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should set isEditable to true', () => {
      component.todos = [
        {item: 'a', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false} ];
      component.editTodo(component.todos[0]);
      expect(component.todos[0].isEditable).toEqual(true);
    });

    it('should not change isEditable to true', () => {
      component.todos = [
        {item: 'a', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false} ];
      component.editTodo(undefined);
      expect(component.todos).toEqual([
        {item: 'a', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false} ]);
    });
  });

  describe('#saveUpdatedTodo', () => {
    let spySaveUpdated;
    beforeEach(() => {
      component.ngOnInit();
      spySaveUpdated = spyOn(component, 'saveNewItem');
    });
    it('should call saveNewItem if enter key is pressed', () => {
      component.saveUpdatedTodo({key: 'Enter'}, 'todoItem', 'currEle');
      expect(spySaveUpdated).toHaveBeenCalled();
      expect(spySaveUpdated).toHaveBeenCalledWith( 'todoItem', 'currEle');
    });

    it('should call saveNewItem if undefined', () => {
      component.saveUpdatedTodo({key: 'Enter'}, undefined, undefined);
      expect(spySaveUpdated).toHaveBeenCalled();
      expect(spySaveUpdated).toHaveBeenCalledWith( undefined, undefined);
    });

    it('should not call saveNewItem if enter key is not pressed', () => {
      component.saveUpdatedTodo({key: 'ESC'}, undefined, undefined);
      expect(spySaveUpdated).not.toHaveBeenCalled();
    });

    it('should not call saveNewItem if enter key is undefined', () => {
      component.saveUpdatedTodo(undefined, undefined, undefined);
      expect(spySaveUpdated).not.toHaveBeenCalled();
    });
  });

  describe('#saveNewItem', () => {
    let spySaveUpdated;
    beforeEach(() => {
      component.ngOnInit();
      spySaveUpdated = spyOn(todoService, 'updateTodo').and.returnValue(of([{item: 'ab', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false}]));
    });
    it('should call updateTodo', () => {
      component.todos = [{item: 'ab', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false}];
      component.saveNewItem('sadnjk', {value: 'ab'});
      expect(spySaveUpdated).toHaveBeenCalled();
      expect(spySaveUpdated).toHaveBeenCalledWith('sadnjk' , {
            item: 'ab',
            isEditable: false
          });
      expect(component.todos[0].item).toEqual('ab');
    });

    it('should not call updateTodo with undefined param', () => {
      component.todos = [{item: 'ab', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false}];
      component.saveNewItem('sadnjk', undefined);
      expect(spySaveUpdated).not.toHaveBeenCalled();
      expect(component.todos).toEqual( [{item: 'ab', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false}]);
    });

    it('should not call updateTodo with value undefined', () => {
      component.todos = [{item: 'ab', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false}];
      component.saveNewItem('sadnjk', {value: undefined});
      expect(spySaveUpdated).not.toHaveBeenCalled();
      expect(component.todos).toEqual( [{item: 'ab', isEditable: false},
        {item: 'b', isEditable: false},
        {item: 'c', isEditable: false}]);
    });
  });
});
