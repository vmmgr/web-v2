import {Component, OnInit} from '@angular/core';
import {VmService} from "../service/vm.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private VMService: VmService,
  ) {
  }

  ngOnInit(): void {
    this.getUserVM();
    setInterval(() => {
        this.getUserVM()
      }
      , 60000);
  }

  public vms: VMData[] = new Array();

  getUserVM(): void {
    this.vms = [];
    this.VMService.getUserVM()
      .then((d) => {
        for (let i = 0; i < Object.keys(d).length; i++) {
          let net = d[i].net.split(",");
          console.log(d[i])
          this.vms.push({
            nodeid: d[i].nodeid,
            id: d[i].id,
            name: d[i].name,
            cpu: d[i].cpu,
            mem: d[i].mem,
            net: net[1],
            status: d[i].status,
            url: {console: d[i].vncurl},
          })
        }
      });
  }


}

interface VMData {
  nodeid: string;
  id: string;
  name: string;
  cpu: string;
  mem: string;
  net: string;
  status: string;
  url: URL;
}

interface URL {
  console: string;
}
