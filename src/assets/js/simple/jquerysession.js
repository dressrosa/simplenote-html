/* eslint-disable */
(function ($) {
    $.session = {

        _id: null,

        _cookieCache: undefined,

        _init: function () {
            if (!window.name) {
                window.name = Math.random();
            }
            this._id = window.name;
            this._initCache();

            // See if we've changed protcols
            var matches = (new RegExp(this._generatePrefix() + "=([^;]+);")).exec(document.cookie);
            if (matches && document.location.protocol !== matches[1]) {
                this._clearSession();
                for (var key in this._cookieCache) {
                    try {
                        if (this._isPC()) {
                            window.sessionStorage.setItem(key, this._cookieCache[key]);
                        } else {
                            window.localStorage.setItem(key, this._cookieCache[key]);
                        }
                    } catch (e) {
                    };
                }
            }

            document.cookie = this._generatePrefix() + "=" + document.location.protocol + ';path=/;expires='
                + (new Date((new Date).getTime() + 86400)).toUTCString();

        },

        _generatePrefix: function () {
            return '__session:' + this._id + ':';
        },

        _initCache: function () {
            var cookies = document.cookie.split(';');
            this._cookieCache = {};
            for (var i in cookies) {
                var kv = cookies[i].split('=');
                if ((new RegExp(this._generatePrefix() + '.+')).test(kv[0]) && kv[1]) {
                    this._cookieCache[kv[0].split(':', 3)[2]] = kv[1];
                }
            }
        },

        _setFallback: function (key, value, onceOnly) {
            var cookie = this._generatePrefix() + key + "=" + value + "; path=/";
            if (onceOnly) {
                cookie += "; expires=" + (new Date(Date.now() + 10800)).toUTCString();
            }
            document.cookie = cookie;
            this._cookieCache[key] = value;
            return this;
        },

        _getFallback: function (key) {
            if (!this._cookieCache) {
                this._initCache();
            }
            return this._cookieCache[key];
        },

        _clearFallback: function () {
            for (var i in this._cookieCache) {
                document.cookie = this._generatePrefix() + i + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            this._cookieCache = {};
        },

        _deleteFallback: function (key) {
            document.cookie = this._generatePrefix() + key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            delete this._cookieCache[key];
        },

        _isPC: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        get: function (key) {
            return decodeURIComponent(this._isPC() ? window.sessionStorage.getItem(key) : window.localStorage.getItem(key))
                || decodeURIComponent(this._getFallback(key));
        },

        set: function (key, value, onceOnly) {
            /* solve chinese character cannot set to cookie */
            value = encodeURIComponent(value);
            try {
                if (this._isPC()) {
                    window.sessionStorage.setItem(key, value);
                } else {
                    window.localStorage.setItem(key, value);
                }
            } catch (e) {
            }
            this._setFallback(key, value, onceOnly || false);
            return this;
        },

        'delete': function (key) {
            return this.remove(key);
        },

        remove: function (key) {
            try {
                if (this._isPC()) {
                    window.sessionStorage.removeItem(key);
                } else {
                    window.localStorage.removeItem(key);
                }
            } catch (e) {
            };
            this._deleteFallback(key);
            return this;
        },

        _clearSession: function () {
            try {
                if (this._isPC()) {
                    window.sessionStorage.clear();
                } else {
                    window.localStorage.clear();
                }
            } catch (e) {
                if (this._isPC()) {
                    for (var i in window.localStorage) {
                        window.localStorage.removeItem(i);
                    }
                } else {
                    for (var i in window.localStorage) {
                        window.localStorage.removeItem(i);
                    }
                }

            }
        },

        clear: function () {
            this._clearSession();
            this._clearFallback();
            return this;
        }

    };
    $.session._init();

})($);