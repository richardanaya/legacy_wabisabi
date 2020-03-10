Wabisabi is a microkernel operating system based on [`wasi`](https://wasi.dev/) and [`wadi`](https://github.com/richardanaya/wadi) specifications. It's usable by simply using a web component and declaring the kernel modules that should be used.

```html
<wabisabi-kernel src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/wabisabi.wasm">
    <kernel-module src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/terminal.wasm"/>
    <kernel-module src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/filesystem.wasm"/>
    <kernel-module src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/framebuffer.wasm"/>
</wabisabi-kernel>
<script src="https://cdn.jsdelivr.net/gh/richardanaya/wabisabi/wabisabi.js"></script>
```

See it running [here](https://richardanaya.github.io/wabisabi/demo.html)

The wabisabi kernel acts as an intermediary for handling wasi functionality and enabling applications to read and write to files. Modules allow the delegation of handling the reading/writing to specific files or even whole heirarchies of the filesystem. Modules can be loaded at startup or runtime.

# Special Files

Wabisabi only has few special files to operate:

* `/kernel/run` - a file that can be written into to run a process
* `/kernel/load` - a file that can be written into to load a module
* `/kernel/modules/` - a directory that lists actively running modules
* `/kernel/stdin` - a file scope that will handle file descriptor 0
* `/kernel/stdout` - a file scope that will handle file descriptor 1
* `/kernel/stderr` - a file scope that will handle file descriptor 2

# Starting a process

Start a process by specifying the wasm binary to run with input and output file

```rust
libw::write_text("/kernel/run","1234->12314->13241")
```

# List active modules

Active modules just show up as their name under the modules folder

```rust
libw::list_files("/kernel/modules/")
```

# Load a module

Load a module by writing a url into the modules directory

```rust
libw::write_text("/kernel/load","https://cowbell.app/cowbell.wasm")
```

# Unload a module

Unload a module by deleting it

```rust
libw::delete("/kernel/modules/cowbell")
```

# What are kernel modules?

Kernel modules are web assembly modules that conform to the [`wadi`](https://github.com/richardanaya/wadi) interface. In addition to [`wadi imported functions`](https://github.com/richardanaya/wadi/blob/master/README.md#wadi-host-interface), wabisabi also offers [`js_ffi imported functions`](https://github.com/richardanaya/js_ffi) for dynamic javascript invocation. Here's an example of a device that just triggers a window alert.

```rust
use wadi::{register_device,SUCCESS,BLOCK_FILE,CString,cstr}
use js_ffi::*;

#[no_mangle]
pub fn init() {
    register_scope("/dev/cowbell");
}

#[no_mangle]
pub fn write(path: CString, location:usize, size:usize, ptr usize) -> u32 {
    js!(window.alert).invoke_1("clonk!");
    SUCCESS
}

#[no_mangle]
pub fn name() -> usize {
    cstr("cowbell")
}
```

# License

This project is licensed under either of

 * Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or
   http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or
   http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in `wabisabi` by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.
