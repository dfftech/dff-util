// ts-node test/fileupload.ts

import fs from 'fs/promises';
import { Http } from '../src';
import path from 'path';

const url = '/file';
const filename = 'testing2.xlsx';
const filePath = path.join(__dirname, filename);
console.log(filePath);
const main = async () => {
  const data = await fs.readFile(filePath);
  const resp = await Http.Upload(
    url,
    new File([data], filePath, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      lastModified: Date.now(),
    }),
  );
  console.log('Http.Upload :: ', resp);
};

main();
