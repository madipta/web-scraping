import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainRegisterComponent } from './domain-register.component';

describe('DomainRegisterComponent', () => {
  let component: DomainRegisterComponent;
  let fixture: ComponentFixture<DomainRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
