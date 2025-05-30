import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorratemstListComponent } from './floorratemst-list.component';

describe('FloorratemstListComponent', () => {
  let component: FloorratemstListComponent;
  let fixture: ComponentFixture<FloorratemstListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorratemstListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorratemstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
