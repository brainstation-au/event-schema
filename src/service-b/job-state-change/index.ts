import { z } from 'zod';
import { AWSEvent } from '../../common/aws-event';
import { putREAEvents } from '../../common/put-rea-events';

const source = 'rea:blue-team:service-a';
const detailType = 'UserAccountActivity';
export const JobState = z.enum([
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

export const JobStateChange = AWSEvent(source, detailType, JobStateChangeDetail);

export const putJobStateChange = putREAEvents<z.infer<typeof JobStateChangeDetail>>(source, detailType);

export default JobStateChange;
