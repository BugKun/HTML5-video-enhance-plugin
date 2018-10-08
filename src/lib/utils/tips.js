export default class {
    constructor(node, options) {
        this.tips = null;
        this.isMounted = false;
        this.fadeTask = null;
        this.displayTask = null;

        this.init(node, options);
    }

    init(node, options) {
        const fontSize = options.fontSize || "20px",
            fontFamily = options.fontFamily || "'Microsoft Yahei', Verdana, Geneva, sans-serif",
            displayDuration = options.displayDuration || 2000,
            animateDuration = options.animateDuration || 500,
            float = false;

        this.options = {
            fontSize,
            fontFamily,
            displayDuration,
            animateDuration,
            float
        };

        this.tips = this.tips || document.createElement('div');

        this.tips.style.cssText = "display: none;" +
            "position: absolute;" +
            "top: 50%;" +
            "left: 50%;" +
            "transform: translate(-50%,-50%);" +
            "z-index: 9999;" +
            "padding: 10px;" +
            `transition: all ${ animateDuration }ms ease;` +
            "background: rgba(0,0,0,0.8);" +
            "color:white;" +
            "opacity: 0;" +
            `font-family: ${ fontFamily };` +
            `font-size:${ fontSize };` +
            "-webkit-font-smoothing: subpixel-antialiased;" +
            "user-select: none;";

        if (!this.float) node.style.position = "relative";

        if (!this.isMounted) this.appendChildElement(node);
    }

    appendChildElement(node) {
        node.appendChild(this.tips);
        this.isMounted = true;
    }

    setText(str) {
        this.tips.innerText = str;
        this.fadeIn();
        this.clearDisplayTask();
        this.displayTask = setTimeout(() => {
            this.fadeOut();
        }, this.options.displayDuration);
        return this;
    }

    fadeOut() {
        this.tips.style.opacity = 0;
        this.clearFadeTask();
        this.fadeTask = setTimeout(() => {
            this.tips.style.display = "none";
            this.fadeTask = null;
        }, this.options.animateDuration);
        return this;
    }

    fadeIn() {
        this.tips.style.display = "block";
        this.clearFadeTask();
        this.fadeTask = setTimeout(() => {
            this.tips.style.opacity = 1;
        }, 0);
        return this;
    }

    clearFadeTask() {
        if (this.fadeTask) {
            clearTimeout(this.fadeTask);
            this.fadeTask = null;
        }
    }

    clearDisplayTask() {
        if (this.displayTask) {
            clearTimeout(this.displayTask);
            this.displayTask = null;
        }
    }

    click(func) {
        this.tips.onclick = (typeof func === "function") ? func : null;
        return this;
    }

    getTipsNode() {
        return this.tips;
    }
}
