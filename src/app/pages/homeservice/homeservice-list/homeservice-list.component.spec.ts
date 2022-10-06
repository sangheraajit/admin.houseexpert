import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeserviceListComponent } from './homeservice-list.component';

describe('HomeserviceListComponent', () => {
  let component: HomeserviceListComponent;
  let fixture: ComponentFixture<HomeserviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeserviceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
