/*

Run saga manually to see how it works. Here the roundSaga will create
following result:

1: { type: 'PUT', payload: { type: 'round/start' } }
2: { type: 'CALL', payload: 'fn: fetchRandomDelay , args: [ ]' }
3: { type: 'CALL', payload: 'fn: navigate , args: [ round/red ]' }
4: { type: 'RACE',
  payload:
   { result: { type: 'TAKE', payload: 'round/clicked' },
     redTimeout: { type: 'CALL', payload: 'fn: delayP , args: [ 1001 ]' } } }
5: { type: 'CALL',
  payload: 'fn: navigate , args: [ round/green ]' }
6: { type: 'RACE',
  payload:
   { result: { type: 'TAKE', payload: 'round/clicked' },
     greenTimeout: { type: 'CALL', payload: 'fn: delayP , args: [ 1000 ]' } } }
7: { type: 'PUT', payload: { type: 'round/valid' } }

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
console.log('2:', toString(gen.next()));
console.log('3:', toString(gen.next(1001)));
console.log('4:', toString(gen.next()));
console.log('5:', toString(gen.next({ redTimeout: true })));
console.log('6:', toString(gen.next()));
console.log('7:', toString(gen.next({ greenTimeout: false })));
console.log('8:', toString(gen.next()));
