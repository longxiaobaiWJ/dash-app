import React, { useState } from 'react';

function Material(props) {
  const [listVideo, setListVideo] = useState([
    'http://localhost:3000/2024-05-05 23.29.39.mp4',
  ])
  const onChangeVal = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setListVideo([...listVideo, url]);
  }

  return (
    <div className='header'>
      <div>
        <input type="file" onChange={onChangeVal} accept="video/*" />
      </div>
      <div className='material'>
        {
          listVideo.map(url => (<video controls className='panel' key={url} draggable src={url} />))
        }
      </div>
    </div>
  );
}

export default Material;