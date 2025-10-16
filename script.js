const video = document.getElementById('camera');
    const captureBtn = document.getElementById('capture');
    const previewContainer = document.getElementById('preview-container');
    const previewImg = document.getElementById('preview');
    const retakeBtn = document.getElementById('retake');
    const frame = document.getElementById('frame');

    // カメラ起動（背面カメラ固定）
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    })
    .then(stream => {
      video.srcObject = stream;
      return new Promise(resolve => {
        video.onloadedmetadata = () => {
          video.play();
          resolve();
        };
      });
    })
    .catch(err => console.error('カメラ起動失敗:', err));

    // 撮影
    captureBtn.addEventListener('click', () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) {
        alert('カメラの準備中です。少し待ってからもう一度お試しください。');
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = vw;
      canvas.height = vh;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(video, 0, 0, vw, vh);
      ctx.drawImage(frame, 0, 0, vw, vh);

      previewImg.src = canvas.toDataURL('image/png');
      previewContainer.style.display = 'block';
      document.getElementById('camera-container').style.display = 'none';
    });

    // 取り直し
    retakeBtn.addEventListener('click', () => {
      previewContainer.style.display = 'none';
      document.getElementById('camera-container').style.display = 'block';
    });