function extend(path, targetId, page) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      const $ = document;
      $.getElementById(targetId).innerHTML = html;
      $.getElementById(page).classList.add("active-navbar");
    });
}
