Wabisabi is a completely modular operating system based on `wasi` and `wadi` specifications. It's usable by simply using a web component and declaring the kernel modules that should be used.

```html
<script src="https://cdn.jsdelivr.net/gh/richardanaya/wasabi/wasabi.js"></script>
<wabisabi-os>
    <module src="https://cdn.jsdelivr.net/gh/richardanaya/wasabi/terminal.wasm"/>
    <module src="https://cdn.jsdelivr.net/gh/richardanaya/wasabi/filesystem.wasm"/>
</wabisabi-os>
```