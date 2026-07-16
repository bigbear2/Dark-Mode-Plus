var core = {
  "start": function () {
    core.load();
    core.init.storage();
  },
  "install": function (e) {
    core.load();
    core.init.storage(e);
  },
  "load": function () {
    core.update.button(config.addon.state)
    /*  */
    app.contextmenu.create({
      "contexts": ["page"],
      "id": "dark-mode-contextmenu",
      "title": "Exclude from dark mode"
    }, app.error);
  },
  "update": {
    "button": function (state) {
      app.button.title("Current State: " + state.toUpperCase());
      app.button.icon({
        "16": "../../data/icons/" + (state ? state + '/' : '') + "16.png",
        "32": "../../data/icons/" + (state ? state + '/' : '') + "32.png",
        "48": "../../data/icons/" + (state ? state + '/' : '') + "48.png",
        "64": "../../data/icons/" + (state ? state + '/' : '') + "64.png"
      });
    },
    "page": function (e, reload) {
        // send a copy of storage to the target tab, injecting per-site override if present
        try {
          var topUrl = e ? e.top : null;
          var hostname = topUrl ? config.hostname(topUrl) : (e && e.hostname ? e.hostname : '');
          var storageCopy = Object.assign({}, app.storage.local);
          var siteScope = config.preference.scope(storageCopy);
          var siteState = config.preference.site.state(storageCopy, topUrl || (e && e.uri ? e.uri : ''));
          storageCopy.site_state = siteState;
          storageCopy.site_scope = siteScope;
          app.page.send("storage", {
            "reload": reload,
            "top": topUrl,
            "uri": e ? e.uri : null,
            "storage": storageCopy,
            "frameId": e ? e.frameId : null,
            "hostname": hostname
          }, e ? e.tabId : null, e ? e.frameId : null);
        } catch (ex) {
          app.page.send("storage", {
            "reload": reload,
            "top": e ? e.top : null,
            "uri": e ? e.uri : null,
            "storage": app.storage.local,
            "frameId": e ? e.frameId : null,
            "hostname": e ? e.hostname : null
          }, e ? e.tabId : null, e ? e.frameId : null);
        }
    }
  },
  "init": {
    "storage": function () {
      chrome.storage.local.get(null, function (data) {
        var tmp = {};
        var active = "dark_" + 41;
        /*  */
        tmp["custom"] = data.custom !== undefined ? data.custom : '';
        tmp["state"] = data.state !== undefined ? data.state : "light";
        tmp["site_scope"] = data.site_scope !== undefined ? data.site_scope : "host";
        tmp["whitelist"] = data.whitelist !== undefined ? data.whitelist : [];
        tmp["cookie"] = data.cookie !== undefined ? data.cookie : config.exception.keys;
        tmp["nativeignore"] = data.nativeignore !== undefined ? data.nativeignore : false;
        tmp["nativeforceborder"] = data.nativeforceborder !== undefined ? data.nativeforceborder : true;
        tmp["native"] = data.native !== undefined ? data.native : website.custom.native.css.replace(/        /g, '');
        tmp["supportpage"] = data.supportpage !== undefined ? data.supportpage : navigator.userAgent.toLowerCase().indexOf("firefox") === -1;
        tmp["enable_log"] = data.enable_log !== undefined ? data.enable_log : false;
        /*  */
        tmp["section-1"] = data["section-1"] !== undefined ? data["section-1"] : false;
        tmp["section-2"] = data["section-2"] !== undefined ? data["section-2"] : false;
        tmp["section-3"] = data["section-3"] !== undefined ? data["section-3"] : false;
        tmp["section-4"] = data["section-4"] !== undefined ? data["section-4"] : true;
        tmp["section-5"] = data["section-5"] !== undefined ? data["section-5"] : false;
        /*  */
        for (var i = 1; i <= website.total.themes.number; i++) tmp["dark_" + i] = data["dark_" + i] !== undefined ? data["dark_" + i] : false;
        for (var name in website.custom.regex.rules) tmp[name] = data[name] !== undefined ? data[name] : true;
        tmp[active] = data[active] !== undefined ? data[active] : true;
        /*  */
        chrome.storage.local.set(tmp, function () {});
      });
    }
  }
};

app.button.on.clicked(function () {
  // Toggle and save theme for current site (per-site preference)
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    if (!tabs || !tabs.length) return;
    var tab = tabs[0];
    var hostname = config.hostname(tab.url || '');
    var scope = app.storage.local.site_scope === "url" ? "url" : "host";
    var key = "site_" + config.preference.site.key(tab.url || '', scope);
    var current = config.preference.site.state(app.storage.local, tab.url || '');
    var newState = current === "dark" ? "light" : "dark";
    app.storage.write(key, newState, function () {
      // prepare a transient storage object for this tab with site override
      var tmp = Object.assign({}, app.storage.local);
      tmp.site_state = newState;
      // send update only to the current tab to apply immediately
      app.page.send("storage", {
        "reload": false,
        "top": tab.url,
        "uri": tab.url,
        "storage": tmp,
        "frameId": 0,
        "hostname": hostname
      }, tab.id, 0);
      core.update.button(newState);
    });
  });
});

app.page.receive("load", function (e) {core.update.page(e, false)});
app.page.receive("reload", function (e) {core.update.page(e, true)});

app.page.receive("native-dark-fetch-remote-style", function (e) {
  if (e.href) {
    fetch(e.href).then(r => r.text()).then(function (content) {
      if (content) {
        app.page.send("native-dark-content-remote-style", {
          "href": e.href,
          "content": content
        }, e ? e.tabId : null, e ? e.frameId : null);
      }
    }).catch(e => {});
  }
});

app.contextmenu.on.clicked(function (e) {
  if (e.menuItemId === "dark-mode-contextmenu") {
    var pageUrl = e.pageUrl;
    chrome.storage.local.get({"whitelist": []}, function (storage) {
      var whitelist = storage.whitelist;
      whitelist.push(config.hostname(pageUrl));
      whitelist = whitelist.filter(function (element, index, array) {return element && array.indexOf(element) === index});
      chrome.storage.local.set({"whitelist": whitelist}, function () {});
    });
  }
});

app.options.receive("dark-mode-item", function () {app.tab.open(app.homepage())});
app.options.receive("test-dark-mode", function () {app.tab.open(config.page.test)});
app.options.receive("open-support-page", function () {app.tab.open(app.homepage())});
app.options.receive("dark-theme-item", function () {app.tab.open(config.page.theme)});
app.options.receive("dark-new-tab-item", function () {app.tab.open(config.page.newtab)});
app.options.receive("youtube-tutorial", function () {app.tab.open(config.page.tutorial)});
app.options.receive("make-a-donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.on.startup(core.start);
app.on.installed(core.install);