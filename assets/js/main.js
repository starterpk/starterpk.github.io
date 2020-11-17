!(function () {
  window;
  const e = document.documentElement;
  if (
    (e.classList.remove("no-js"),
    e.classList.add("js"),
    document.body.classList.contains("has-animations"))
  ) {
    (window.sr = ScrollReveal()).reveal(".reveal-on-scroll", {
      duration: 600,
      distance: "20px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "top",
      interval: 100,
    });
  }
})();

function fallbackCopyText(text, el) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    if (successful) addCopiedStyle(el);
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyText(text, el) {
  if (!navigator.clipboard) {
    fallbackCopyText(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      addCopiedStyle(el);
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function addCopiedStyle(el) {
  let element = document.getElementById(el);
  element.classList.add("copied");
  element.textContent = "Copied to clipboard!";
}
