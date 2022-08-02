import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { REAEvent } from './rea-event';

describe('aws event construct', () => {
  const Detail = z.object({ foo: z.literal('bar') });
  class TestEvent extends REAEvent<z.infer<typeof Detail>> {
    readonly source = 'random-source';
    readonly type = 'some-type';
    public constructor() {
      super(Detail);
    }
  }

  test('parse a valid event document', () => {
    const data = JSON.parse(readFileSync(join(__dirname, 'aws-event-sample.json'), 'utf-8'));
    expect((new TestEvent()).parseEvent({
      ...data,
      extra: 'bar',
    })).toEqual({
      ...data,
      time: new Date(data.time),
    });
  });

  test('parse an invalid event document', () => {
    expect(() => (new TestEvent()).parseEvent({
      jobname: 'foo',
      jobid: '4f4b5803-5885-4aa8-9c39-97fbf52a67b8',
      state: 'SUBMITTED',
    })).toThrow(z.ZodError);
  });
});
