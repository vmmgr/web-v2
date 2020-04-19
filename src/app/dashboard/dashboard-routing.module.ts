import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {NoticeComponent} from "./notice/notice.component";
import {VmComponent} from "./vm/vm.component";


const routes: Routes = [
  // {path: 'vm',component: VmComponent},
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'notice', pathMatch: 'full'},
      {path: 'notice', component: NoticeComponent},
      {path: 'vm', component: VmComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
