var shortcuts = {};

(function() {
    var shortcuts = [];
    var plusKeyCode = '+'.charCodeAt(0);
    var specialKeys = {
            'backspace':8,
            'tab':9,
            'return':13,
            'enter':13,
            'esc':27,
            'space':32,

            'left':37,
            'up':38,
            'right':39,
            'down':40,
            'pageup':33,
            'pagedown':34,

            'insert':45,
            'home':36,
            'delete':46,
            'end':35,

            'scrolllock':145,
            'capslock':20,
            'numlock':144,

            'f1':112,
            'f2':113,
            'f3':114,
            'f4':115,
            'f5':116,
            'f6':117,
            'f7':118,
            'f8':119,
            'f9':120,
            'f10':121,
            'f11':122,
            'f12':123
    };

    function handleKeyEvent(e) {
        var key = String.fromCharCode(e.which).toLowerCase().charCodeAt(0);

        for (var k = 0; k < shortcuts.length; k++) {
            var keyInfo = shortcuts[k];
            if (keyInfo.key == key
                && keyInfo.shiftKey == e.shiftKey
                && keyInfo.ctrlKey == e.ctrlKey
                && keyInfo.altKey == e.altKey
                && keyInfo.metaKey == e.metaKey) {
                    if (keyInfo.callback && keyInfo.callback(keyInfo)) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    break;
            }
        }
    }

    this.add = function(options) {
        var keyParts = options.keyDesc.toLowerCase()
                        .replace(/^\++/, '')
                        .replace(/\++$/, '+')
                        .split('+');
        var keyInfo = {
            key:0,
            shiftKey:false,
            ctrlKey:false,
            altKey:false,
            metaKey:false,
            callback:typeof (options.callback) == "function" ? options.callback : null
        };

        for (var k = 0; k < keyParts.length; k++) {
            var keyPart = keyParts[k];
            if (keyPart.length == 0) {
                keyInfo.key = plusKeyCode;
            } else if (keyPart.length == 1) {
                keyInfo.key = keyPart.charCodeAt(0);
            } else {
                var special = specialKeys[keyPart];
                if (special) {
                    keyInfo.key = special;
                } else if (typeof (keyInfo[keyPart + 'Key']) != 'undefined') {
                    keyInfo[keyPart + 'Key'] = true;
                }
            }
        }
        shortcuts.push(keyInfo);
    }

    this.install = function() {
        window.addEventListener('keydown', handleKeyEvent, false);
    }

    this.uninstall = function() {
        window.removeEventListener('keydown', handleKeyEvent, false);
    }
}).apply(shortcuts);
