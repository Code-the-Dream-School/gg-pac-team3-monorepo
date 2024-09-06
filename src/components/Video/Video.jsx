import styles from './Video.module.css';

const Video = ({videoLink}) => {
  const getYouTubeVideoID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const isYouTube = (videoLink) => {
    return videoLink.includes('youtube.com') || videoLink.includes('youtu.be')
  }

  return (
    <>
      {
        isYouTube ? (
          <>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getYouTubeVideoID(videoLink)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
          </>
        ) : (
          <>
            <video
              controls
              src={videoLink}
              className={styles.videoPlayer}
            >
              Your browser does not support the video tag.
            </video>
            <a
              href={videoLink}
              download
              className={styles.downloadLink}
            >
              Download Video
            </a>
          </>
        )
      }
    </>
  );
};

export default Video;