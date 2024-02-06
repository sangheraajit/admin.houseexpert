import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticalMasterListComponent } from './artical-master-list.component';

describe('ArticalMasterListComponent', () => {
  let component: ArticalMasterListComponent;
  let fixture: ComponentFixture<ArticalMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticalMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticalMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
