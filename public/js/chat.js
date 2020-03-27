const socket = io();

socket.on('CountUpdated', (count) => {
  console.log('Count has been updated', count);
});

document.querySelector('#increment').addEventListener('click', () => {
  socket.emit('increment');
});
