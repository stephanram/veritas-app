import { Controller, Get, Service, Post, BodyParams } from "@tsed/common";
import { RoleMap } from "../model/roleMap";
const roleAuthService: any = require("../services/roleAuthorizationService");
const service: any = new roleAuthService();


@Controller("/roleAuthorization")
export class RoleAuthorizationController {
  @Get("/getRoles")
  async getRoles(): Promise<any> {
    try {
      // tslint:disable-next-line: typedef
      const result = await service.getRoles();
      return result;
    } catch (err) {
      return err.message;
    }
  }

  @Get("/getActions")
  async getActions(): Promise<any> {
    try {
      // tslint:disable-next-line: typedef
      const result = await service.getActions();
      return result;
    } catch (err) {
      return err.message;
    }
  }

  @Post("/getRoleActionMapping")
  async getRoleActionMapping(@BodyParams() roleMapModel: RoleMap): Promise<any> {
    try {
      // tslint:disable-next-line: typedef
      const result = await service.getRoleActionMapping(roleMapModel);
      return result;
    } catch (err) {
      return err.message;
    }
  }

  @Get("/getAccessLevels")
  async getAccessLevels(): Promise<any> {
    try {
      // tslint:disable-next-line: typedef
      const result = await service.getAccessLevels();
      return result;
    } catch (err) {
      return err.message;
    }
  }

}