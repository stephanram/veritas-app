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
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [RoleAuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
