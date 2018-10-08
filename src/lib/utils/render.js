export default class {
    constructor(node) {
        this.node = node;
        this.filter = {
            brightness: {
                value: null,
                default: 1
            },
            contrast: {
                value: null,
                default: 1
            },
            saturate: {
                value: null,
                default: 1
            },
            hueRotate: {
                value: null,
                default: 0
            },
            blur: {
                value: null,
                default: 0
            },
            rotate: {
                value: null,
                default: 0
            }
        };
    }

    brightness(Num) {
        this.filter.brightness.value = Num;
        this.done();
    }

    contrast(Num) {
        this.filter.contrast.value = Num;
        this.done();
    }

    saturate(Num) {
        this.filter.saturate.value = Num;
        this.done();
    }

    hueRotate(Num) {
        this.filter.hueRotate.value = Num;
        this.done();
    }

    blur(Num) {
        this.filter.blur.value = Num;
        this.done();
    }

    rotate(Num) {
        this.filter.rotate.value = Num;
        this.done();
    }

    done() {
        let filter = [];
        if (typeof this.filter.brightness.value === "number") filter.push(`brightness(${ this.filter.brightness.value })`);
        if (typeof this.filter.contrast.value === "number") filter.push(`contrast(${ this.filter.contrast.value })`);
        if (typeof this.filter.saturate.value === "number") filter.push(`saturate(${ this.filter.saturate.value })`);
        if (typeof this.filter.hueRotate.value === "number") filter.push(`hue-rotate(${ this.filter.hueRotate.value }deg)`);
        if (typeof this.filter.blur.value === "number") filter.push(`blur(${ this.filter.blur.value }px)`);
        const filterText = filter.join(" ");
        if(this.node.style.filter !== filterText) this.node.style.filter = filterText;
        if (typeof this.filter.rotate.value === "number") {
            this.node.style.transform = `rotate(${ this.filter.rotate.value }deg)`;
        }
    }

    reset(){
        for(let i in this.filter){
            this.filter[i].value = null;
        }
        this.done();
    }

    getVal(str) {
        return this.filter[str].value || this.filter[str].default;
    }
}
