import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay }) 
      }
    }, delay)
    });
};

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault(); 
  const { delay, step, amount } = form.elements;
  const amountNr = Number(amount.value);
  const stepNr = Number(step.value);
  const delayNr = Number(delay.value);
  
  for (let i = 0; i < amountNr; i++) {

    createPromise(i + 1, delayNr + stepNr * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});


// const refs = {
//   body: document.querySelector('body'),
//   form: document.querySelector('form.form'),
//   delay: document.querySelector('[name="delay"]'),
//   step: document.querySelector('[name="step"]'),
//   amount: document.querySelector('[name="amount"]'),
// }

// refs.form.addEventListener('click', onPromiseCreate);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function onPromiseCreate(e) {
//   e.preventDefault();

//   let valueDelay = Number(refs.delay.value);
//   let step = Number(refs.step.value);
//   let amount = Number(refs.amount.value);

//   for (let i = 1; i <= amount; i += 1) {
//     let promiseDelay = valueDelay + step * i;

//     createPromise(i, promiseDelay)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// }
