(function () {
  var pathRoot = document.body.getAttribute("data-path-to-root") || "./";
  var contactUrl = pathRoot + "index.html#kontakt";

  var contactPatterns = [
    /связаться с нами/i,
    /contact us/i,
    /запросить консультацию/i,
    /book appointment/i,
    /book now/i,
    /присоединяйся сейчас/i,
    /записаться/i
  ];

  var guidePatterns = [/получите руководство/i, /загрузить стоматологическое/i];

  function scrollToElement(el) {
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function resolveContactHref() {
    return document.getElementById("kontakt") ? "#kontakt" : contactUrl;
  }

  document.querySelectorAll("a[href='#']").forEach(function (link) {
    var text = (link.textContent || "").replace(/\s+/g, " ").trim();

    if (contactPatterns.some(function (pattern) { return pattern.test(text); })) {
      link.setAttribute("href", resolveContactHref());
      return;
    }

    if (guidePatterns.some(function (pattern) { return pattern.test(text); })) {
      var guideSection = document.getElementById("zapis") || document.getElementById("block-6");
      link.setAttribute("href", guideSection ? "#" + guideSection.id : resolveContactHref());
      return;
    }

    if (/читать далее/i.test(text)) {
      link.setAttribute("href", "#block-3");
      return;
    }

    if (/\d{3}[-\s(]?\d{3}[-\s)]?\d{3,4}/.test(text)) {
      link.setAttribute("href", "tel:+998712001234");
    }
  });

  document.querySelectorAll("a.u-btn-submit").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      var form = button.closest("form");
      if (form) {
        if (typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
      }
    });
  });

  document.querySelectorAll("form.u-inner-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var action = form.getAttribute("action") || "thank-you-page.html";
      window.location.href = new URL(action, window.location.href).href;
    });
  });

  if (location.hash) {
    window.addEventListener("load", function () {
      var target = document.querySelector(location.hash);
      if (target) {
        setTimeout(function () { scrollToElement(target); }, 200);
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      var target = document.querySelector(hash);
      if (target) {
        event.preventDefault();
        history.pushState(null, "", hash);
        scrollToElement(target);
      }
    });
  });
})();
