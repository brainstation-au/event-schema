import { readFileSync } from 'fs';
import { join } from 'path';
import { ZodError } from 'zod';
import { JobStateChange } from '.';

describe('job state change', () => {
  test('parse a valid document', () => {
    const data = JSON.parse(readFileSync(join(__dirname, 'sample-event.json'), 'utf-8'));
    expect(JobStateChange.parse({
      ...data,
      extra: 'bar',
    })).toEqual({
      ...data,
      time: new Date(data.time),
    });
  });

  test('parse an invalid document', () => {
    expect(() => JobStateChange.parse({
      jobname: 'foo',
      jobid: '4f4b5803-5885-4aa8-9c39-97fbf52a67b8',
      state: 'SUBMITTED',
    })).toThrow(ZodError);
  });
});
