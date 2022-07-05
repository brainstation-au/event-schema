import { z } from 'zod';
import { AWSEvent } from '../../../common/aws-event';
import { putREAEvents } from '../../../common/put-rea-events';

const source = 'rea:blue-team:service-a';
const detailType = 'UserAccountActivity';
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

export const JobStateChangeDetail = z.object({
  jobname: z.string(),
  jobid: z.string().uuid(),
  state: JobState,
  parameters: z.array(Parameter),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type JobStateChangeDetail = z.infer<typeof JobStateChangeDetail>;

export const JobStateChange = AWSEvent(source, detailType, JobStateChangeDetail);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type JobStateChange = z.infer<typeof JobStateChange>;

export const putJobStateChange = putREAEvents<JobStateChangeDetail>(source, detailType);

export default JobStateChange;
