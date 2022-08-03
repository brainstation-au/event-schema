import { z } from 'zod';
import { AWSEvent } from '../../common/aws-event';
import { putEvents } from '../../common/put-rea-events';

const source = 'rea:service-b';
const detailType = 'JobStateChange';
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

export const putJobStateChange = putEvents<z.infer<typeof JobStateChangeDetail>>(source, detailType);

export default JobStateChange;
