import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleAuthorizationService } from '../role-authorization.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.css']
})
export class ManagePermissionComponent implements OnInit {
  roleList: Array<object>;
  actionList: Array<object>;
  selectedRoleId: string;
  selectedActions: Array<string>;
  roleActionMappingList: Array<object>;
  roleService: RoleAuthorizationService;
  roleActionMapCheck: string;
  dataSource: any;

  // table configuration
  displayedColumns: string[] = ['actionname', 'description', 'isdatalevel', 'isRoleMapped'];
  @ViewChild(MatPaginatorModule, {static: true}) paginator: MatPaginatorModule;

  constructor(roleService: RoleAuthorizationService) {
    // Get Roles
    this.roleService = roleService;

    this.roleService.getRoles().subscribe((data: Array<object>) => {
      this.roleList = data;
    });

    // Get Actions
    this.roleService.getActions().subscribe((data: Array<object>) => {
      this.actionList = data;
    });

  }

  ngOnInit() {
    // Initializing paginator
    this.dataSource.paginator = this.paginator;
  }

  public getRoleActionMapping() {
    this.roleService.getRoleActionMapping
      (this.selectedActions,
        this.selectedRoleId,
        this.roleActionMapCheck)
      .subscribe((data: Array<object>) => {
        this.roleActionMappingList = data.map((item: any) => {
          return {
            actionid: item.actionid,
            actionname: item.actionname,
            description: item.description,
            isdatalevel: item.isdatalevel,
            roleactionmappingid: item.roleactionmappingid,
            isRoleMapped: Number.isInteger(item.roleactionmappingid) ? true : false
          };
        });
        this.dataSource = new MatTableDataSource(this.roleActionMappingList);
      });
  }
}
