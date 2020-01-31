import { roleMap } from "../model/roleMap";
const roleAuthRepo = require('../dataAccess/roleAuthorizationRepo');
const dataAccess = new roleAuthRepo();

class roleAuthorizationService {
    public async getRoles() {
        try {
            var result =  await dataAccess.getRoles();
            var records = result.rows.reduce((list, item)=>{
                list.push({
                    name: item.rolename,
                    value: item.roleid
                })
                return list;
            }, []);
            return records;

        } catch (error) {
            console.log(error);
        }
    }

    public async getActions() {
        try {
            var result =  await dataAccess.getActions();
            var records = result.rows.reduce((list, item)=>{
                list.push({
                    name: item.actionname,
                    value: item.actionid
                })
                return list;
            }, []);
            return records;

        } catch (error) {
            console.log(error);
        }
    }

    public async getRoleActionMapping(roleMap: roleMap) {
        try {
            var result =  await dataAccess.getRoleActionMapping(roleMap);
            var records = result.rows.reduce((list, item)=>{
                list.push(item);
                return list;
            }, []);
            return records;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = roleAuthorizationService;