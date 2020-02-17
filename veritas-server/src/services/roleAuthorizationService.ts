import { RoleMap } from "../model/roleMap";
const roleAuthRepo: any = require("../dataAccess/roleAuthorizationRepo");
const dataAccess: any = new roleAuthRepo();

class RoleAuthorizationService {
    public async getRoles(): Promise<any> {
        try {
            // tslint:disable-next-line: typedef
            const result =  await dataAccess.getRoles();
            // tslint:disable-next-line: typedef
            var records = result.rows.reduce((list, item)=>{
                list.push({
                    name: item.rolename,
                    value: item.roleid
                });
                return list;
            }, []);
            return records;

        } catch (error) {
            console.log(error);
        }
    }

    public async getActions(): Promise<any> {
        try {
            // tslint:disable-next-line: typedef
            const result =  await dataAccess.getActions();
            // tslint:disable-next-line: typedef
            const records = result.rows.reduce((list, item)=>{
                list.push({
                    name: item.actionname,
                    value: item.actionid
                });
                return list;
            }, []);
            return records;

        } catch (error) {
            console.log(error);
        }
    }

    public async getAccessLevels(): Promise<any> {
        try {
            // tslint:disable-next-line: typedef
            const result =  await dataAccess.getAccessLevels();
            // tslint:disable-next-line: typedef
            const records = result.rows.reduce((list, item)=>{
                list.push({
                    name: item.constantsname,
                    value: item.constantsvalue
                });
                return list;
            }, []);
            return records;

        } catch (error) {
            console.log(error);
        }
    }

    public async getRoleActionMapping(roleMap: RoleMap): Promise<any> {
        try {
            // tslint:disable-next-line: typedef
            const result =  await dataAccess.getRoleActionMapping(roleMap);
            // tslint:disable-next-line: typedef
            const records = result.rows.reduce((list, item)=>{
                list.push(item);
                return list;
            }, []);
            return records;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = RoleAuthorizationService;