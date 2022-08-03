import {
  EventBridgeClient,
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from '@aws-sdk/client-eventbridge';

export const putREAEvents = <T>(source: string, detailType: string) => async (
  details: T[],
  eventBusArn: string,
  resources?: string[],
  time?: Date,
) => {
  const params: PutEventsCommandInput = {
    Entries: details.map((d) => {
      const entry: PutEventsRequestEntry = {
        Detail: JSON.stringify(d),
        Source: source,
        DetailType: detailType,
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
};
