import apiCallWrapper from "./axios.apis";
import type { IbDR, ObDR } from "../interfaces/index.interface";
import type { APIsSCs } from "../types/apis.types";


const userApis = {
    update: apiCallWrapper<ObDR.User.Update, IbDR.User.Update, APIsSCs.User.Update>(
        "PATCH", "/user/"
    ),
};

export default userApis;
