import { z } from 'zod';
import { REAEvent } from '../../../common/rea-event';

const Action = z.enum([
  'USER_SIGNED_UP',
  'EMAIL_UPDATED',
  'MOBILE_UPDATED',
  'RECOVERY_REQUESTED',
]);

const UserAccountActivityDetail = z.object({
  userid: z.string().uuid(),
  email: z.string().email(),
  mobile: z.string(),
  action: Action,
});

class UserAccountActivityClass extends REAEvent<z.infer<typeof UserAccountActivityDetail>> {
  readonly source = 'rea:blue-team:service-a';
  readonly type = 'UserAccountActivity';
  readonly actions = Action.enum;

  public constructor() {
    super(UserAccountActivityDetail);
  }
}

export const UserAccountActivity = new UserAccountActivityClass();
