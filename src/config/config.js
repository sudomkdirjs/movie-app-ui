
export const poster_unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

export const uid = () => {
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substr(2);

    return head + tail;
}

export const hasMovieFieldValue = (value) => value && value !== 'N/A';

export const debounce = function (func, delay=1000) {
    let timer;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
}