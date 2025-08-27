import { checkDatabaseConnectionStatus } from "../database/db";
import { verifySMTPConnection } from "../utils/sendEmail";
import { SECs, ServiceSignature } from "../types/index.types";
import { SDIn, SDOut } from "../interfaces/index.interface";


class MiscService {
    constructor() { }

    health: ServiceSignature<
        SDIn.Misc.Health,
        SDOut.Misc.Health,
        SECs.Misc.Health
    > = async () => {
        return {
            success: true,
            data: {
                serverStatus: "ACTIVE",
                databaseStatus:
                    await checkDatabaseConnectionStatus()
                        ? "CONNECTED"
                        : "DISCONNECTED",
                smtpStatus:
                    await verifySMTPConnection()
                        ? "CONNECTED"
                        : "DISCONNECTED",
            }
        }
    }
}

const miscService = new MiscService();

export default miscService;

