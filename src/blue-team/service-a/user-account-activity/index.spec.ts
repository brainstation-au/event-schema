import { readFileSync } from 'fs';
import { join } from 'path';
import { ZodError } from 'zod';
import { UserAccountActivity } from '.';

describe('user account activity', () => {
  test('parse a valid event document', () => {
    const data = JSON.parse(readFileSync(join(__dirname, 'sample-event.json'), 'utf-8'));
    expect(UserAccountActivity.parse({
      ...data,
      extra: 'bar',
    })).toEqual({
      ...data,
      time: new Date(data.time),
    });
  });

  test('parse an invalid event document', () => {
    expect(() => UserAccountActivity.parse({
      jobname: 'foo',
      jobid: '4f4b5803-5885-4aa8-9c39-97fbf52a67b8',
      state: 'SUBMITTED',
    })).toThrow(ZodError);
  });
});
