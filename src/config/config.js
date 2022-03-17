
export const poster_unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

export const uid = () => {
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substr(2);

    return head + tail;
}