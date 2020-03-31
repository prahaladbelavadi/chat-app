const socket = io();

// socket.on('CountUpdated', (count) => {
//   console.log('Count has been updated', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//   socket.emit('increment');
// });

socket.on('message', (data) => {
  console.log(data);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // const val = document.querySelector('input').value;
  const val = e.target.elements.message.value;
  console.log(`client:${val}`);

  socket.emit('sendMessage', val);
});
