import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateResumeComponent } from './job-create-resume/create-resume.component';
import { Template1Component } from './template1/template1.component';
import { Template1CreateComponent } from './template1/template1-create/template1-create.component';
import { Template2Component } from './template2/template2.component';
import { Template2CreateComponent } from './template2/template2-create/template2-create.component';
import { Template3Component } from './template3/template3.component';
import { Template3CreateComponent } from './template3/template3-create/template3-create.component';
import { Template4Component } from './template4/template4.component';
import { Template4CreateComponent } from './template4/template4-create/template4-create.component';
import { Template5Component } from './template5/template5.component';
import { Template5CreateComponent } from './template5/template5-create/template5-create.component';
import { Template6Component } from './template6/template6.component';
import { Template6CreateComponent } from './template6/template6-create/template6-create.component';


const routes: Routes = [
  { path: 'create-resume', component: CreateResumeComponent },
  { path: 'template1-view/:id', component: Template1Component },
  { path: 'template1-create', component: Template1CreateComponent },
  { path: 'template2-view/:id', component: Template2Component },
  { path: 'template2-create', component: Template2CreateComponent },
  { path: 'template3-view/:id', component: Template3Component },
  { path: 'template3-create', component: Template3CreateComponent },
  { path: 'template4-view/:id', component: Template4Component },
  { path: 'template4-create', component: Template4CreateComponent },
  { path: 'template5-view/:id', component: Template5Component },
  { path: 'template5-create', component: Template5CreateComponent },
  { path: 'template6-view/:id', component: Template6Component },
  { path: 'template6-create', component: Template6CreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobTemplatesRoutingModule { }
