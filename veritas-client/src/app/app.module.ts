import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TopBannerComponent } from './top-banner/top-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { ManagePermissionComponent } from './manage-permission/manage-permission.component';
import { RoleAuthorizationService } from './role-authorization.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopBannerComponent,
    ManagePermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RoleAuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
