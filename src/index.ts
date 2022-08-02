import { z } from 'zod';

export const EventBusArn = z.string()
  .regex(/^arn:aws:events:ap-southeast-2:\d{12}:event-bus\/[/\.\-_A-Za-z0-9]+$/g);
