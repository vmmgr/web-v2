import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vm-create',
  templateUrl: './vm-create.component.html',
  styleUrls: ['./vm-create.component.scss']
})
export class VmCreateComponent implements OnInit {
  isLinear = false;
  nodeFormGroup: FormGroup;
  nameFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.nodeFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.nameFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  goBack(): void {
    this.location.back();
  }

}
