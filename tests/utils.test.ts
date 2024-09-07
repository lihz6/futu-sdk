import { generator } from '../utils';

test('generator return', async () => {
  let index = 0;
  const iterator = generator<number>(async resolve => {
    let index = 0;
    const id = setInterval(() => {
      resolve(index++);
    });
    return () => clearInterval(id);
  });
  for (const next of iterator) {
    expect(await next).toBe(index++);
    if (index > 10) {
      iterator.return();
    }
  }
});
