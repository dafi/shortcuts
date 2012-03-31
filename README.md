Easy Keyboard Shortcuts Creator
=

Utility script to create keyboard shortcuts by string description

Methods
-

shortcuts.add
--

shortcuts.add({
                keyDesc:'Ctrl+Alt+O',
                callback:fn
        });

The keyDesc is a plain text description of the shortcut.
The callback is a function called with the shortcut is pressed, returns true to stop propagation

shortcuts.install
-
Install the listener keydown for the window

shortcuts.uninstall
-
Uninstall the listener keydown for the window

How to use
-

        function fn(keyInfo) {
            document.getElementById('result').value = "1 pressed " + keyInfo.key;
            return true;
        }
        shortcuts.add({
                keyDesc:'Ctrl+L',
                callback:fn
        });
        shortcuts.add({
                keyDesc:'Meta+L',
                callback:fn
        });
        shortcuts.install();
