use wadi::{cstr, CString, register_scope};
use js_ffi::*;

#[no_mangle]
pub fn init() {
    register_scope("/kernel/stdout")
}

#[no_mangle]
pub fn name() -> CString {
    cstr("terminal")
}
