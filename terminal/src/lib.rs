#![no_std]
extern crate libw;
use libw::*;

#[no_mangle]
pub fn init() {
    println("i have started");
}
