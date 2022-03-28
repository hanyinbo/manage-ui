import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnightErrantSettingsComponent } from './knight-errant-settings.component';

describe('KnightErrantSettingsComponent', () => {
  let component: KnightErrantSettingsComponent;
  let fixture: ComponentFixture<KnightErrantSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnightErrantSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnightErrantSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
