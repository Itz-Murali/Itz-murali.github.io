const videoContainer = document.getElementById("videoContainer");

const Sugar = [
"src/vdo/6.mp4"
];
const randomVideo = Sugar[Math.floor(Math.random() * Sugar.length)];

const app = new PIXI.Application({
    view: document.getElementById("videoCanvas"),
    width: videoContainer.clientWidth,
    height: (videoContainer.clientWidth * 9) / 16,
    transparent: true
});

let sprite;

function resizeCanvas() {
    const width = videoContainer.clientWidth;
    const height = (width * 9) / 16;
    app.renderer.resize(width, height);
    if (sprite) {
        sprite.width = width;
        sprite.height = height;
    }
}

window.addEventListener("resize", resizeCanvas);

const video = document.createElement("video");
video.src = randomVideo;
video.autoplay = true;
video.loop = true;
video.muted = true;
video.setAttribute("playsinline", "");


video.play().catch(error => console.error("Autoplay blocked:", error));

video.onloadeddata = () => {
    const texture = PIXI.Texture.from(video);
    sprite = new PIXI.Sprite(texture);
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;

    const chromaShader = new PIXI.Filter(null, `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;

        void main() {
            vec4 color = texture2D(uSampler, vTextureCoord);
            if (color.g > 0.5 && color.r < 0.5 && color.b < 0.5) {
                discard;
            } else {
                gl_FragColor = color;
            }
        }
    `);

    sprite.filters = [chromaShader];

    app.stage.addChild(sprite);

    resizeCanvas();
    
    
};
    