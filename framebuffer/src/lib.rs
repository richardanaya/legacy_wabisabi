use cstring::{cstr};
use js_ffi::*;

#[no_mangle]
pub fn init() {
    js!(console.log).invoke_1("Hello framebuffer");
}

#[no_mangle]
pub fn name() -> i32 {
    cstr("framebuffer")
}
