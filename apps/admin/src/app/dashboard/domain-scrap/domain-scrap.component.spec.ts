import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainScrapComponent } from './domain-scrap.component';

describe('DomainScrapComponent', () => {
  let component: DomainScrapComponent;
  let fixture: ComponentFixture<DomainScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainScrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
