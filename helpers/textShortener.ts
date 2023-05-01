export default (text: string, numberOfWords: number = 10) => {
  const textArray: string[] = text.split(' ');
  return `${textArray.splice(0, numberOfWords).join(' ')}..`;
};
