import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleAuthorizationService } from '../role-authorization.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatOption, MatSelect } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.css']
})
export class ManagePermissionComponent implements OnInit {
  roleList: Array<object>;
  actionList: Array<object>;
  accessLevelList: Array<object>;
  selectedRoleId: string;
  selectedActions: Array<string>;
  roleActionMappingList: Array<object>;
  roleService: RoleAuthorizationService;
  roleActionMapCheck: string;
  dataSource: any;
  isAllActionSelected = false;

  // Grid controls
  roleMapChecboxFlag = false;
  accessLevelSelected: string;
  mapSelected: boolean;

  // table configuration
  displayedColumns: string[] = ['select', 'actionname', 'description', 'isdatalevel', 'isRoleMapped', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('actionSelect', { static: true }) actionSelect: MatSelect;

  // Grid checkbox
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Array<object>>(this.allowMultiSelect, this.initialSelection);

  // Grid configuration
  // isEdit = false;
  isAdd = false;
  isAddCompleted = false;

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

    // Get Access level
    this.roleService.getAccessLevels().subscribe((data: Array<object>) => {
      this.accessLevelList = data.map((item: any) => {
        const newItem = {
          name: item.name,
          value: item.value.toString()
        };
        return newItem;
      });
    });

  }

  ngOnInit() {
    this.gridInit([]);

    // tslint:disable-next-line: max-line-length
    this.selectedActions = ['0', '52', '3', '51', '2', '57', '69', '68', '67', '55', '41', '12', '19', '16', '61', '14', '71', '10', '21', '59', '22', '63', '50', '47', '6', '48', '53', '7', '4', '73', '5', '8', '72', '1', '36', '24', '28', '44', '25', '33', '39', '23', '42', '31', '29', '30', '32', '37', '35', '38', '43', '26', '27', '45', '34', '70', '56', '66', '65', '64', '49', '54', '40', '11', '18'];
    this.selectedRoleId = '1';
    this.roleActionMapCheck = '1';
    this.getRoleActionMapping();
  }

  public gridInit(result: object[]) {
    this.dataSource = new MatTableDataSource(result);
    // Initializing paginator
    this.dataSource.paginator = this.paginator;
    // sorting
    this.dataSource.sort = this.sort;
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
            isRoleMapped: Number.isInteger(item.roleactionmappingid) ? true : false,
            accesslevel: item.accesslevel,
            IsOnEditMode: false,
          };
        });
        this.gridInit(this.roleActionMappingList);
      });
  }

  public toggleActionSelect() {
    this.isAllActionSelected = !this.isAllActionSelected;

    if (this.isAllActionSelected) {
      this.actionSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.actionSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public customSort(a, b) {
    // tslint:disable-next-line: label-position
    let result = 0;
    if ((a) && (b)) {
      if (a.actionid > b.actionid) {
        result = 1;
      } else {
        result = -1;
      }
    }
    return result;
  }

  public onAdd(): void {
    this.isAdd = true;
    const newItem = {
      actionid: '',
      actionname: '',
      description: '',
      isdatalevel: '',
      roleactionmappingid: '',
      isRoleMapped: false
    };
    this.roleActionMappingList.push(newItem);
    this.roleActionMappingList.sort(this.customSort);
    this.gridInit(this.roleActionMappingList);
  }

  public onEdit(element: any): void {
    element.IsOnEditMode = true;
  }

  public onCancel(element: any): void {
    if (this.isAdd) {
      this.isAddCompleted = false;
      this.roleActionMappingList = this.removeAddedRow(this.roleActionMappingList);
      this.gridInit(this.roleActionMappingList);
    }

    this.isAdd = false;
    element.IsOnEditMode = false;
  }

  public onSave(element): void {
    console.log(element);
    console.log(element.isdatalevel);
    console.log(element.isRoleMapped);
   
    if (this.isAdd === true) {
      this.isAddCompleted = true;
    }

    this.isAdd = false;
    element.IsOnEditMode = false;
  }

  public removeAddedRow(list: Array<object>) {
    return list.filter((element: any) => {
      return element.actionid !== '';
    });
  }
}
