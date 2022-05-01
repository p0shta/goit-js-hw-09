const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.body,
};

refs.stop.disabled = true;

const colorChanger = {
    intervalId: null,
    start() {
        refs.start.disabled = true;
        refs.stop.disabled = false;

        this.intervalId = setInterval(() => {
            changeBackgroundColor();
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);

        refs.start.disabled = false;
        refs.stop.disabled = true;
    },
};

refs.start.addEventListener('click', colorChanger.start.bind(colorChanger));
refs.stop.addEventListener('click', colorChanger.stop.bind(colorChanger));

function changeBackgroundColor() {
    const color = getRandomHexColor();

    refs.body.style.backgroundColor = color;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
