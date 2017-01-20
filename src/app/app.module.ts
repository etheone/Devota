import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { DataComponent } from './data/data.component';
import { GroupsComponent } from './groups/groups.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'

  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
    {
    path: 'devices',
    component: DevicesComponent
  },
    {
    path: 'data',
    component: DataComponent
  },
    {
    path: 'groups',
    component: GroupsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DevicesComponent,
    DataComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
