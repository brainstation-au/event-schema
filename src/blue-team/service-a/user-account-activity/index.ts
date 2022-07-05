import { z } from 'zod';
import { AWSEvent } from '../../../common/aws-event';
import { putREAEvents } from '../../../common/put-rea-events';

const source = 'rea:blue-team:service-a';
const detailType = 'UserAccountActivity';
const Action = z.enum([
  'USER_SIGNED_UP',
  'EMAIL_UPDATED',
  'MOBILE_UPDATED',
  'RECOVERY_REQUESTED',
]);

export const UserAccountActivityDetail = z.object({
  userid: z.string().uuid(),
  email: z.string().email(),
  mobile: z.string(),
  action: Action,
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserAccountActivityDetail = z.infer<typeof UserAccountActivityDetail>;

export const UserAccountActivity = AWSEvent(source, detailType, UserAccountActivityDetail);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserAccountActivity = z.infer<typeof UserAccountActivity>;

export const putUserAccountActivity = putREAEvents<UserAccountActivityDetail>(source, detailType);

export default UserAccountActivity;
