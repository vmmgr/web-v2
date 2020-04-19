import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmCreateComponent } from './vm-create.component';

describe('VmCreateComponent', () => {
  let component: VmCreateComponent;
  let fixture: ComponentFixture<VmCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
