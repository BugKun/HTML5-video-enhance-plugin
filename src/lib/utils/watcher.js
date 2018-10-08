export default class {
    constructor(value, deep) {
        this.curVal = null;
        this.oldVal = null;
        this.deep = deep;
        this.set(value);
    }

    set(value) {
        if(this.deep){

        }else {
            this.oldVal = this.curVal;
            this.curVal = value;
        }
    }

    get() {
        return {
            curVal: this.curVal,
            oldVal: this.oldVal
        };
    }

    diff() {

    }
}
