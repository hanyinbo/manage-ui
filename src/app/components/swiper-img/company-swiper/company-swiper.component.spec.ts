import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySwiperComponent } from './company-swiper.component';

describe('CompanySwiperComponent', () => {
  let component: CompanySwiperComponent;
  let fixture: ComponentFixture<CompanySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
