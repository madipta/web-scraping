import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUpdateComponent } from './link-update.component';

describe('LinkUpdateComponent', () => {
  let component: LinkUpdateComponent;
  let fixture: ComponentFixture<LinkUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
