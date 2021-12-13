import React, { useRef, useState, useMemo } from 'react';
import './app.css';

const App = () => {
  const inputRef = useRef(null);
  const [numElements, setNumElements] = useState(8);
  const [buttonDisable, setButtonDisable] = useState(false);

  // delay in ms
  const delay = 500;

  // list of random n numbers, used useMemo here to retain same list for every start button click for same n
  const numList = useMemo(() => {
    let list = Array.from({ length: numElements }).map(() => {
      // random number between 20 - 100
      const val = Math.ceil(Math.random() * (100 - 20) + 20);
      return val;
    });
    return list;
  }, [numElements]);

  function handleInputSubmit() {
    const regex = new RegExp('^[0-9]*$');

    if (inputRef.current.value === '' || !regex.test(inputRef.current.value)) {
      alert('Please enter valid number');
      return;
    }

    const n = parseInt(inputRef.current.value, 10);

    if (n < 2 || n > 20) {
      alert('Please enter number between 2-20');
      return;
    }

    // change to initial colour state
    [...document.getElementsByClassName('block')].forEach((bl) => {
      bl.style.backgroundColor = '#6b5b95';
    });

    setNumElements(n);
  }

  async function handleStartClick() {
    setButtonDisable(true);
    document
      .getElementById('start-button')
      .classList.add('disabled-start-button');

    await BubbleSort();

    document
      .getElementById('start-button')
      .classList.remove('disabled-start-button');
  }

  function swapBlocks(b1, b2) {
    // picking parent containers pf all bars
    var container = document.getElementById('array');

    return new Promise((resolve) => {
      // chnaging position via changing their transform
      var temp = b1.style.transform;
      b1.style.transform = b2.style.transform;
      b2.style.transform = temp;

      window.requestAnimationFrame(function () {
        setTimeout(() => {
          container.insertBefore(b2, b1);
          resolve();
        }, 250);
      });
    });
  }

  async function BubbleSort() {
    let blocks = document.querySelectorAll('.block');

    for (let i = 0; i < blocks.length; i += 1) {
      for (let j = 0; j < blocks.length - i - 1; j += 1) {
        // change background colours of current selected items
        blocks[j].style.backgroundColor = 'yellow';
        blocks[j + 1].style.backgroundColor = 'yellow';

        // creating Promise to wait for delay mentioned
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, delay)
        );

        let value1 = Number(blocks[j].childNodes[0].innerHTML);
        let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

        // comparing value of two blocks
        if (value1 > value2) {
          await swapBlocks(blocks[j], blocks[j + 1]);
          blocks = document.querySelectorAll('.block');
        }

        // Changing the color to the previous one
        blocks[j].style.backgroundColor = '#6b5b95';
        blocks[j + 1].style.backgroundColor = '#6b5b95';
      }

      // changing colour of block which is placed at its position
      blocks[blocks.length - i - 1].style.backgroundColor = '#13CE66';
    }

    setButtonDisable(false);
  }

  return (
    <div className="parent">
      <h2 className="heading">BUBBLE SORT</h2>

      <div className="input-block">
        <input
          ref={inputRef}
          className="input-container"
          placeholder="Array Size, default=8"
        />
        <button
          id="input-button"
          disabled={buttonDisable}
          onClick={handleInputSubmit}
        >
          OK
        </button>
      </div>

      <div id="array" style={{ width: numElements * 35, paddingLeft: 3 }}>
        {numList.map((val, index) => {
          return (
            <div
              className="block"
              style={{
                height: val * 2,
                transform: `translate(${index * 35}px)`,
              }}
              key={index.toString()}
            >
              <label className="block_id">{val}</label>
            </div>
          );
        })}
      </div>

      <button
        disabled={buttonDisable}
        onClick={handleStartClick}
        id="start-button"
        className="start-button"
      >
        START
      </button>
    </div>
  );
};

export default App;
