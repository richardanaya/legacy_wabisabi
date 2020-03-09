class WabiSabiKernel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'});
        let modules = this.querySelectorAll("kernel-module");
        for(let m in modules){
            this.loadModule(modules[m].getAttribute("src"));
        }
    }

    loadModule(modUrl){
        window.wabisabi = this;
        js_ffi.run(modUrl)
    }
}
window.customElements.define('wabisabi-kernel', WabiSabiKernel);