import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainUpdateComponent } from './domain-update.component';

describe('DomainUpdateComponent', () => {
  let component: DomainUpdateComponent;
  let fixture: ComponentFixture<DomainUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
