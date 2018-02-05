import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { JwtModule} from '@auth0/angular-jwt';  
import { AceEditorComponent } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { DataComponent } from './data/data.component';
import { IdeComponent } from './ide/ide.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

//import { AuthGuard } from './common/auth.guard';
import { routes } from './app.routes';
import { DeviceOrderByPipe } from './order-by.pipe';
import { FilterPipe } from './filter.pipe';
import { UniquePipe } from './unique.pipe';
import { GuidesComponent } from './guides/guides.component';


@NgModule({
  declarations: [
    AppComponent,
    AceEditorComponent,
    DashboardComponent,
    DevicesComponent,
    DataComponent,
    IdeComponent,
    PageNotFoundComponent,
    LoginComponent,
    DeviceOrderByPipe,
    FilterPipe,
    UniquePipe,
    GuidesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['http://localhost:4200']
      }
    })
  ],
  providers: [
    //AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
