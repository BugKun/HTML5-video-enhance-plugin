export default class {
    constructor(keyproxy) {
        this.keyproxy = {
            fastForward: 39,
            rewind: 37,
            volumeUp: 38,
            volumeDown: 40,
            playOrPause: 32,
            decelerate: 88,
            accelerate: 67,
            normalSpeed: 90,
            nextFrame: 70,
            previousFrame: 68,
            brightnessUp: 69,
            brightnessDown: 87,
            contrastUp: 84,
            contrastDown: 82,
            saturateUp: 85,
            saturateDown: 89,
            hueRotateIncrease: 79,
            hueRotateReduce: 73,
            blurIncrease: 75,
            blurReduce: 74,
            rotate: 83,
            imageReset: 81,
            fullScreen: 13,
            info: 9
        };

        this.setKeyProxy(keyproxy);
    }

    setKeyProxy(keyproxy) {
        this.keyproxy = {
            ...this.keyproxy,
            ...keyproxy
        };
    }

    keycodes() {
        return this.keyproxy;
    }
}
