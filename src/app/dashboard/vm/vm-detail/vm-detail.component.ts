import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {VmService} from "../../service/vm.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {VMCreateDialog} from "../vm-create/vm-create.component";


@Component({
  selector: 'app-vm-detail',
  templateUrl: './vm-detail.component.html',
  styleUrls: ['./vm-detail.component.scss']
})
export class VmDetailComponent implements OnInit {

  // public status: number = 0;
  private id: number;
  public vmdata: VMData;
  public netdata: NetData[] = new Array();
  public storagedata: StorageData[];
  private timer: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private vmService: VmService,
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')
    this.getData();
    this.timer = setInterval(() => {
        this.vmService.getVM(this.id)
          .then((d) => {
            this.vmdata.status = d.status;
          })
      }
      , 5000);
  }


  getVMStatus(): void {
    this.vmService.getVM(this.id).then((d) => {
      this.vmdata.status = d.status;
    });
  }

  getData(): void {
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
    this.getVMStatus();
  }

  stop(): void {
    this.vmService.stopVM(this.id);
    this.getVMStatus();
  }

  shutdown(): void {
    this.vmService.shutdownVM(this.id);
    this.getVMStatus();
  }

  reset(): void {
    this.vmService.resetVM(this.id);
    this.getVMStatus();
  }

  pause(): void {
    this.vmService.pauseVM(this.id);
    this.getVMStatus();
  }

  resume(): void {
    this.vmService.resumeVM(this.id);
    this.getVMStatus();
  }

  delete(): void {
    const dialogRef = this.dialog.open(VMDeleteDialog, {
      width: '250px',
      data: {
        id: this.id,
        disabled: true,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      clearInterval(this.timer);
      this.router.navigate(['/dashboard/list']);
    });
  }

  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'vm-delete-dialog',
  templateUrl: 'vm-delete-dialog.html',
})
export class VMDeleteDialog {

  constructor(
    private vmService: VmService,
    public dialogRef: MatDialogRef<VMDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  delete(): void {
    this.vmService.deleteVM(this.data.id);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
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
  name: string;
  capacity: number;
}
