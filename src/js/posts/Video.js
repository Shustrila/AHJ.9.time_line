import Posts from '../Posts';

class Video extends Posts {
  constructor() {
    super();
    this.type = 'video';
    this.videoRecording = {};
  }

  onStartRecord() {
    super.onStartRecord();

    const video = document.createElement('video');

    video.controls = true;
    video.autoplay = true;
    video.srcObject = this.strem;
    video.className = 'time-line__window-video';

    this.videoRecording = document.createElement('div');
    this.videoRecording.className = 'time-line__window';
    this.videoRecording.appendChild(video);

    window.TimeLine.wrapper.prepend(this.videoRecording);
  }

  onStopRecord() {
    super.onStopRecord();

    this.videoRecording.remove();
  }
}

export default Video;
