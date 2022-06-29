import { z } from 'zod';

const JobState = z.enum([
  'SUBMITTED',
  'STARTED',
  'COMPLETED',
  'FAILED',
]);

const Parameter = z.object({
  key: z.string(),
  value: z.union([z.string(), z.number()]),
});

export const JobStateChange = z.object({
  jobname: z.string(),
  jobid: z.string().uuid(),
  state: JobState,
  parameters: z.array(Parameter),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type JobStateChange = z.infer<typeof JobStateChange>;

export default JobStateChange;
