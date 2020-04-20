import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmDetailComponent } from './vm-detail.component';

describe('VmDetailComponent', () => {
  let component: VmDetailComponent;
  let fixture: ComponentFixture<VmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
