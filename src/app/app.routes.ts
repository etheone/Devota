import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { DataComponent } from './data/data.component';
import { GroupsComponent } from './groups/groups.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/auth.guard';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent

  },
  { 
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'data',
    component: DataComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

/*const ROUTES = [
  {
    path: '',
    component: LoginComponent

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
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

]*/