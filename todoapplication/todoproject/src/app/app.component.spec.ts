import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoComponent
      ],
    }).compileComponents();
  }));
});
