
const str = [
    'ようこそ『狩人かける狩人』へ',
    'このゲームは主人公のゴソがまだ幼い頃、',
    '旅に出ていった父親ジソの後を追い、世界中を旅する冒険物語です。',
    'ゴソの前に立ちはだかる敵を必殺技の「じゃじゃじゃん拳」で倒して、ジソを探してください。'
    
];



//ゲームのオブジェクトを640×480サイズで作る
let game = new Game(640, 480);

//ラベルオブジェクトを作る
let label = new Label(str);
label.interval = 5;
label.maxLength = 32;

//add()を使って、ゲームにラベルを表示
game.add(label, 0, 0);

//キーボードが押された時
addEventListener("keydown", () => {
    const key_code = event.keyCode;
    //先ほど登録したスペースキーが押された時、label.next()を実行
    if (key_code === 32) label.next();
    event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
}, false);

//ゲームスタート
game.start();





var is_fired = false;
addEventListener("keydown", function (e) {
    if (e.keyCode === 13 && is_fired == false) {
        window.location.href = 'game2.html'; // 通常の遷移
        is_fired = true
    }
});



