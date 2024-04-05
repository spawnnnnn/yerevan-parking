
document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("online", onDeviceReadyForNetwork, false);



const LangData = {
    ru: {
        default: true,
        desc: 'Русский',
        icon: 'App.Modules.Lang.Icons.Countries.RU',
        dateformat: 'ru-RU',
        numberformat: 'ru-RU'
    },
    en: {
        default: false,
        desc: 'English',
        icon: 'App.Modules.Lang.Icons.Countries.US',
        dateformat: 'en-US',
        numberformat: 'en-US'
    },
    hy: {
        default: false,
        desc: 'Հայերեն',
        icon: 'App.Modules.Lang.Icons.Countries.AM',
        dateformat: 'ru-RU',
        numberformat: 'ru-RU'
    }
}

function onDeviceReadyForNetwork() {

}

function LoadScript(url, id = null, parentTag = 'head') {

    if (document.getElementById(id)) {
        return Promise.resolve(id);
    }

    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = url;
        script.onload = () => {
            resolve(script.id);
        };
        script.onerror = (e) => {
            reject(e);
        };
        script.id = id ? id : 'script_' + (new Date()).getTime();
        document.getElementsByTagName(parentTag)[0].appendChild(script);
    });

}

function LoadStyles(url, id = null) {

    if (document.getElementById(id)) {
        return new Promise((resolve, reject) => {
            resolve(id);
        });
    }

    return new Promise((resolve, reject) => {
        var link = document.createElement('link');
        link.async = true;
        link.defer = true;
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => {
            resolve(link.id);
        };
        link.onerror = (e) => {
            reject(e);
        };
        link.id = id ? id : 'link_' + (new Date()).getTime();
        document.getElementsByTagName('head')[0].appendChild(link);
    });

}

function Cookie(c_name) {
    if(WKWebViewCookies) {
        return WKWebViewCookies[c_name];
    } else {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substring(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substring(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name)
                return decodeURIComponent(y);
        }
        return null;
    }
}

function onDeviceReady() {

    let lang = window.localStorage.getItem('lang');
    if (!lang) {
        lang = 'hy';
    }
    const cssFile = 'bundle.' + lang + '.css';
    const jsFile = 'bundle.' + lang + '.js';

    window.skipLocalNotificationReady = true;

    Promise.all([
        LoadStyles('./../css/' + cssFile),
        LoadScript('./../js/' + jsFile, null, 'body')
    ]).then(responses => {

        App.InitializeApplication(
            'yerevan-parking',
            1,
            Colibri.Web.Router.RouteOnHash,
            Colibri.IO.Request.RequestEncodeTypeEncrypted,
            true,
            false,
            'https://ypark.colibrilab.pro',
            'hy-AM',
            'hy-AM',
            {
                code: 'AMD',
                symbol: '֏'
            }
        ).finally(() => {
            App.appVersion = '1.0.31.0';
            App.Device.backgroundMode = true;
        });

   });


}
