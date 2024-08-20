const i18next = require("i18next");
const HttpBackend = require("i18next-http-backend");

let loadPath = "https://jsonplaceholder.typicode.com/osts/1";

i18next
  .use(HttpBackend)
  .init({
    backend: {
      loadPath: loadPath,
      customHeaders: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      parse(data, languages, namespaces) {
        console.log("languages", languages);
        console.log("namespaces", namespaces);
        return JSON.parse(data);
      },
    },
    lng: "en",
    fallbackLng: "en",
    defaultNS: "translation",
    ns: ["translation"],
    debug: true,
  })
  .then(() => {
    console.log(i18next.t("userId"));

    i18next.services.backendConnector.backend.options.loadPath =
      "https://jsonplaceholder.typicode.com/posts/1";

    setTimeout(() => {
      console.log("will reload");
      i18next.reloadResources().then(() => {
        console.log(i18next.t("userId"));
        console.log("reloaded");
      });
    }, 1000);
  });
