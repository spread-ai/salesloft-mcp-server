import { SalesloftErrorResponse } from "./types.js";

const BASE_URL = "https://api.salesloft.com/v2";

function getApiKey(): string {
  const key = process.env.SALESLOFT_API_KEY;
  if (!key) {
    throw new Error(
      "SALESLOFT_API_KEY environment variable is required. " +
        "Generate one at https://accounts.salesloft.com/oauth/applications"
    );
  }
  return key;
}

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function handleResponse<T>(response: Response): Promise<T> {
  const remaining = response.headers.get("x-ratelimit-remaining-minute");

  if (!response.ok) {
    let errorMessage = `Salesloft API error ${response.status}`;

    try {
      const body = (await response.json()) as SalesloftErrorResponse;
      if (body.error) {
        errorMessage += `: ${body.error}`;
      } else if (body.errors) {
        const details = Object.entries(body.errors)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join("; ");
        errorMessage += `: ${details}`;
      }
    } catch {
      errorMessage += `: ${response.statusText}`;
    }

    if (remaining !== null && parseInt(remaining) <= 5) {
      errorMessage += ` (Rate limit nearly exhausted: ${remaining} requests remaining this minute)`;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const data = (await response.json()) as T;
  return data;
}

export async function get<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      Accept: "application/json",
    },
  });
  return handleResponse<T>(response);
}

export async function post<T>(
  path: string,
  body?: Record<string, unknown> | object
): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

export async function put<T>(
  path: string,
  body?: Record<string, unknown> | object
): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

export async function del<T>(path: string): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      Accept: "application/json",
    },
  });
  return handleResponse<T>(response);
}
