import {Component, OnInit} from '@angular/core';
import {NoticeService} from "../service/notice.service";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  constructor(
    private noticeService: NoticeService,
  ) {

  }

  public data: any;

  ngOnInit(): void {
    this.listNotify();
  }

  listNotify(): void {
    this.noticeService.listNotify()
      .then(d => this.data = d);
    console.log(this.data)
  }

}
