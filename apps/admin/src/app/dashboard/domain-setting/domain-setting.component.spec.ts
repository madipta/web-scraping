import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainSettingComponent } from './domain-setting.component';

describe('DomainSettingComponent', () => {
  let component: DomainSettingComponent;
  let fixture: ComponentFixture<DomainSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
