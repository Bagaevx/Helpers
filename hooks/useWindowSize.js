import React from 'react';
import throttle from 'lodash/throttle';

const events = new Set();
const onResize = () => events.forEach((fn) => fn());

const useWindowSize = (options = {}) => {
  const { throttleMs = 100 } = options;

  const [size, setSize] = React.useState({
    width: process.browser && window.innerWidth,
    height: process.browser && window.innerHeight,
  });

  const handle = throttle(() => {
    setSize({
      width: process.browser && window.innerWidth,
      height: process.browser && window.innerHeight,
    });
  }, throttleMs);

  React.useMemo(() => {
    if (events.size === 0) {
      window.addEventListener('resize', onResize, true);
    }

    events.add(handle);

    return () => {
      events.delete(handle);

      if (events.size === 0) {
        window.removeEventListener('resize', onResize, true);
      }
    };
  }, []);

  return size;
};

export default useWindowSize;
