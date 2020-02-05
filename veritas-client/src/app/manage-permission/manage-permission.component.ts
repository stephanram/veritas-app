import { Component, OnInit } from '@angular/core';
import { RoleAuthorizationService } from '../role-authorization.service';

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

  dtOptions: DataTables.Settings = {};
 
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

    // datatable settings
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  ngOnInit() {

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
      });
  }


}
