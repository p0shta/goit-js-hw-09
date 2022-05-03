import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();

    const firstDelay = Number(e.currentTarget.children[0].children[0].value);
    const stepDelay = Number(e.currentTarget.children[1].children[0].value);
    const amount = Number(e.currentTarget.children[2].children[0].value);

    let delay = firstDelay;

    for (let i = 1; i <= amount; i += 1) {
        createPromise(i, delay)
            .then(({ position, delay }) => {
                console.log(position, delay);
                Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });

        delay += stepDelay;
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}
