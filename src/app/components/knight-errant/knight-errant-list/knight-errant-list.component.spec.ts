import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnightErrantListComponent } from './knight-errant-list.component';

describe('KnightErrantListComponent', () => {
  let component: KnightErrantListComponent;
  let fixture: ComponentFixture<KnightErrantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnightErrantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnightErrantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
