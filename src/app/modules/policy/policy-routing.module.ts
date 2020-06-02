import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { PendingPolicyComponent } from './pending-policy/pending-policy.component';
import { PolicyComponent } from './policy/policy.component';


const routes: Routes = [
  { path: 'add-policy', component: AddPolicyComponent },
  { path: 'manage-policy', component: PendingPolicyComponent },
  { path: 'policy/:id', component: PolicyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
