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

    public async getRoleActionMapping() {
        let client: any;
        try {
            client = await pool.connect();
            const query = 'select r.roleid, r.rolename, a.actionid, a.actionname, a.isdatalevel from roleactionmapping ra (nolock), roles r,actions a  where ra.roleid = r.roleid and ra.actionid = a.actionid and r.isactive = B\'1\'';
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