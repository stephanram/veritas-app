import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.css']
})
export class ManagePermissionComponent implements OnInit {
  source: Array<string>;
  constructor() { }

  ngOnInit() {
    this.source = ['Kavya1', 'Azar', 'Stanley'];
  }

  


}
