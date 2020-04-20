import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpecService} from "../../service/spec.service";
import {ImageService} from "../../service/image.service";
import {NodeService} from "../../service/node.service";
import {GroupService} from "../../service/group.service";
import {VmService} from "../../service/vm.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vm-create',
  templateUrl: './vm-create.component.html',
  styleUrls: ['./vm-create.component.scss']
})
export class VmCreateComponent implements OnInit {
  isLinear = false;
  nodeFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  groupFormGroup: FormGroup;
  cpuFormGroup: FormGroup;
  memoryFormGroup: FormGroup;
  storageTypeFormGroup: FormGroup;
  storageSizeFormGroup: FormGroup;
  imageFormGroup: FormGroup;


  public groups: GroupDataStruct[];
  public nodes: NodeDataStruct[];
  public images: ImageDataStruct[];
  public cpus: CPUDataStruct[];
  public memorys: MemoryDataStruct[];
  public storages: StorageDataStruct[];
  public storageSizes: StorageSizeDataStruct[];


  constructor(
    private _formBuilder: FormBuilder,
    private location: Location,
    private specService: SpecService,
    private imageService: ImageService,
    private nodeService: NodeService,
    private groupService: GroupService,
    private vmService: VmService,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getSpec();
    this.getNode();
    this.getImage();
    this.getGroup();
  }

  initForm(): void {
    this.nodeFormGroup = this._formBuilder.group({
      node: ['', Validators.required],
    });
    this.nameFormGroup = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.groupFormGroup = this._formBuilder.group({
      group: ['', Validators.required],
    });
    this.cpuFormGroup = this._formBuilder.group({
      cpu: ['', Validators.required]
    });
    this.memoryFormGroup = this._formBuilder.group({
      memory: ['', Validators.required]
    });
    this.storageTypeFormGroup = this._formBuilder.group({
      storagetype: ['', Validators.required]
    });
    this.storageSizeFormGroup = this._formBuilder.group({
      storagesize: ['', Validators.required]
    });
    this.imageFormGroup = this._formBuilder.group({
      image: ['', Validators.required]
    });
  }

  getNode(): void {
    this.nodeService.getNode()
      .then((d) => this.nodes = d);
  }

  getGroup(): void {
    this.groupService.getGroup()
      .then((d) => this.groups = d);
  }

  getImage(): void {
    this.imageService.getImage()
      .then((d) => this.images = d);
  }

  getSpec(): void {
    this.specService.getCPU()
      .then((cpu) => this.cpus = cpu);
    this.specService.getMemory()
      .then((memory) => this.memorys = memory);
    this.specService.getStorage()
      .then((storage) => this.storages = storage);
    this.specService.getStorageSize()
      .then((storagesize) => this.storageSizes = storagesize);
  }

  create(): void {
    const image = this.imageFormGroup.value['image'].split(':');

    const data = {
      nodeid: parseInt(this.nodeFormGroup.value['node'], 10),
      vmname: this.nameFormGroup.value['name'],
      group: this.groupFormGroup.value['group'],
      cpu: parseInt(this.cpuFormGroup.value['cpu'], 10),
      mem: parseInt(this.memoryFormGroup.value['memory'], 10),
      storagetype: parseInt(this.storageTypeFormGroup.value['storagetype'], 10),
      storage: parseInt(this.storageSizeFormGroup.value['storagesize'], 10),
      autostart: 1,
      imagename: image[0],
      imagetype: image[1]
    }

    let disabled: boolean = true;
    let result: string = '';

    if (isNaN(data.nodeid) || isNaN(data.cpu) || isNaN(data.mem) || isNaN(data.storagetype) || isNaN(data.storage)) {
      disabled = false;
      result = '入力データに不備があります。'
    }

    if (data.vmname == '' || data.group == '' || data.imagename == '' || data.imagetype == '') {
      disabled = false;
      result = '入力データに不備があります。'
    }

    const dialogRef = this.dialog.open(VMCreateDialog, {
      width: '250px',
      data: {
        data: data,
        disabled: disabled,
        result: result,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/dashboard/list']);
    });
  }

  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'vm-create-dialog',
  templateUrl: 'vm-create-dialog.html',
  styleUrls: ['vm-create-dialog.scss']
})
export class VMCreateDialog {

  constructor(
    private vmService: VmService,
    public dialogRef: MatDialogRef<VMCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }


  create(): void {
    this.vmService.createVM(this.data.data);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

interface ImageDataStruct {
  name: string;
  tag: string;
}

interface GroupDataStruct {
  name: string;
}

interface NodeDataStruct {
  id: string;
  hostname: string;
}

interface CPUDataStruct {
  spec: number;
}

interface MemoryDataStruct {
  size: number;
}

interface StorageDataStruct {
  type: string;
  name: string;
}

interface StorageSizeDataStruct {
  size: number;
}
