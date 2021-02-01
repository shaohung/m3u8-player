window.onload = () => {
    const srcInput = document.querySelector('#m3u8-placeholder');
    srcInput.value = localStorage.getItem('m3u8-link') || '';
    document.querySelector('#play-btn').onclick = () => {
        localStorage.setItem('m3u8-link', srcInput.value);
        window.location.href = './player' + '#' + srcInput.value;
    }
};
