import { Controller, Get, Service, Post, BodyParams } from "@tsed/common";
import { roleMap } from "../model/roleMap";
const roleAuthService = require('../services/roleAuthorizationService');
const service = new roleAuthService();


@Controller("/roleAuthorization")
export class roleAuthorizationController {
  @Get("/getRoles")
  async getRoles() {
    try {
      var result = await service.getRoles();
      return result;
    }
    catch (err) {
      return err.message;
    }
  }

  @Get("/getActions")
  async getActions() {
    try {
      var result = await service.getActions();
      return result;
    }
    catch (err) {
      return err.message;
    }
  }

  @Post("/getRoleActionMapping")
  async getRoleActionMapping(@BodyParams() roleMapModel: roleMap) {
    try {
      let result = await service.getRoleActionMapping(roleMapModel);
      return result;
    }
    catch (err) {
      return err.message;
    }
  }

}