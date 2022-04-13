import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitSettingComponent } from './recruit-setting.component';

describe('RecruitSettingComponent', () => {
  let component: RecruitSettingComponent;
  let fixture: ComponentFixture<RecruitSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
