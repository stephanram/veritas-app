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
            const result = await client.query('select roleid, rolename from roles order by rolename');
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
            const query = 'select actionid, actionname from actions order by actionname'
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
        let text: string;

        try {
            client = await pool.connect();

            text = `select
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
                        and ra.roleid = $1
                    where
                        a.status = B'1' 
                        and a.actionid = ANY ($2)`;

            if (roleMap.roleActionMapCheck !== '0') {
                if (roleMap.roleActionMapCheck == '1') {
                    text = text + ' and ra.roleactionmappingid is not null';
                }
                else if (roleMap.roleActionMapCheck == '2') {
                    text = text + ' and ra.roleactionmappingid is null';
                }
            }

            text = text + ' order by a.actionname'

            const query = {
                text: text, values: [roleMap.roleId, roleMap.actionList]
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