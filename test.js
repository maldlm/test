console.log('hee this is test dlaim 4');

const intervalId = setInterval(() => {
  console.log('run4...');
  const xBtn = document.getElementById('review-order-confirm-button-bottom');
  if (xBtn) {
    xBtn.style.setProperty('background-color', 'blue', 'important');
    clearInterval(intervalId);
  }
}, 100);
