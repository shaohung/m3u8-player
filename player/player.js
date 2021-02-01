const video = document.getElementById('video');

const loadVideo = (url) => {
    console.log(url);
    const sourceType = checkSourceType(url);
    video.volume = 0.3;
    if (sourceType === 'hls' && Hls.isSupported()) {
        const hls = new Hls();
        const m3u8Url = decodeURIComponent(url)
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
        document.title = url
    } else if (sourceType === 'flv' && flvjs.isSupported()) {
        const flv = flvjs.createPlayer({
            type: 'flv',
            url: decodeURIComponent(url),
            hasAudio: true,
            hasVideo: true
        })
        flv.attachMediaElement(video);
        flv.load();
        flv.play();
        document.title = url
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('canplay', function () {
            video.play();
        });
        document.title = url;
    }
}

const checkSourceType = (url) => {
    if (url.includes('.m3u8')) {
        return 'hls';
    } else if (url.includes('.flv')) {
        return 'flv';
    }
    return "unknown";
}

loadVideo(window.location.href.split("#")[1])

window.onload = () => {
    video.focus();
}
