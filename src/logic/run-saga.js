/*

Run saga manually to see how it works. Here the roundSaga will create
following result:

1: { type: 'CALL', payload: 'fn: fetchRandomDelay , args: [ ]' }
2: { type: 'PUT',
  payload: { type: 'navigate', payload: '/round/red' } }
3: { type: 'RACE',
  payload:
   { result: { type: 'TAKE', payload: 'round/clicked' },
     redTimeout: { type: 'CALL', payload: 'fn: delayP , args: [ 1001 ]' } } }
4: { type: 'PUT',
  payload: { type: 'navigate', payload: '/round/green' } }
5: { type: 'RACE',
  payload:
   { result: { type: 'TAKE', payload: 'round/clicked' },
     greenTimeout: { type: 'CALL', payload: 'fn: delayP , args: [ 2000 ]' } } }
6: { type: 'PUT',
  payload: { type: 'round/valid', responseTime: 100 } }
7: done

*/
import { roundSaga } from './sagas';

const mapValue = f => obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    return { ...acc, [key]: f(value) };
  }, {});

const toString = obj => {
  if (obj.done) {
    return 'done';
  }
  const payloadPicker = payload =>
    payload.action ||
    payload.pattern ||
    (payload.fn
      ? ['fn:', payload.fn.name, ', args: [', ...payload.args, ']'].join(' ')
      : undefined);
  return {
    type: obj.value.type,
    payload:
      payloadPicker(obj.value.payload) ||
      mapValue(obj => ({
        type: obj.type,
        payload: payloadPicker(obj.payload),
      }))(obj.value.payload),
  };
};

const gen = roundSaga();

console.log('1:', toString(gen.next()));
console.log('2:', toString(gen.next(1001)));
console.log('3:', toString(gen.next()));
console.log('4:', toString(gen.next({ redTimeout: true })));
console.log('5:', toString(gen.next()));
console.log(
  '6:',
  toString(gen.next({ greenTimeout: false, result: { payload: 100 } }))
);
console.log('7:', toString(gen.next()));
