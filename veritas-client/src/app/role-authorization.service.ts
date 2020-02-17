import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthorizationService {

  public baseUrl = 'http://localhost:8080/rest';

  constructor(private http: HttpClient) { }

  /**
   * getGroups
   */
  public getRoles() {
    const signature = '/roleAuthorization/getRoles';
    try {
      return this.http.get(this.baseUrl + signature);
    } catch (error) {
    }
  }

  /**
   * getActions
   */
  public getActions() {
    const signature = '/roleAuthorization/getActions';
    try {
      return this.http.get(this.baseUrl + signature);
    } catch (error) {
    }
  }

  /**
   * getActions
   */
  public getAccessLevels() {
    const signature = '/roleAuthorization/getAccessLevels';
    try {
      return this.http.get(this.baseUrl + signature);
    } catch (error) {
    }
  }

  /**
   * getRoleActionMapping
   */
  public getRoleActionMapping(actionListModel: Array<string>, selectedRoleId: string, roleActionCheck: string) {
    const signature = '/roleAuthorization/getRoleActionMapping';
    const roleMap = {
      actionList: actionListModel,
      roleId: selectedRoleId,
      roleActionMapCheck: roleActionCheck,
    };
    try {
      return this.http.post(this.baseUrl + signature, roleMap);
    } catch (error) {
    }
  }

}
