import { sum, avg, compose, map } from '../src/logic/helpers';

test('sum', () => {
  expect(sum([1, 2, 3])).toBe(6);
});

test('avg', () => {
  expect(avg([1, 2, 3])).toBe(2);
});

test('compose', () => {
  const f1 = x => x + 1;
  const f2 = x => x + 2;
  expect(
    compose(
      f1,
      f2
    )(0)
  ).toBe(3);
});

test('map', () => {
  const f = x => x + 1;
  expect(map(f)([0, 1, 2])).toStrictEqual([1, 2, 3]);
});

test('compose avg map', () => {
  const f = x => x + 1;
  expect(
    compose(
      avg,
      map(f)
    )([0, 1, 2])
  ).toBe(2);
});
