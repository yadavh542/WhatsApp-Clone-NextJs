import React from 'react';
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <center style={{display:"grid", placeItems:"center", height:"100vh"}}>
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" alt=""
            style={{marginBottom:10}}
            height={200}
            />
            <ReactLoading type="spinningBubbles" color="green" size={80}/>
        </div>
    </center>
  )
}

export default Loading