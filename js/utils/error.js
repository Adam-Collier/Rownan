let errorTemplate = message => {
  return `
  <div class="error">
    <p>Error: ${message}</p>
  </div>
  `;
};

let errorStrip = message => {
  document
    .querySelector("body")
    .insertAdjacentHTML("beforeend", errorTemplate(message));

  setTimeout(() => {
    document.querySelector(".error").remove();
  }, 7000);
};

module.exports = {
  errorStrip
};
