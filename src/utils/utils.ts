const unixTimeStampSec = () => {
  return Math.floor(Date.now() / 1000);
};

const removeObjField = <T>(object: T, key: string): Partial<T> => {
  const newObject = { ...object };
  delete newObject[key];
  return newObject;
};

export { unixTimeStampSec, removeObjField };
