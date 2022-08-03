import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { AWSEvent } from './aws-event';

describe('aws event construct', () => {
  const Detail = z.object({ foo: z.literal('bar') });
  test('parse a valid event document', () => {
    const data = JSON.parse(readFileSync(join(__dirname, 'aws-event-sample.json'), 'utf-8'));
    expect(AWSEvent('random-source', 'some-type', Detail).parse({
      ...data,
      extra: 'bar',
    })).toEqual({
      ...data,
      time: new Date(data.time),
    });
  });

  test('parse an invalid event document', () => {
    expect(() => AWSEvent('some-source', 'random-type', Detail).parse({
      jobname: 'foo',
      jobid: '4f4b5803-5885-4aa8-9c39-97fbf52a67b8',
      state: 'SUBMITTED',
    })).toThrow(z.ZodError);
  });
});
