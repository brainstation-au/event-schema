import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import zodToJsonSchema from 'zod-to-json-schema';
import { UserAccountActivity } from './service-a';
import { JobStateChange } from './service-b';

const zodTypes = [
  {
    service: 'service-a',
    eventName: 'UserAccountActivity',
    zodType: UserAccountActivity.zodEventType(),
  },
  {
    service: 'service-b',
    eventName: 'JobStateChange',
    zodType: JobStateChange.zodEventType(),
  },
];

export const generateAWSEventSchema = (path?: string) => {
  const schemaDir = path || __dirname.replace(/src$/, 'event-schema');
  if (existsSync(schemaDir)) rmSync(schemaDir, { recursive: true, force: true });

  for (const {service, eventName, zodType} of zodTypes) {
    const schemaFile = join(schemaDir, service, `${eventName}.json`);
    mkdirSync(parse(schemaFile).dir, { recursive: true });
    const schema = JSON.stringify(zodToJsonSchema(zodType), null, 2);
    writeFileSync(schemaFile, schema, {encoding: 'utf-8'});
  }
};
generateAWSEventSchema();
