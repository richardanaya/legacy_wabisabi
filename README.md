Wabisabi is a completely modular operating system based on `wasi` and `wadi` specifications. It's usable by simply using a web component and declaring the kernel modules that should be used.

```html
<wabisabi-kernel>
    <kernel-module src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/terminal.wasm"/>
    <kernel-module src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/filesystem.wasm"/>
    <kernel-module src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/framebuffer.wasm"/>
</wabisabi-kernel>
<script src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/wabisabi.js"></script>
```

See it running [here](https://richardanaya.github.io/wabisabi/demo.html)