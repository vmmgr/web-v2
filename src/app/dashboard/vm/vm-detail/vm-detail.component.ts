import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {VmService} from "../../service/vm.service";


@Component({
  selector: 'app-vm-detail',
  templateUrl: './vm-detail.component.html',
  styleUrls: ['./vm-detail.component.scss']
})
export class VmDetailComponent implements OnInit {

  public status: number = 0;
  private id: number = +this.route.snapshot.paramMap.get('id');
  public vmdata: VMData;
  public netdata: NetData[] = new Array();
  public storagedata: StorageData[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private vmService: VmService,
  ) {
  }

  ngOnInit(): void {
    this.vmService.getVM(this.id).then((d) => {
      let data = d.name.split('-');
      let netdata = d.net.split(',');
      let tmp1: string, tmp2: string = '';
      //Storage #1 Issue
      // for (let i = 0; i < storage.length; i++) {
      //
      // }
      //Net
      //1,br1101,52:54:01:5a:88:64
      for (let i = 1; i < netdata.length; i++) {
        if (i % 2 == 1) {
          tmp1 = netdata[i];
        } else {
          this.netdata.push({type: netdata[0], mac: netdata[i], name: tmp1});
        }
      }
      this.vmdata = {
        nodeid: d.nodeid,
        id: d.id,
        groupid: data[0],
        optionid: data[1],
        name: data[2],
        cpu: d.cpu,
        mem: d.mem,
        vncurl: d.vncurl,
        status: d.status,
        autostart: d.autostart,
      }
    });
  }

  start(): void {
    this.vmService.startVM(this.id);
  }

  stop(): void {
    this.vmService.stopVM(this.id);
  }

  shutdown(): void {
    this.vmService.shutdownVM(this.id);
  }

  reset(): void {
    this.vmService.resetVM(this.id);
  }

  pause(): void {
    this.vmService.pauseVM(this.id);
  }

  resume(): void {
    this.vmService.resumeVM(this.id);
  }

  delete(): void {
    this.vmService.deleteVM(this.id);
  }

  goBack(): void {
    this.location.back();
  }

}

interface VMData {
  nodeid: string;
  id: string;
  groupid: number;
  optionid: number;
  name: string;
  cpu: string;
  mem: string;
  vncurl: string;
  status: number;
  autostart: boolean;
}

interface NetData {
  type: number;
  name: string;
  mac: string;
}

interface StorageData {
  type: number;
  id: number;
  name:string;
  capacity: number;
}
