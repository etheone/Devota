import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { AceEditorComponent } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { DataComponent } from './data/data.component';
import { IdeComponent } from './ide/ide.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './common/auth.guard';
import { routes } from './app.routes';
import { DeviceOrderByPipe } from './order-by.pipe';
import { FilterPipe } from './filter.pipe';
import { UniquePipe } from './unique.pipe';
import { GuidesComponent } from './guides/guides.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

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
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
