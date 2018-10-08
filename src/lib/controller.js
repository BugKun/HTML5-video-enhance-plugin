import Core from "./core";
import Render from "./utils/render";
import KeyProxy from "./utils/keyProxy";
import Tips from "./utils/tips";

export default class extends Core {
    constructor() {
        super();
        this.render = new Render(this.node);
        this.tips = new Tips(this.node, this.options.tips);
        this.keyProxy = new KeyProxy(this.options.keyProxy);
        this.mounte(this.keyProxy.keycodes, this.methods(), this.options.hooks);
    }

    mounte(keycodes, methods, hooks) {
        window.addEventListener("keydown", event => {

            //防止组合键冲突
            if (event.altKey || event.ctrlKey || event.shiftKey) return;

            for (let i in keycodes) {
                if (keycodes[i] === event.keyCode) {
                    if (hooks && hooks[i] && hooks[i].before instanceof Function) hooks[i].before();
                    if (!hooks || !hooks[i] || !hooks[i].preventDefault) {
                        methods[i]();
                    }
                    if (hooks && hooks[i] && hooks[i].after instanceof Function) hooks[i].after();
                    break;
                }
            }
        });
    }

    methods() {
        return {
            fastForward() {
                this.node.currentTime += 3;
                this.tips.setText("快进：3秒");
            },
            rewind() {
                this.node.currentTime -= 3;
                this.tips.setText("后退：3秒");
            },
            volumeUp() {
                let volume = this.node.volume;
                volume += 0.01;
                volume = volume > 1 ? 1 : volume;
                this.node.volume = volume;
                this.tips.setText(`音量：${parseInt(volume * 100)}%`);
            },
            volumeDown() {
                let volume = this.node.volume;
                volume -= 0.01;
                volume = volume < 0 ? 0 : volume;
                this.node.volume = volume;
                this.tips.setText(`音量：${parseInt(volume * 100)}%`);
            },
            playOrPause() {
                if (this.node.paused) {
                    this.node.play();
                    this.tips.setText("播放");
                } else {
                    this.node.pause();
                    this.tips.setText("暂停");
                }
            },
            decelerate() {
                let playbackRate = this.node.playbackRate;
                playbackRate -= 0.1;
                playbackRate = playbackRate < 0 ? 0 : playbackRate;
                this.node.playbackRate = playbackRate;
                this.tips.setText(`播放速度：${playbackRate}倍`);
            },
            accelerate() {
                let playbackRate = this.node.playbackRate;
                playbackRate += 0.1;
                playbackRate = playbackRate > 16 ? 16 : playbackRate;
                this.node.playbackRate = playbackRate;
                this.tips.setText(`播放速度：${playbackRate}倍`);
            },
            normalSpeed() {
                this.node.playbackRate = 1;
                this.tips.setText("播放速度：1倍");
            },
            nextFrame() {
                if (this.node) this.node.pause();
                this.node.currentTime += Number(1 / this.frame);
                this.tips.setText("定位：下一帧");
            },
            previousFrame() {
                if (!this.node.paused) this.node.pause();
                this.node.currentTime -= Number(1 / this.frame);
                this.tips.setText("定位：上一帧");
            },
            brightnessUp() {
                let brightness = this.render.getVal("brightness");
                if (brightness > 1) {
                    brightness += 1;
                    this.render.brightness(brightness);
                } else {
                    brightness += 0.1;
                    this.render.brightness(brightness);
                }
                this.tips.setText(`图像亮度增加：${brightness * 100}%`);
            },
            brightnessDown() {
                let brightness = this.render.getVal("brightness");
                if (brightness > 1) {
                    brightness -= 1;
                    this.render.brightness(brightness);
                } else {
                    brightness -= 0.1;
                    this.render.brightness(brightness);
                }
                this.tips.setText(`图像亮度减少：${brightness * 100}%`);
            },
            contrastUp() {
                let contrast = this.render.getVal("contrast");
                if (contrast > 1) {
                    contrast += 1;
                    this.render.contrast(contrast);
                } else {
                    contrast += 0.1;
                    this.render.contrast(contrast);
                }
                this.tips.setText(`图像对比度增加：${contrast * 100}%`);
            },
            contrastDown() {
                let contrast = this.render.getVal("contrast");
                if (contrast > 1) {
                    contrast -= 1;
                    this.render.contrast(contrast);
                } else {
                    contrast -= 0.1;
                    this.render.contrast(contrast);
                }
                this.tips.setText(`图像对比度减少：${contrast * 100}%`);
            },
            saturateUp() {
                let saturate = this.render.getVal("saturate");
                if (saturate > 1) {
                    saturate += 1;
                    this.render.saturate(saturate);
                } else {
                    saturate += 0.1;
                    this.render.saturate(saturate);
                }
                this.tips.setText(`图像饱和度增加：${saturate * 100}%`);
            },
            saturateDown() {
                let saturate = this.render.getVal("saturate");
                if (saturate > 1) {
                    saturate -= 1;
                    this.render.saturate(saturate);
                } else {
                    saturate -= 0.1;
                    this.render.saturate(saturate);
                }
                this.tips.setText(`图像饱和度减少：${saturate * 100}%`);
            },
            hueRotateIncrease() {
                let hueRotate = this.render.getVal("hueRotate");
                this.render.hueRotate(++hueRotate);
                this.tips.setText(`图像色相增加：${hueRotate}度`);
            },
            hueRotateReduce() {
                let hueRotate = this.render.getVal("hueRotate");
                this.render.hueRotate(--hueRotate);
                this.tips.setText(`图像色相减少：${hueRotate}度`);
            },
            blurIncrease() {
                let blur = this.render.getVal("blur");
                this.render.blur(++blur);
                this.tips.setText(`图像模糊增加：${blur}PX`);
            },
            blurReduce() {
                let blur = this.render.getVal("blur");
                if (blur > 1) {
                    blur--;
                } else {
                    blur = 0;
                }
                this.render.blur(blur);
                this.tips.setText(`图像模糊减少：${blur}PX`);
            },
            rotate() {
                let rotate = this.render.getVal("rotate");
                rotate = (rotate + 90) % 360;
                this.render.rotate(rotate);
                this.tips.setText(`画面旋转：${rotate}度`);
            },
            imageReset() {
                this.render.reset();
                this.tips.setText("图像属性：复位");
            },
            fullScreen() {

            },
            info() {

            }
        };
    }
}
