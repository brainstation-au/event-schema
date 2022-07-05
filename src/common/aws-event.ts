import { z } from 'zod';
import { DateTime } from './date-time';

export const AWSEvent = <T>(
  source: string,
  detailType: string,
  detail: z.ZodType<T>,
  region: string = 'ap-southeast-2',
) => z.object({
    version: z.literal('0'),
    id: z.string(),
    'detail-type': z.literal(detailType),
    source: z.literal(source),
    account: z.string().regex(/^\d{12}$/g),
    time: DateTime,
    region: z.literal(region),
    resources: z.string().array(),
    detail,
  });
