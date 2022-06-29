import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ZodObject } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

function *walkSync(dir: string): Generator<string> {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(join(dir, file.name));
    } else {
      yield join(dir, file.name);
    }
  }
}

const generateCloudEventSchema = () => {
  const cloudEventSchema = readFileSync(join(__dirname, 'cloudevent.json'), 'utf-8');
  const schemaDir = __dirname.replace(/src$/, 'cloudevent-schema');
  mkdirSync(schemaDir, { recursive: true });

  for (const zodFile of walkSync(__dirname)) {
    if ((/\/zod\.ts$/g).test(zodFile)) {
      const schemaFile = zodFile.replace(__dirname, schemaDir).replace(/\/zod\.ts$/g, '.json');
      import(zodFile)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((zod: {default: ZodObject<any>}) => {
          return zodToJsonSchema(zod.default);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(({$schema, ...rest}) => {
          const context = JSON.parse(cloudEventSchema);
          context['definitions']['datadef'] = rest;
          return context;
        })
        .then(schema => JSON.stringify(schema, null, 2))
        .then(schema => writeFileSync(schemaFile, schema, {encoding: 'utf-8'}));
    }
  }
};

generateCloudEventSchema();
