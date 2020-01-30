import { Controller, Get, Service } from "@tsed/common";
const roleAuthService = require('../services/roleAuthorizationService');
const service = new roleAuthService();

@Controller("/roleAuthorization")
export class roleAuthorizationController {
  @Get("/getRoles")
  async getRoles(): Promise<any> {
    try {
      var result = await service.getRoles();
      return result;
    }
    catch (err) {
      return err.message;
    }
  }

  @Get("/getActions")
  async getActions(): Promise<any> {
    try {
      var result = await service.getActions();
      return result;
    }
    catch (err) {
      return err.message;
    }
  }

  @Get("/getRoleActionMapping")
  async getRoleActionMapping(): Promise<any> {
    try {
      var result = await service.getRoleActionMapping();
      return result;
    }
    catch (err) {
      return err.message;
    }
  }

}