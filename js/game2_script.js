
//グローバル変数の定義
let canvas;
let ctx;

//マップの作成（さくせい）
let map = [
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 2]
]


//スプライトクラス
//img : スプライトに使う画像
//left : 画像の左から何ピクセルの部分を使うか
//top : 画像の上から何ピクセルの部分を使うか
class Sprite {
    constructor(img, left, top) {
        this.left = left || 0;
        this.top = top || 0;
        this.img = new Image();
        this.img.src = img;
        this.width = 32;
        this.height = 32;
    }
}

//ゲームクラス
//width : ゲーム全体の横幅
//height : ゲーム全体の縦幅
//
//add() : ゲームにスプライトを表示
class Game {
    constructor(width, height) {
        this.width = width || 320;
        this.height = height || 320;

        canvas = document.getElementById('canvas');
        canvas.width = this.width;		//canvasの横幅（よこはば）
        canvas.height = this.height;		//canvasの縦幅（たてはば

        ctx = canvas.getContext('2d');
    }
    add(sprite, x, y) {
        if (typeof x === "undefined") sprite.x = 0;
        else sprite.x = x;
        if (typeof y === "undefined") sprite.y = 0;
        else sprite.y = y;
        ctx.drawImage(sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y, sprite.width, sprite.height);
    }
}

//入力（Input）クラス
//up : 上キー
//left : 左キー
//down : 下キー
//right : 右キー
class Input {
    constructor() {
        this.up = false;
        this.left = false;
        this.down = false;
        this.right = false;
    }
    push_key() {
        addEventListener("keydown", () => {
            const key_code = event.keyCode;
            if (key_code === 37) this.left = true;
            if (key_code === 38) this.up = true;
            if (key_code === 39) this.right = true;
            if (key_code === 40) this.down = true;
            if (key_code === 32) this.speak = true;
            event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
        }, false);
        addEventListener("keyup", () => {
            const key_code = event.keyCode;
            if (key_code === 37) this.left = false;
            if (key_code === 38) this.up = false;
            if (key_code === 39) this.right = false;
            if (key_code === 40) this.down = false;
            if (key_code === 32) this.speak= false;
        }, false);
    }
}

//inputオブジェクトの作成
let input = new Input();

//プレイヤークラス
//x : プレイヤーのx座標
//y : プレイヤーのy座標
//move : プレイヤーをうまく動かすためのもの
//
//move_sp() : プレイヤーのスプライトを動かす
class Player {
    constructor(x, y) {
        this.sprite = new Sprite('img/goso.png');
        this.x = x;
        this.y = y;
        this.move = 0;
    }
    move_sp() {
        input.push_key();
        game.add(this.sprite, this.x, this.y);
        if (this.move === 0) {
            if (input.left === true) {
                var x = this.x / 32;
                var y = this.y / 32;
                x--;
                if (map[y][x] === 0) {
                    this.move = 32;
                    input.push = 'left';
                }
            }
            if (input.up === true) {
                var x = this.x / 32;
                var y = this.y / 32;
                if (y > 0) {
                    y--;
                    if (map[y][x] === 0) {
                        this.move = 32;
                        input.push = 'up';
                    }
                }
            }
            if (input.right === true) {
                var x = this.x / 32;
                var y = this.y / 32;
                x++;
                if (map[y][x] === 0) {
                    this.move = 32;
                    input.push = 'right';
                }
            }
            if (input.down === true) {
                var x = this.x / 32;
                var y = this.y / 32;
                if (y < 19) {
                    y++;
                    if (map[y][x] === 0) {
                        this.move = 32;
                        input.push = 'down';
                    }
                }
            }
            if (input.speak === true) {
                var x = this.x / 32;
                var y = this.y / 32;
                if (y < 19) {
                    y++;
                    if (map[y][x] === 2) {
                        window.location.href = 'clear.html'; // 通常の遷移
  
                    }
                }
            }
        }

        //this.moveが0より大きい場合は、4pxずつ移動（いどう）を続ける
        if (this.move > 0) {
            this.move -= 4;
            if (input.push === 'left') this.x -= 4;
            if (input.push === 'up') this.y -= 4;
            if (input.push === 'right') this.x += 4;
            if (input.push === 'down') this.y += 4;
        }
    }
}

//ゲームオブジェクトの作成
let game = new Game(640, 640);

//プレイヤーのオブジェクトを作成
let player = new Player(0, 0);

//キャラクターのオブジェクトを作成
let jiso = new Sprite('img/jiso.png', 0, 0);

//床、壁のマップチップのオブジェクトを作成
let floor = new Sprite('img/map.png', 0, 0);
let wall = new Sprite('img/map.png', 65, 0);

//メインループ
function main() {
    //塗（ぬ）りつぶす色を指定（してい）
    ctx.fillStyle = "rgb( 0, 0, 0 )";
    //塗（ぬ）りつぶす
    ctx.fillRect(0, 0, 640, 640);

    //マップを表示する
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) game.add(floor, 32 * x, 32 * y);
            if (map[y][x] === 0) game.add(wall, 32 * x, 32 * y);
        }
    }

    //キャラクターのスプライトを表示
    player.move_sp();
    game.add(jiso, 608, 608);
    
    requestAnimationFrame(main);
}
addEventListener('load', main(), false);



