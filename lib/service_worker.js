// Service worker to bootstrap existing background scripts for Manifest V3
importScripts('config.js');
importScripts('chrome.js');
importScripts('runtime.js');
importScripts('common.js');
// rules.js is also used as content script; load it if background logic requires it
try { importScripts('../data/rules/rules.js'); } catch (e) {}
