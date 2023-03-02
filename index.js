const throttle = (fn, delay, ctx) => {
  let isPending = false;
  let pendingInterval;
  let callback;

  const startListen = () => {
    isPending = true;
    pendingInterval = setInterval(() => {
      if (callback) {
        callback();
        callback = null;
      } else {

        clearInterval(pendingInterval);
        isPending = false;
      }
    }, delay);
  };

  return (value) => {

    if (!isPending && !callback) {
      fn(value);
      startListen();
    } else if (isPending) {
      callback = fn.bind(ctx, value);
    }
  };
};

function loggScroll() {
  const loggerScroll = (value) => {
    console.log(Math.trunc(value));
  };

  const throttledScroll = throttle(loggerScroll, 1000, null);
  document.addEventListener('scroll', (event) => {
    throttledScroll(event.timeStamp);
  });
}

function loggSetTimeout(){
  const logger = (value) => {
    this.name = value;
    console.log('name', this.name);
  };

  const throttled = throttle(logger, 100, { name: null });

  setTimeout(() => {
    throttled('a');
  }, 0);

  setTimeout(() => {
    throttled('b');
  }, 56);

  setTimeout(() => {
    throttled('c');
  }, 90);

  setTimeout(() => {
    throttled('d');
  }, 120);

  setTimeout(() => {
    throttled('e');
  }, 180);

  setTimeout(() => {
    throttled('f');
  }, 480);
}

document.getElementById('timeout').addEventListener('click',loggSetTimeout)
document.getElementById('scroll').addEventListener('click',loggScroll)





