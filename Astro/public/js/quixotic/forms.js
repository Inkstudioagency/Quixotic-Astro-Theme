/* Quixotic: form submissions outside Webflow.
   Every form keeps its original markup and success/error messages (.w-form-done / .w-form-fail).
   Submissions are POSTed (FormData) to the endpoint in <html data-form-endpoint>, which comes from
   PUBLIC_FORM_ENDPOINT in .env (works with Formspree, Getform, Basin, a serverless function, etc.).
   With no endpoint configured, the success message is shown so the theme demo stays usable.
   Runs in the capture phase so Webflow's own handler (which posts to Webflow's servers) never fires. */
(function () {
  var endpoint = document.documentElement.getAttribute("data-form-endpoint") || "";

  function show(el, visible) {
    if (el) el.style.display = visible ? "block" : "none";
  }

  document.addEventListener(
    "submit",
    function (event) {
      var form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      var block = form.closest("div.w-form");
      if (!block) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      var done = block.querySelector(":scope > .w-form-done");
      var fail = block.querySelector(":scope > .w-form-fail");
      var submit = form.querySelector('[type="submit"]');
      var label = submit ? submit.value : "";
      if (submit && submit.getAttribute("data-wait")) submit.value = submit.getAttribute("data-wait");
      show(fail, false);

      function finish(ok) {
        if (submit) submit.value = label;
        if (ok) {
          form.reset();
          show(form, false);
          show(done, true);
        } else {
          show(fail, true);
        }
      }

      if (!endpoint) {
        finish(true);
        return;
      }

      var data = new FormData(form);
      data.append("form-name", form.getAttribute("data-name") || form.getAttribute("name") || "Form");
      data.append("page", window.location.pathname);
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          finish(res.ok);
        })
        .catch(function () {
          finish(false);
        });
    },
    true
  );
})();
