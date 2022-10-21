function counter() {
  let countdown = 2;
  let timer = setInterval(function () {
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = ".."
    }
  }, 1000);
}
