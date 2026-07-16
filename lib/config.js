var config = {};

config.addon = {
  set state (val) {app.storage.write("state", val)},
  get state () {return app.storage.read("state") !== undefined ? app.storage.read("state") : "light"}
};

config.page = {
  "test": "https://webbrowsertools.com/darkmode/",
  "theme": "https://github.com/bigbear2/Dark-Mode-Plus",
  "tutorial": "https://www.youtube.com/watch?v=-QmU-qxT8GY",
  "newtab": "about:newtab"
};

config.welcome = {
  set open (val) {app.storage.write("supportpage", val)},
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get open () {return app.storage.read("supportpage") !== undefined ? app.storage.read("supportpage") : true},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.preference = {
  "scope": function (storage) {
    return storage && storage.site_scope === "url" ? "url" : "host";
  },
  "site": {
    "key": function (url, scope) {
      if (!url) return '';
      var value = String(url).trim();
      if (!value) return '';
      if (scope === "url") {
        try {
          var parsed = new URL(value);
          return parsed.origin + parsed.pathname + parsed.search + parsed.hash;
        } catch (e) {
          return value;
        }
      }
      return config.hostname(value);
    },
    "state": function (storage, url) {
      var scope = config.preference.scope(storage);
      var currentKey = "site_" + config.preference.site.key(url, scope);
      if (storage && storage[currentKey] !== undefined) return storage[currentKey];
      var fallbackScope = scope === "url" ? "host" : "url";
      var fallbackKey = "site_" + config.preference.site.key(url, fallbackScope);
      if (storage && storage[fallbackKey] !== undefined) return storage[fallbackKey];
      return undefined;
    }
  }
};

config.hostname = function (url) {
  url = url.replace("www.", '');
  var s = url.indexOf("//") + 2;
  if (s > 1) {
    var o = url.indexOf('/', s);
    if (o > 0) return url.substring(s, o);
    else {
      o = url.indexOf('?', s);
      if (o > 0) return url.substring(s, o);
      else return url.substring(s);
    }
  } else return url;
};

config.exception = {
  "keys": [
    "ae=d",
    "f6=400",
    "darkmode=1",
    "theme:dark",
    "theme:night",
    "dark_mode=1",
    "nightmode=1",
    "night_mode=1",
    "theme:darkmode",
    "theme:nightmode",
    "twilight.theme:1"
  ]
};