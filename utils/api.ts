// ======================== USAGE ========================

import { Pagination } from "@/types/pagination";

// GET
// const { data, status } = await get<User[]>("/users", { limit: 10, active: true });

// POST
// await post("/users", { name: "John", email: "john@test.com" });

// PUT
// await put("/users/123", { name: "Jane" });

// PATCH
// await patch("/users/123", { status: "active" });

// DELETE
// await del("/users/123");

// Custom headers
// await get("/protected", undefined, { Authorization: "Bearer token" });

// Instance configuration
// apiClient.setDefaultHeaders({ Authorization: "Bearer token" });
// apiClient.setBaseUrl("/v2/api");

const BASE_URL = "/api";
const DEFAULT_HEADERS = { "Content-Type": "application/json" };

type RequestParams = Record<string, string | number | boolean | undefined | null>;
type RequestBody = Record<string, unknown | undefined> | unknown[];
type Headers = Record<string, string>;

interface ApiResponse<T = unknown> {
    data: { data?: T, message?: string, pagination?: Pagination }
    status: number;
    headers: Headers;
}

interface ApiError {
    message: string;
    status: number;
    data?: object | string | null;
}

class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Headers;

    constructor(baseUrl: string = BASE_URL, defaultHeaders: Headers = DEFAULT_HEADERS) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    private buildUrl(endpoint: string, params?: RequestParams): string {
        const url = `${this.baseUrl}${endpoint}`;

        if (!params || Object.keys(params).length === 0) {
            return url;
        }

        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });

        return `${url}?${searchParams.toString()}`;
    }

    private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
        const contentType = response.headers.get("content-type");
        const isJson = contentType?.includes("application/json");

        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            const error: ApiError = {
                message: data?.message || response.statusText || "Request failed",
                status: response.status,
                data
            };
            throw error;
        }

        return {
            data,
            status: response.status,
            headers: Object.fromEntries(response.headers.entries())
        };
    }

    async get<T = unknown>(
        endpoint: string,
        params?: RequestParams,
        headers?: Headers
    ): Promise<ApiResponse<T>> {
        const url = this.buildUrl(endpoint, params);

        const response = await fetch(url, {
            method: "GET",
            headers: { ...this.defaultHeaders, ...headers },
            credentials: "include"
        });

        return this.handleResponse<T>(response);
    }

    async post<T = unknown>(
        endpoint: string,
        body?: RequestBody,
        headers?: Headers
    ): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: { ...this.defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include"
        });

        return this.handleResponse<T>(response);
    }

    async put<T = unknown>(
        endpoint: string,
        body?: RequestBody,
        headers?: Headers
    ): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "PUT",
            headers: { ...this.defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include"
        });

        return this.handleResponse<T>(response);
    }

    async patch<T = unknown>(
        endpoint: string,
        body?: RequestBody,
        headers?: Headers
    ): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "PATCH",
            headers: { ...this.defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include"
        });

        return this.handleResponse<T>(response);
    }

    async delete<T = unknown>(
        endpoint: string,
        body?: RequestBody,
        headers?: Headers
    ): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "DELETE",
            headers: { ...this.defaultHeaders, ...headers },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include"
        });

        return this.handleResponse<T>(response);
    }

    setBaseUrl(url: string): void {
        this.baseUrl = url;
    }

    setDefaultHeaders(headers: Headers): void {
        this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    }

    removeDefaultHeader(key: string): void {
        delete this.defaultHeaders[key];
    }
}

export const apiClient = new ApiClient();

export const { get, post, put, patch, delete: del } = {
    get: apiClient.get.bind(apiClient),
    post: apiClient.post.bind(apiClient),
    put: apiClient.put.bind(apiClient),
    patch: apiClient.patch.bind(apiClient),
    delete: apiClient.delete.bind(apiClient)
};