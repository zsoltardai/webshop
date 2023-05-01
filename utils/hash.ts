import {createHash} from 'crypto';


export default (text: string): string => {

  const hash = createHash('sha256');

  hash.update(text);

  return hash.digest('hex');
};
