const utf8dec = new TextDecoder("utf-8");
const utf8enc = new TextEncoder("utf-8");

function getStringFromMemory(mem, start) {
  const data = new Uint8Array(mem);
  const str = [];
  let i = start;
  while (data[i] !== 0) {
    str.push(data[i]);
    i++;
  }
  return utf8dec.decode(new Uint8Array(str));
}

class KernelModule {
  constructor(kernel, url) {
    this.kernel = kernel;
    this.url = url;
    this.scopes = [];
  }

  init() {
    this.module = js_ffi.run({
      path: this.url,
      entry: "init",
      imports: {
        register_scope: this.register_scope.bind(this),
        device_error: this.device_error.bind(this)
      }
    });
  }

  register_scope(scopePtr) {
    let scope = getStringFromMemory(
      this.module.instance.exports.memory.buffer,
      scopePtr
    );
    this.scopes.push(scope);
  }

  device_error(errPtr) {
    let err = getStringFromMemory(
      this.module.instance.exports.memory.buffer,
      errPtr
    );
    console.error(err);
  }
}

class Process {
  constructor(kernel, app, input, output) {
    this.kernel = kernel;
    this.app = app;
    this.input = input;
    this.output = output;
  }

  run() {
    this.module = js_ffi.run({
      path: app,
      entry: "_start",
      overrides: {
        args_get: this.args_get.bind(this),
        args_sizes_get: this.args_sizes_get.bind(this),
        environ_get: this.environ_get.bind(this),
        environ_sizes_get: this.environ_sizes_get.bind(this),
        clock_res_get: this.clock_res_get.bind(this),
        clock_time_get: this.clock_time_get.bind(this),
        fd_advise: this.fd_advise.bind(this),
        fd_allocate: this.fd_allocate.bind(this),
        fd_close: this.fd_close.bind(this),
        fd_datasync: this.fd_datasync.bind(this),
        fd_fdstat_get: this.fd_fdstat_get.bind(this),
        fd_fdstat_set_flags: this.fd_fdstat_set_flags.bind(this),
        fd_fdstat_set_rights: this.fd_fdstat_set_rights.bind(this),
        fd_filestat_get: this.fd_filestat_get.bind(this),
        fd_filestat_set_size: this.fd_filestat_set_size.bind(this),
        fd_filestat_set_times: this.fd_filestat_set_times.bind(this),
        fd_pread: this.fd_pread.bind(this),
        fd_prestat_get: this.fd_prestat_get.bind(this),
        fd_prestat_dir_name: this.fd_prestat_dir_name.bind(this),
        fd_pwrite: this.fd_pwrite.bind(this),
        fd_read: this.fd_read.bind(this),
        fd_readdir: this.fd_readdir.bind(this),
        fd_renumber: this.fd_renumber.bind(this),
        fd_seek: this.fd_seek.bind(this),
        fd_sync: this.fd_sync.bind(this),
        fd_tell: this.fd_tell.bind(this),
        fd_write: this.fd_write.bind(this),
        path_create_directory: this.path_create_directory.bind(this),
        path_filestat_get: this.path_filestat_get.bind(this),
        path_filestat_set_times: this.path_filestat_set_times.bind(this),
        path_link: this.path_link.bind(this),
        path_open: this.path_open.bind(this),
        path_readlink: this.path_readlink.bind(this),
        path_remove_directory: this.path_remove_directory.bind(this),
        path_rename: this.path_rename.bind(this),
        path_symlink: this.path_symlink.bind(this),
        path_unlink_file: this.path_unlink_file.bind(this),
        poll_oneoff: this.poll_oneoff.bind(this),
        proc_exit: this.proc_exit.bind(this),
        proc_raise: this.proc_raise.bind(this),
        sched_yield: this.sched_yield.bind(this),
        random_get: this.random_get.bind(this),
        sock_recv: this.sock_recv.bind(this),
        sock_send: this.sock_send.bind(this),
        sock_shutdown: this.sock_shutdown.bind(this)
      }
    });
  }

  args_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  args_sizes_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  environ_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  environ_sizes_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  clock_res_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  clock_time_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_advise() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_allocate() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_close() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_datasync() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_fdstat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_fdstat_set_flags() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_fdstat_set_rights() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_filestat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_filestat_set_size() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_filestat_set_times() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_pread() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_prestat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_prestat_dir_name() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_pwrite() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_read() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_readdir() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_renumber() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_seek() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_sync() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_tell() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  fd_write() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_create_directory() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_filestat_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_filestat_set_times() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_link() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_open() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_readlink() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_remove_directory() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_rename() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_symlink() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  path_unlink_file() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  poll_oneoff() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  proc_exit() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  proc_raise() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sched_yield() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  random_get() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sock_recv() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sock_send() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }

  sock_shutdown() {
    console.error("not implemented");
    debugger;
    throw new Error("Not implemented");
  }
}

class WabiSabiKernel extends HTMLElement {
  constructor() {
    super();
    this.modules = [];
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    let modules = this.querySelectorAll("kernel-module");
    for (let m = 0; m < modules.length; m++) {
      this.loadModule(modules[m].getAttribute("src"));
    }
  }

  loadModule(modUrl) {
    self.wabisabi = this;
    let mod = new KernelModule(this, modUrl);
    mod.init();
    this.modules.push(mod);
  }

  runProcess(app, input, output) {
    let p = new Process(this, app, input, output);
  }
}
window.customElements.define("wabisabi-kernel", WabiSabiKernel);
