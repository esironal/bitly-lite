/**
*
* @author Kai Mallea (kmallea@gmail.com)
*/

// TODO: Additional logic, add comments, re-factor code

var Bitly = (function () {
    var login = "",
        apiKey = "",
        domain = 'bit.ly',
        format = 'json',
        apiUrl = "http://api.bit.ly/v3/{{mode}}?",
        callbackHandler,
        e,
        head = document.getElementsByTagName("head")[0];

    function constructUrl (data, mode) {
        var q = "";
        
        if (login && apiKey) {
            q += "login=" + login + "&apiKey=" + apiKey + "&";
        }
        
        switch (mode) {
            case 'shorten':
                q += 'longUrl=' + encodeURIComponent(data);
                break;
            case 'expand':
                q += 'shortUrl=' + encodeURIComponent(data);
                break;
            case 'validate':
                q += 'x_login=' + data.x_login + "&x_apiKey=" + data.x_apiKey;
                break;
            default:
                q += 'longUrl=' + encodeURIComponent(data);
                break;
        }

        q += "&domain=" + domain + "&format=" + format + "&callback=Bitly.callback";
        
        return apiUrl.replace('{{mode}}', mode) + q;
    }

    return {
        setLogin: function (l) {
            login = l || "";
            return this;
        },
        
        setKey: function (k) {
            apiKey = k || "";
            return this;
        },

        setDomain: function (d) {
            if (!d || typeof d !== 'string') { return this; };

            switch (d.toLowerCase()) {
                case 'bit.ly':
                    domain = d;
                    break;
                case 'j.mp':
                    domain = d;
                    break;
                default:
                    domain = 'bit.ly';
                    break;
            }
            return this;
        },

        setFormat: function (f) {
            if (!f || typeof f !== 'string') { return this; };

            switch (f.toLowerCase()) {
                case 'json':
                    format = f;
                    break;
                case 'xml':
                    format = f;
                    break;
                case 'txt':
                    format = f;
                    break;
                default:
                    format = 'json';
                    break;
            }
            return this;
        },

        setCallback: function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("Bitly: callback must be a function.");
            }

            callbackHandler = fn;

            return this;
        },

        shorten: function (longUrl) {
            e = document.createElement("script");
            e.src = constructUrl(longUrl, 'shorten');
            head.appendChild(e);
        },
        
        expand: function (shortUrl) {
            e = document.createElement("script");
            e.src = constructUrl(shortUrl, 'expand');
            head.appendChild(e);
        },

        validate: function (x_login, x_apiKey) {
            e = document.createElement("script");
            e.src = constructUrl({'x_login': x_login, 'x_apiKey': x_apiKey}, 'validate');
            head.appendChild(e);
        },

        callback: function (response) {
            callbackHandler(response);
        }
    };
}());