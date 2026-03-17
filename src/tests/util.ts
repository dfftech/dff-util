// bun run src/tests/util.ts

import { QueryCond } from '../main/util';

const run = async () => {
  const input = [
    'isApproved=true',
    'status!=false',
    'age>18',
    'score<100',
    'height>=170',
    'weight<=80',
    'type=["accept","inprogress"]',
    'type!=["accept","inprogress"]',
    'role in ["admin","editor"]',
    'role not in ["admin","editor"]',
    'role notin ["admin","editor"]',
    'deletedAt is null',
    'deletedAt is not null',
    'deletedAt isnull',
    'updatedAt isnotnull',
    'deletedAt=null',
    'deletedAt!=null',
    'age between [18,30]',
    'createdAt between 2020-01-01..2020-01-31',
    'name like "Jo%"',
    'email ilike "%@gmail.com"',
    'title contains "hello"',
    'code startswith "AB"',
    'code endswith "99"',
    'path regex "^/api/.*$"',
    'archivedAt',
    '!archivedAt',
    'name="a,b"',
    'meta={"a":1,"b":true}',
    'tags=["x,y","z"]',
  ].join(',');

  const got = QueryCond(input);

  console.log('QueryCond input:', input);
  console.log('QueryCond output:', JSON.stringify(got, null, 2));
};

run();
