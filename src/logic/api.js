export const fetchRandomDelay = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(Math.floor(Math.random() * 2000)), 100);
  });
