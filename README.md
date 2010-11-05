# bitly-lite
## "lite" because only contains the functions (shorten, expand, validate) used in my personal projects.

### Example Usage:

  function myCallback (response) {
      alert(response.data.url || response.data.expand[0].long_url || response.data.valid || response.status_code + ": " + response.status_txt);
  }

  // Initialization chain
  var b = Bitly
    .setLogin("bitlyapidemo")
    .setKey("R_0da49e0a9118ff35f52f629d2d71bf07")
    .setDomain("j.mp")
    .setCallback(myCallback);

  b.shorten("http://sc2.mallea.net/#p|0013|0251|0013|0221|0171|0014|0251|0181|0014|0171|0011|0022|0252|0301|0022|0371|0221|0012|0191|0251|0221|0123");
  b.shorten("http://code.google.com/chrome/extensions/devguide.html");
  b.expand("http://build.sc/bBt4CR");
  b.expand("http://j.mp/9cKvia");
  b.validate("johndoe", "1234");
