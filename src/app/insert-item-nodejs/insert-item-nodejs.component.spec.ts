import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertItemNodejsComponent } from './insert-item-nodejs.component';

describe('InsertItemNodejsComponent', () => {
  let component: InsertItemNodejsComponent;
  let fixture: ComponentFixture<InsertItemNodejsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertItemNodejsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertItemNodejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
