import { z } from 'zod';

export const DateTime = z.preprocess((arg) => {
  return (typeof arg == 'string' || arg instanceof Date) ? new Date(arg) : arg;
}, z.date());
