import { z } from 'zod';
import { AWSEvent } from '../../common/aws-event';

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

const JobStateChangeDetail = z.object({
  jobname: z.string(),
  jobid: z.string().uuid(),
  state: JobState,
  parameters: z.array(Parameter),
});

class JobStateChangeClass extends AWSEvent<z.infer<typeof JobStateChangeDetail>> {
  readonly source = 'rea:blue-team:service-a';
  readonly type = 'UserAccountActivity';
  readonly jobStates = JobState.enum;

  public constructor() {
    super(JobStateChangeDetail);
  }
}

export const JobStateChange = new JobStateChangeClass();
