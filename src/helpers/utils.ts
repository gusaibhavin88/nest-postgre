import appMessage from './appMessages.json';
import * as dotenv from 'dotenv';
dotenv.config();

export const returnMessage = (msg: string) => {
  const message = appMessage[msg];
  return message;
};

export const permissionArrayToObj = (permissions: []) => {
  return permissions.reduce((result, item: any) => {
    result[item.section] = item.permissions;
    return result;
  }, {});
};

export const getKeywordType = (keyword: any) => {
  if (!isNaN(keyword)) {
    return 'number';
  } else if (Date.parse(keyword)) {
    return 'date';
  } else {
    return 'string';
  }
};
