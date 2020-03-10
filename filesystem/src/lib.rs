use cstring::{cstr};
use js_ffi::*;

#[no_mangle]
pub fn init() {
    js!(console.log).invoke_1("Hello filesystem");
}

#[no_mangle]
pub fn name() -> i32 {
    cstr("filesystem")
}
