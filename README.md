# Clipboard Guard

Browser extension that blocks the `navigator.clipboard.read*` APIs when you
haven't recently pressed Meta+V.

(Using a different hotkey? Search `e.metaKey && e.key === 'v'` and update it.)

## Why?

Your clipboard can contain sensitive information (passwords, access keys, etc)
that should never be provided to an app unintentionally.

The `navigator.clipboard.read*` APIs allow applications to read your clipboard
on arbitrary click events.

These APIs require a permission dialog to enable, but the APIs have other
benefits, so apps can have a legitimate reason to ask for them.

Once enabled, a malicious app can then read your clipboard as you interact with
it, monitoring for passwords, access keys, etc.

Clipboard Guard intercepts these APIs and only allows them when you have pressed
Meta+V in the last 500ms. After all, it's definitely ok to paste when you have
actually intentionally pasted. I'm not sure why these APIs allow reading the
clipboard under other circumstances.

## Install

Firefox users: `navigator.clipboard.read*` is not supported anyway. You don't
need this extension.

Non-chromium users: please
[file an issue](https://github.com/voltrevo/clipboard-guard/issues/new).

1. Go to chrome://extensions
2. Enable developer mode (top-right corner)
3. Drag the `extension` directory into this window

## Test

You can test this by going to https://async-clipboard-text.glitch.me/.

1. Copy some text
2. Click the paste button
3. Allow permissions
4. Nothing should be pasted (and console displays warning)
5. Press Meta+V (Ctrl+V or Cmd+V) and quickly click the paste button
6. The text should be pasted

## Disclaimer

I'm not aware of how a malicious app might work around this extension, but I
cannot guarantee it. If you put sensitive information in your clipboard, I
advise you to avoid interacting with unrelated apps, and clear your clipboard as
soon as you no longer need it.

## License

Public domain. See [UNLICENSE](./UNLICENSE).
