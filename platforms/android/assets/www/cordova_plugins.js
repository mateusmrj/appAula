cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-secure-storage.SecureStorage",
        "file": "plugins/cordova-plugin-secure-storage/www/securestorage.js",
        "pluginId": "cordova-plugin-secure-storage",
        "clobbers": [
            "SecureStorage"
        ]
    },
    {
        "id": "cordova-plugin-secure-storage.sjcl_ss",
        "file": "plugins/cordova-plugin-secure-storage/www/sjcl_ss.js",
        "pluginId": "cordova-plugin-secure-storage",
        "runs": true
    },
    {
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "phonegap-plugin-push.PushNotification",
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "pluginId": "phonegap-plugin-push",
        "clobbers": [
            "PushNotification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-secure-storage": "2.6.3",
    "cordova-sqlite-storage": "1.5.1",
    "cordova-plugin-statusbar": "2.2.0",
    "cordova-plugin-splashscreen": "4.0.0",
    "phonegap-plugin-push": "1.9.1"
};
// BOTTOM OF METADATA
});