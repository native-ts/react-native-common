export function isEqualString(str1: string, str2: string){
  return str1 === str2;
}

export function isEqualNumber(num1: number, num2: number){
  return num1 === num2;
}

export function isEqualBoolean(num1: boolean, num2: boolean){
  return num1 === num2;
}

export function isEqualBigint(big1: bigint, big2: bigint){
  return big1.toString() === big2.toString();
}

export function isEqualSymbol(sym1: symbol, sym2: symbol){
  return sym1.toString() === sym2.toString();
}

export function isEqualArray(arr1: any[], arr2: any[]){
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; ++i){
    if (!isEqual(arr1[i], arr2[i])) return false;
  }

  return true;
}

export function isEqualObjectLiteral(obj1: Record<PropertyKey, any>, obj2: Record<PropertyKey, any>){
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const own1 = keys1.filter(key => obj1.hasOwnProperty(key));
  const own2 = keys2.filter(key => obj2.hasOwnProperty(key));

  if (own1.length !== own2.length) return false;

  for (let i = 0; i < own1.length; ++i){
    if (isEqual(obj1[i], obj2[i])) return false;
  }

  return true;
}

export function isEqualObject(obj1: object, obj2: object){
  if (obj1 === null) return obj2 === null;

  if (Array.isArray(obj1)){
    return Array.isArray(obj2) ? isEqualArray(obj1, obj2) : false;
  }

  return isEqualObjectLiteral(obj1, obj2);
}

export default function isEqual(val1: any, val2: any): boolean{
  if (typeof val1 !== typeof val2) return false;
  
  switch (typeof val1){
    case 'string': return isEqualString(val1, val2);
    case 'number': return isEqualNumber(val1, val2);
    case 'boolean': return isEqualBoolean(val1, val2);
    case 'bigint': return isEqualBigint(val1, val2);
    case 'symbol': return isEqualSymbol(val1, val2);
    case 'object': return isEqualObject(val1, val2);
    case 'undefined':
    case 'function':
      return val1 === val2;
  }
}
