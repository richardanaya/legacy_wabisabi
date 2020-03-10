use wadi::{cstr, CString, register_scope};
use js_ffi::*;

#[no_mangle]
pub fn init() {
    register_scope("/kernel/stdout");
    register_scope("/kernel/stdin");
    register_scope("/kernel/stderr");
}
 
#[no_mangle]
pub fn name() -> CString {
    cstr("terminal")
}
