import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkScrapComponent } from './link-scrap.component';

describe('LinkScrapComponent', () => {
  let component: LinkScrapComponent;
  let fixture: ComponentFixture<LinkScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkScrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
