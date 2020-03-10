var js_ffi = {
  run: function(cfg) {
    //allocator
    let allocations = [undefined, null, console, window, document];
    let empty = [];
    function allocate(value) {
      const i = empty.length > 0 ? empty.pop() : allocations.length;
      allocations[i] = value;
      return i;
    }
    function allocator_release(handle) {
      if (handle > 4) {
        delete allocations[handle];
        empty.push(handle);
      }
    }
    function allocator_get(handle) {
      if (handle < 0) {
        return;
      }
      const ret = allocations[handle];
      if (handle !== 0 && !ret) {
        console.error(`Asked for ${handle} after it was released.`);
      }
      return ret;
    }

    let functions = [
      // get property
      (o,p) => {
        return o[p];
      },
      // set property
      (o,p,v) => {
        o[p] = v;
      }
    ];
    let mod = null;

    const TYPE_NOTHING = 0;
    const TYPE_NUM = 1;
    const TYPE_STRING = 2;
    const TYPE_BOOL = 3;
    const TYPE_FUNCTION = 4;
    const TYPE_OBJ = 5;
    const TYPE_UINT8_ARRAY = 6;
    const TYPE_INT8_ARRAY = 7;
    const TYPE_UINT8CLAMPED_ARRAY = 8;
    const TYPE_INT16_ARRAY = 9;
    const TYPE_UINT16_ARRAY = 10;
    const TYPE_INT32_ARRAY = 11;
    const TYPE_UINT32_ARRAY = 12;
    const TYPE_F32_ARRAY = 13;
    const TYPE_F64_ARRAY = 14;
    const TYPE_BI64_ARRAY = 15;
    const TYPE_BUI64_ARRAY = 16;
    const TYPE_MEMORY = 17;

    const utf8dec = new TextDecoder("utf-8");
    const utf8enc = new TextEncoder("utf-8");

    function createString(str) {
      let bytes = utf8enc.encode(str + String.fromCharCode(0));
      let len = bytes.length;
      let start = mod.instance.exports.jsffimalloc(len);
      const memory = new Uint8Array(mod.instance.exports.memory.buffer);
      memory.set(bytes, start);
      return start;
    }

    function createTypedArray(r,t,size){
      let start = mod.instance.exports.jsffimalloc(size*r.length+4);
      let memory = new Uint32Array(mod.instance.exports.memory.buffer);
      memory[start/4] = r.length;
      let data_start = (start+4)/size;
      memory = new t(mod.instance.exports.memory.buffer);
      for(let i=0;i<r.length;i++){
        memory[data_start+i] = r[i];
      }
      return start;
    }

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

    function getTypedArrayFromMemory(t, mem, start, size) {
      const data32 = new Uint32Array(mem);
      const ptr = data32[start / 4];
      const offset = data32[ptr / 4];
      const length = data32[ptr / 4 + 1];
      let b = mem.slice(offset, offset + length * size);
      let a = new t(b);
      return a;
    }

    function convertArgument(val_type, val) {
      if (val_type == TYPE_NUM) {
      } else if (val_type === TYPE_NOTHING) {
        val = undefined;
      } else if (val_type === TYPE_STRING) {
        val = getStringFromMemory(mod.instance.exports.memory.buffer, val);
      } else if (val_type === TYPE_BOOL) {
        val = val != 0;
      } else if (val_type === TYPE_OBJ) {
        val = allocator_get(val);
      } else if (val_type === TYPE_FUNCTION) {
        let id = val;
        val = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
          let l = arguments.length;
          if (l === 0) {
            mod.instance.exports.jsfficallback(
              id,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            );
          } else if (l === 1) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            );
          } else if (l === 2) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            );
          } else if (l === 3) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              0,
              0,
              0,
              0,
              0,
              0,
              0
            );
          } else if (l === 4) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              convertResponse(a4),
              0,
              0,
              0,
              0,
              0,
              0
            );
          } else if (l === 5) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              convertResponse(a4),
              convertResponse(a5),
              0,
              0,
              0,
              0,
              0
            );
          } else if (l === 6) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              convertResponse(a4),
              convertResponse(a5),
              convertResponse(a6),
              0,
              0,
              0,
              0
            );
          } else if (l === 7) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              convertResponse(a4),
              convertResponse(a5),
              convertResponse(a6),
              convertResponse(a7),
              0,
              0,
              0
            );
          } else if (l === 8) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              convertResponse(a4),
              convertResponse(a5),
              convertResponse(a6),
              convertResponse(a7),
              convertResponse(a8),
              0,
              0
            );
          } else if (l === 9) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              convertResponse(a4),
              convertResponse(a5),
              convertResponse(a6),
              convertResponse(a7),
              convertResponse(a8),
              convertResponse(a9),
              0
            );
          } else if (l === 10) {
            mod.instance.exports.jsfficallback(
              id,
              convertResponse(a1),
              convertResponse(a2),
              convertResponse(a3),
              convertResponse(a4),
              convertResponse(a5),
              convertResponse(a6),
              convertResponse(a7),
              convertResponse(a8),
              convertResponse(a9),
              convertResponse(a10)
            );
          }
        };
      } else if (val_type === TYPE_UINT8_ARRAY) {
        val = getTypedArrayFromMemory(
          Uint8Array,
          mod.instance.exports.memory.buffer,
          val,
          1
        );
      } else if (val_type === TYPE_INT8_ARRAY) {
        val = getTypedArrayFromMemory(
          Int8Array,
          mod.instance.exports.memory.buffer,
          val,
          1
        );
      } else if (val_type === TYPE_F32_ARRAY) {
        val = getTypedArrayFromMemory(
          Float32Array,
          mod.instance.exports.memory.buffer,
          val,
          4
        );
      } else if (val_type === TYPE_F64_ARRAY) {
        val = getTypedArrayFromMemory(
          Float64Array,
          mod.instance.exports.memory.buffer,
          val,
          8
        );
      } else if (val_type === TYPE_INT32_ARRAY) {
        val = getTypedArrayFromMemory(
          Int32Array,
          mod.instance.exports.memory.buffer,
          val,
          4
        );
      } else if (val_type === TYPE_UINT32_ARRAY) {
        val = getTypedArrayFromMemory(
          Uint32Array,
          mod.instance.exports.memory.buffer,
          val,
          4
        );
      } else if (val_type === TYPE_INT16_ARRAY) {
        val = getTypedArrayFromMemory(
          Int16Array,
          mod.instance.exports.memory.buffer,
          val,
          2
        );
      } else if (val_type === TYPE_UINT16_ARRAY) {
        val = getTypedArrayFromMemory(
          Uint16Array,
          mod.instance.exports.memory.buffer,
          val,
          2
        );
      } else if (val_type === TYPE_MEMORY) {
        val = mod.instance.exports.memory.buffer;
      }else {
        throw error("Unknown data type");
      }
      return val;
    }

    function convertResponse(r) {
      const type = typeof r;
      if (type === "string") {
        return createString(r);
      } else if (type === "number") {
        return r;
      } else if (r === undefined) {
        return 0;
      } else if (r === null) {
        return 1;
      } else if (r === true) {
        return 1;
      } else if (r === false) {
        return 0;
      } else if (r.constructor === Float32Array) {
        return createTypedArray(r,Float32Array,4)
      } else if (r.constructor === Uint8Array) {
        return createTypedArray(r,Uint8Array,1)
      } else if (r.constructor === Int8Array) {
        return createTypedArray(r,Int8Array,1)
      } else if (r.constructor === Float64Array) {
        return createTypedArray(r,Float64Array,8)
      } else if (r.constructor === Int32Array) {
        return createTypedArray(r,Int32Array,4)
      } else if (r.constructor === Uint32Array) {
        return createTypedArray(r,Uint32Array,4)
      } else if (r.constructor === Int16Array) {
        return createTypedArray(r,Int16Array,2)
      } else if (r.constructor === Uint16Array) {
        return createTypedArray(r,Uint16Array,2)
      }
      return allocate(r);
    }
    if (typeof cfg === "string") {
      cfg = { path: cfg };
    }
    let result = {}
    fetch(cfg.path)
      .then(response => response.arrayBuffer())
      .then(bytes =>
        WebAssembly.instantiate(bytes, cfg.overrides || {
          env: Object.assign({
            jsffithrowerror: function(e) {
              let err = getStringFromMemory(
                mod.instance.exports.memory.buffer,
                e
              );
              console.error(err);
              throw new Error("Web assembly module exited unexpectedly.");
            },
            jsffirelease: function(obj) {
              allocator_release(obj);
            },
            jsffiregister: function(code) {
              code = getStringFromMemory(
                mod.instance.exports.memory.buffer,
                code
              );
              let id = functions.length;
              functions.push(eval("("+code+")"));
              return id;
            },
            jsfficall0: function(obj, f) {
              return convertResponse(functions[f].call(allocator_get(obj)));
            },
            jsfficall1: function(obj, f, a1_type, a1) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1)
                )
              );
            },
            jsfficall2: function(obj, f, a1_type, a1, a2_type, a2) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2)
                )
              );
            },
            jsfficall3: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3)
                )
              );
            },
            jsfficall4: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3,
              a4_type,
              a4
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3),
                  convertArgument(a4_type, a4)
                )
              );
            },
            jsfficall5: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3,
              a4_type,
              a4,
              a5_type,
              a5
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3),
                  convertArgument(a4_type, a4),
                  convertArgument(a5_type, a5)
                )
              );
            },
            jsfficall6: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3,
              a4_type,
              a4,
              a5_type,
              a5,
              a6_type,
              a6
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3),
                  convertArgument(a4_type, a4),
                  convertArgument(a5_type, a5),
                  convertArgument(a6_type, a6)
                )
              );
            },
            jsfficall7: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3,
              a4_type,
              a4,
              a5_type,
              a5,
              a6_type,
              a6,
              a7_type,
              a7
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3),
                  convertArgument(a4_type, a4),
                  convertArgument(a5_type, a5),
                  convertArgument(a6_type, a6),
                  convertArgument(a7_type, a7)
                )
              );
            },
            jsfficall8: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3,
              a4_type,
              a4,
              a5_type,
              a5,
              a6_type,
              a6,
              a7_type,
              a7,
              a8_type,
              a8
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3),
                  convertArgument(a4_type, a4),
                  convertArgument(a5_type, a5),
                  convertArgument(a6_type, a6),
                  convertArgument(a7_type, a7),
                  convertArgument(a8_type, a8)
                )
              );
            },
            jsfficall9: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3,
              a4_type,
              a4,
              a5_type,
              a5,
              a6_type,
              a6,
              a7_type,
              a7,
              a8_type,
              a8,
              a9_type,
              a9
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3),
                  convertArgument(a4_type, a4),
                  convertArgument(a5_type, a5),
                  convertArgument(a6_type, a6),
                  convertArgument(a7_type, a7),
                  convertArgument(a8_type, a8),
                  convertArgument(a9_type, a9)
                )
              );
            },
            jsfficall10: function(
              obj,
              f,
              a1_type,
              a1,
              a2_type,
              a2,
              a3_type,
              a3,
              a4_type,
              a4,
              a5_type,
              a5,
              a6_type,
              a6,
              a7_type,
              a7,
              a8_type,
              a8,
              a9_type,
              a9,
              a10_type,
              a10
            ) {
              return convertResponse(
                functions[f].call(
                  allocator_get(obj),
                  convertArgument(a1_type, a1),
                  convertArgument(a2_type, a2),
                  convertArgument(a3_type, a3),
                  convertArgument(a4_type, a4),
                  convertArgument(a5_type, a5),
                  convertArgument(a6_type, a6),
                  convertArgument(a7_type, a7),
                  convertArgument(a8_type, a8),
                  convertArgument(a9_type, a9),
                  convertArgument(a10_type, a10)
                )
              );
            }
          },(cfg.imports || {}))
        }).then(module => {
          mod = module;
          result.instance = module.instance;
          if (cfg.onLoad) {
            cfg.onLoad(module);
          }
          if(cfg.entry !== null){
            module.instance.exports[cfg.entry || "main"]();
          }
        })
      );
    return result;
  }
};
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
    return new Promise((resolve, reject) => {
      this.module = js_ffi.run({
        path: this.url,
        entry: null,
        imports: {
          register_scope: this.register_scope.bind(this),
          device_error: this.device_error.bind(this)
        },
        onLoad: () => {
          let n = this.module.instance.exports.name();
          this.name = getStringFromMemory(
            this.module.instance.exports.memory.buffer,
            n
          );
          console.log('"' + this.name + '" module loading');
          this.module.instance.exports.init();
          resolve();
        }
      });
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

  allocateString(str) {
    let bytes = utf8enc.encode(str + String.fromCharCode(0));
    let len = bytes.length;
    let start = this.module.instance.exports.malloc(len);
    const memory = new Uint8Array(this.module.instance.exports.memory.buffer);
    memory.set(bytes, start);
    return start;
  }

  allocateData( data ) {
    let pos = this.module.instance.exports.malloc(data.length);
    const mem = new Uint8Array(this.module.instance.exports.memory);
    for(let i = 0 ; i < data.length; i++){
      mem[pos+i] = data[i];
    }
    return pos;
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
    let imports = {
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
    };
    return new Promise((resolve, reject) => {
      this.module = js_ffi.run({
        path: this.app,
        entry: "_start",
        overrides: {
          wasi_snapshot_preview1: imports,
          wasi: imports
        }
      });
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

  fd_write(fd, dataSpec) {
    let data = this.extractData(dataSpec);
    this.kernel.sendDataToFile(fd, data);
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

  extractData(dataSpec) {
    return new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
  }
}

class WabiSabiKernel extends HTMLElement {
  constructor() {
    super();
    this.modules = [];
  }

  connectedCallback() {
    this.init().then();
  }

  async init() {
    this.shadow = this.attachShadow({ mode: "open" });
    let modules = this.querySelectorAll("kernel-module");
    for (let m = 0; m < modules.length; m++) {
      await this.loadModule(modules[m].getAttribute("src"));
    }
    let startupProcess = this.getAttribute("run");
    if (startupProcess) {
      await this.runProcess(startupProcess, 0, 1);
    }
  }

  async loadModule(modUrl) {
    self.wabisabi = this;
    let mod = new KernelModule(this, modUrl);
    this.modules.push(mod);
    await mod.init();
  }

  async runProcess(app, input, output) {
    let proc = new Process(this, app, input, output);
    await proc.run();
  }

  sendDataToFile(fd, data) {
    let path = this.getPath(fd);
    let mod = this.getModuleWithScope(path);
    this.writeToModule(path, mod, data);
  }

  getPath(fd, data) {
    // todo: get path from open files
    return "/kernel/stdout";
  }

  getModuleWithScope(path, data) {
    // todo: look through modules to find which one handles path
    return this.modules[0];
  }

  writeToModule(path, mod, data) {
    let dataPtr = mod.allocateData(data);
    let pathPtr = mod.allocateString(path);
    mod.module.instance.exports.write(pathPtr, dataPtr, data.length);
  }
}
window.customElements.define("wabisabi-kernel", WabiSabiKernel);
