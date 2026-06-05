export type ServiceSource = "mock" | "local" | "supabase";

export interface ServiceError {
  code: string;
  message: string;
  recoverable: boolean;
}

export type ServiceResponse<TData> =
  | {
      data: TData;
      error: null;
      source: ServiceSource;
    }
  | {
      data: null;
      error: ServiceError;
      source: ServiceSource;
    };

export interface ListServiceParams {
  limit?: number;
  offset?: number;
  query?: string;
}

/** Wraps mock/local data in the same shape future Supabase services will return. */
export function serviceSuccess<TData>(
  data: TData,
  source: ServiceSource = "mock",
): ServiceResponse<TData> {
  return {
    data,
    error: null,
    source,
  };
}

/** Creates a typed service error without throwing inside UI data boundaries. */
export function serviceFailure<TData>(
  code: string,
  message: string,
  recoverable = true,
  source: ServiceSource = "mock",
): ServiceResponse<TData> {
  return {
    data: null,
    error: {
      code,
      message,
      recoverable,
    },
    source,
  };
}
