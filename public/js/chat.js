const socket = io();

socket.on('message', (data) => {
  console.log(data);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  // console.log(`client:${message}`);

  socket.emit('sendMessage', message, (mess) => {
    console.log('the message was delivered ack', mess);
  });
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});
