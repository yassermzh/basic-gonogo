export const fetchRandomDelay = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(Math.floor(Math.random() * 100)), 100);
  });
