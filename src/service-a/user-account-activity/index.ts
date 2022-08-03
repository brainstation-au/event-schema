import { z } from 'zod';
import { AWSEvent } from '../../common/aws-event';
import { putREAEvents } from '../../common/put-rea-events';

const source = 'rea:blue-team:service-a';
const detailType = 'UserAccountActivity';
export const Action = z.enum([
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

export const UserAccountActivity = AWSEvent(source, detailType, UserAccountActivityDetail);

export const putUserAccountActivity = putREAEvents<z.infer<typeof UserAccountActivityDetail>>(source, detailType);

export default UserAccountActivity;
