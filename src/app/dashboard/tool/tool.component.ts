import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  hide = false;
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
