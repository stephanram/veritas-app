import { Component, OnInit } from '@angular/core';
import { RoleAuthorizationService } from '../role-authorization.service';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.css']
})
export class ManagePermissionComponent implements OnInit {
  roleList: Array<string>;
  actionList: Array<string>;
  selectedRoleId: string;
  selectedActions: Array<string>;
  roleActionMappingList: Array<object>;
  roleService: RoleAuthorizationService;

  constructor(roleService: RoleAuthorizationService) {
    // Get Roles
    this.roleService = roleService;

    this.roleService.getRoles().subscribe((data: Array<string>) => {
      this.roleList = data;
    });

    // Get Actions
    this.roleService.getActions().subscribe((data: Array<string>) => {
      this.actionList = data;
    });



  }

  ngOnInit() {

  }

  public getRoleActionMapping(){
    this.roleService.getRoleActionMapping(this.selectedActions, this.selectedRoleId).subscribe((data: Array<object>) => {
      this.roleActionMappingList = data;
    });
  }


}
