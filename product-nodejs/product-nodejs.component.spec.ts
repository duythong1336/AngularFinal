import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNodejsComponent } from './product-nodejs.component';

describe('ProductNodejsComponent', () => {
  let component: ProductNodejsComponent;
  let fixture: ComponentFixture<ProductNodejsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductNodejsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNodejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
