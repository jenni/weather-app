## Weather app

Command line application to get the weather by location, sending requests to **Google Maps and Dark Sky API**.

```
➜  weather-app git:(master) ✗ node app/app.js --a kantstr. 1
It's currently 45.61 in Kantstraße, Berlin, Germany. It feels like 38.65.
```

#### Callbacks, Promise wrappers, Promise based library...

This repository shows three different ways of requesting data from **Dark Sky API**. These are:


* **Callbacks** : **`app/app.js`** : makes use of `request` library using its native callback support: `request({ opts }, callback)`. Callback hell building up much ; ) : **`-> node app/app.js --a 'address here'`** .

* **Promise wrappers** : **`app-request-promise.js`** : uses the `request` HTTP request client, non-compatible Promise library. `requests` have been wrapped in custom Promise declarations to use `promise chaining` or `async/await` : **`-> node app-request-promise.js --a berlin`** .
 
* **Calls via Promised based library** : **`app-axios-promise.js`** : requires `axios`, a Promise based HTTP client for node. The simplest and quickest way of requesting async data : **`-> node app-axios-promise.js --address lalala`**

**CLI help:**

```
➜  weather-app git:(master) ✗ node app/app.js --h
Options:
  --version      Show version number                                   [boolean]
  -a, --address  Address to fetch weather for                [string] [required]
  --help, -h     Show help                                             [boolean]
```