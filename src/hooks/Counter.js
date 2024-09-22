import { useState, useEffect } from 'react';

function useCounter(initialValue, counterName) {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    if (counter === 0) {
      console.log(counterName, ' initialized');
    } else {
      console.log(counterName, ' pressed ', counter, ' times ');
    }
  }, [counter, counterName]);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return incrementCounter;
}

export default useCounter;
