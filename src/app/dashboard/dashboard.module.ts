import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {VmComponent} from "./vm/vm.component";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "../app-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {DashboardComponent} from './dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { NoticeComponent } from './notice/notice.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSliderModule} from "@angular/material/slider";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    VmComponent,
    DashboardComponent,
    NoticeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
  ],
  exports: [
    VmComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
    // MatSidenavModule,
  ]
})
export class DashboardModule {
}
