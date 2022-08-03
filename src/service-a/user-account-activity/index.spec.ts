import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { UserAccountActivityDetail } from '.';

describe('user account activity detail', () => {
  test('parse a valid event document', () => {
    const data = JSON.parse(readFileSync(join(__dirname, 'sample-input.json'), 'utf-8'));
    expect(UserAccountActivityDetail.parse({
      ...data,
      extra: 'bar',
    })).toEqual({
      ...data,
    });
  });

  test('parse an invalid event document', () => {
    expect(() => UserAccountActivityDetail.parse({
      jobname: 'foo',
      jobid: '4f4b5803-5885-4aa8-9c39-97fbf52a67b8',
      state: 'SUBMITTED',
    })).toThrow(z.ZodError);
  });
});
