import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TopBannerComponent } from './top-banner/top-banner.component';
import { ManagePermissionComponent } from './manage-permission/manage-permission.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopBannerComponent,
    ManagePermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
