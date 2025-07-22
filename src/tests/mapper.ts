// bun run src/tests/mapper.ts

import { toEntityMapper, toSchemaMapper, toViewMapper } from "../main/case-mapper";

const dto = {
    id: "abc123",
    nameLang: {
        "en-US": "Hello",
        "te-IN": "హలో",
        "ta-IN": "வணக்கம்",
    },
    createdAt: new Date(),
    createdBy: "user123",
};

const entity = toViewMapper(dto);

const schema = toSchemaMapper(entity);

const newEntity = toViewMapper(dto);

console.log(entity, schema, newEntity);