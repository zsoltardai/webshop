export default (text: string, numberOfCharacters: number = 120) => {
  if (text.length <= numberOfCharacters) return text;
  const textArray: string[] = text.split('');
  return `${textArray.splice(0, numberOfCharacters).join('')}`;
};
