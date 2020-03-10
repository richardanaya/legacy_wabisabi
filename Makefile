build:
	cat src/js_ffi.js src/wabisabi.js > wabisabi.js
	cd terminal && make && mv terminal.wasm ../
	cd filesystem && make && mv filesystem.wasm ../
	cd framebuffer && make && mv framebuffer.wasm ../