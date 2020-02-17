import { RoleMap } from "../model/roleMap";
const { Pool } = require("pg");
// tslint:disable-next-line: typedef
const connectionString = require("./common/dbConfig");
// tslint:disable-next-line: typedef
const pool = new Pool(connectionString);

class RoleAuthorizationRepo {
    // tslint:disable-next-line: no-empty
    constructor() {
    }

    /**
     * getRoles
     */
    public async getRoles(): Promise<any> {
        let client: any;
        try {
            client = await pool.connect();
            // tslint:disable-next-line: typedef
            return await client.query("select roleid, rolename from roles order by rolename");
        } catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    }

    /**
     * getActions
     */
    public async getActions(): Promise<any> {
        let client: any;
        try {
            client = await pool.connect();
            // tslint:disable-next-line: typedef
            const query = "select actionid, actionname from actions order by actionname";
            // tslint:disable-next-line: typedef
            return await client.query(query);
        } catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    }

    /**
     * getActions
     */
    public async getAccessLevels(): Promise<any> {
        let client: any;
        try {
            client = await pool.connect();
            // tslint:disable-next-line: typedef
            const query = "select constantsname, constantsvalue from constants where constantstype = 'Program Access Level'";
            // tslint:disable-next-line: typedef
            return await client.query(query);
        } catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    }

    public async getRoleActionMapping(roleMap: RoleMap): Promise<any> {
        let client: any;
        let text: string;

        try {
            client = await pool.connect();

            text = `select
                        a.actionid,
                        a.actionname,
                        a.description,
                        a.isdatalevel,
                        ra.roleactionmappingid,
                        c.constantsname as accesslevel
                    from
                        actions a
                        left join
                        roleactionmapping ra
                        on ra.actionid = a.actionid
                        and ra.roleid = $1
                        left join constants c
                        on c.constantsvalue = cast(COALESCE(a.isdatalevel,'0') as int)
                    where
                        a.status = B'1'
                        and c.constantstype = 'Program Access Level'
                        and a.actionid = ANY ($2)`;

            if (roleMap.roleActionMapCheck !== "0") {
                if (roleMap.roleActionMapCheck === "1") {
                    text = text + " and ra.roleactionmappingid is not null";
                } else if (roleMap.roleActionMapCheck === "2") {
                    text = text + " and ra.roleactionmappingid is null";
                }
            }

            text = text + " order by a.actionname"

            // tslint:disable-next-line: typedef
            const query = {
                text: text, values: [roleMap.roleId, roleMap.actionList]
            };
            // tslint:disable-next-line: typedef
            return await client.query(query);
        } catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    }
}

module.exports = RoleAuthorizationRepo;