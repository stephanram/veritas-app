import { roleMap } from "../model/roleMap";
const { Pool } = require('pg');
const connectionString = require('./common/dbConfig');
const pool = new Pool(connectionString);

class roleAuthorizationRepo {
    constructor() {

    }

    /**
     * getRoles
     */
    public async getRoles() {
        let client: any;
        try {
            client = await pool.connect();
            const result = await client.query('select roleid, rolename from roles');
            return result;
        }
        catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    }

    /**
     * getActions
     */
    public async getActions() {
        let client: any;
        try {
            client = await pool.connect();
            const query = 'select actionid, actionname from actions'
            const result = await client.query(query);
            return result;
        }
        catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    }

    public async getRoleActionMapping(roleMap: roleMap) {
        let client: any;
        try {
            client = await pool.connect();
            const query = {
                text: `select
                                a.actionid,
                                a.actionname,
                                a.description,
                                a.isdatalevel,
                                ra.roleactionmappingid 
                            from
                                actions a 
                                left join
                                roleactionmapping ra 
                                on ra.actionid = a.actionid
                            where
                                a.status = B'1' 
                                and ra.roleid = $1
                                and a.actionid = ANY ($2)
                            order by
                                a.actionname`, values: [roleMap.roleId, roleMap.actionList]
            }
            const result = await client.query(query);
            return result;
        }
        catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    }
}

module.exports = roleAuthorizationRepo;