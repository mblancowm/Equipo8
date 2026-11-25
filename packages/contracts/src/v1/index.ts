import { z } from 'zod';

export const HealthRequestSchema = z.strictObject({});
export const HealthResponseSchema = z.strictObject({
  status: z.literal('ok')
});

export const LocalLoginRequestSchema = z.strictObject({
  username: z.string().min(1).max(80),
  password: z.string().min(1).max(200)
});

export const LocalSessionResponseSchema = z.strictObject({
  authenticated: z.literal(true),
  username: z.string().min(1)
});

export const LocalLogoutResponseSchema = z.strictObject({
  authenticated: z.literal(false)
});

export const PaginationQuerySchema = z.strictObject({
  page: z.string().optional(),
  page_size: z.string().optional()
});

export const PaginationResponseSchema = <T extends z.ZodType>(resultSchema: T) =>
  z.strictObject({
    count: z.number().int().nonnegative(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(resultSchema)
  });

export const ApiErrorResponseSchema = z.strictObject({
  detail: z.string(),
  field_errors: z.record(z.string(), z.array(z.string()))
});

export type HealthRequest = z.infer<typeof HealthRequestSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type LocalLoginRequest = z.infer<typeof LocalLoginRequestSchema>;
export type LocalSessionResponse = z.infer<typeof LocalSessionResponseSchema>;
export type LocalLogoutResponse = z.infer<typeof LocalLogoutResponseSchema>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
