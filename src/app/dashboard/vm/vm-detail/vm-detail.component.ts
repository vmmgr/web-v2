import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-vm-detail',
  templateUrl: './vm-detail.component.html',
  styleUrls: ['./vm-detail.component.scss']
})
export class VmDetailComponent implements OnInit {

  public status: number = 0;

  constructor(
    private location: Location,
  ) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

}
