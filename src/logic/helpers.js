export const prop = x => obj => obj[x];
export const map = f => arr => arr.map(f);
export const sum = arr => arr.reduce((acc, x) => acc + x, 0);
export const avg = arr => (arr.length === 0 ? 0 : sum(arr) / arr.length);
export const compose = (...fns) => x =>
  fns.reverse().reduce((acc, fn) => fn(acc), x);
export const last = arr => arr[arr.length - 1];
