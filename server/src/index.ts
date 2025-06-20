import "./config/env";

import { startServer } from "./server";
import { connectToDatabase } from "./database/db";

(async () => {
    await connectToDatabase();

    await startServer();
})();

