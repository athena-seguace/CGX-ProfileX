import axios from "axios";
import type { IResponse } from "../interfaces/index.interface";
import { APIsSCsEnum } from "../types/apis.types";

/**
 * Hardcoding the api base url.
 * Reason: Not able to understand how vite + docker handles env variable.
 */
const API_BASE_URL = "http://localhost:5500/api/v1";

const axiosInstance = axios.create({
    validateStatus: () => true,
    withCredentials: true,
    timeout: 3000,
    baseURL: API_BASE_URL,
});

const defaultAPICaller = async <ObDI, IbDI, APIsSCs>(
    method: "GET" | "POST" | "PATCH" | "DELETE",
    url: string,
    data: ObDI,
): Promise<IResponse<IbDI, APIsSCs>> => {
    try {
        let response = await axiosInstance({
            method,
            url,
            ...(method !== "GET" ? { data } : {}),
        });

        return {
            ...response.data,
            statusCode: response.status,
        } as unknown as IResponse<IbDI, APIsSCs>;
    } catch (error) {
        return {
            action: null,
            statusCode: APIsSCsEnum.SERVER_ERROR as APIsSCs,
        }
    }
}

const apiCallWrapper = <ObDI, IbDI, APIsSCs>(method: "GET" | "POST" | "PATCH" | "DELETE", url: string) => {
    return async (data: ObDI): Promise<IResponse<IbDI, APIsSCs>> => {
        return await defaultAPICaller<ObDI, IbDI, APIsSCs>(method, url, data);
    };
};

export default apiCallWrapper;
