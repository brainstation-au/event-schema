import { z } from 'zod';
import {
  EventBridgeClient,
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from '@aws-sdk/client-eventbridge';
import { DateTime } from './date-time';

export abstract class REAEvent<T> {
  readonly region = 'ap-southeast-2';
  readonly abstract source: string;
  readonly abstract type: string;
  private zodDetailType: z.ZodType<T>;
  private _zodEventType: z.ZodType | undefined;

  protected constructor(zodDetailType: z.ZodType<T>) {
    this.zodDetailType = zodDetailType;
  }

  public parseEvent(data: unknown) {
    return this.zodEventType().parse(data);
  }

  public parseEventDetail(data: unknown): T {
    return this.zodDetailType.parse(data);
  }

  public async put(
    details: T[],
    eventBusArn: string,
    resources?: string[],
    time?: Date,
  ) {
    const params: PutEventsCommandInput = {
      Entries: details.map((d) => {
        const entry: PutEventsRequestEntry = {
          Detail: JSON.stringify(d),
          Source: this.source,
          DetailType: this.type,
          EventBusName: eventBusArn,
        };
        if (resources && resources.length > 0) entry['Resources'] = resources;
        if (time instanceof Date) entry['Time'] = time;
        return entry;
      }),
    };
    const command = new PutEventsCommand(params);

    const client = new EventBridgeClient({ region: 'ap-southeast-2' });
    return client.send(command);
  }

  public zodEventType() {
    if (this._zodEventType) return this._zodEventType;

    return z.object({
      version: z.literal('0'),
      id: z.string(),
      'detail-type': z.literal(this.type),
      source: z.literal(this.source),
      account: z.string().regex(/^\d{12}$/g),
      time: DateTime,
      region: z.literal(this.region),
      resources: z.string().array(),
      detail: this.zodDetailType,
    });
  }
}
