import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {NoticeComponent} from "./notice/notice.component";
import {ToolComponent} from "./tool/tool.component";
import {VmCreateComponent} from "./vm/vm-create/vm-create.component";
import {ListComponent} from "./list/list.component";
import {VmDetailComponent} from "./vm/vm-detail/vm-detail.component";


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'notice', pathMatch: 'full'},
      {path: 'notice', component: NoticeComponent},
      {path: 'vm/create', component: VmCreateComponent},
      {path: 'vm/:id', component: VmDetailComponent},
      {path: 'tool', component: ToolComponent},
      {path: 'list', component: ListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
