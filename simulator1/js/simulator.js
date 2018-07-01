class simulator {

  constructor( elm1, elm2 ) {
    this.elm1 = elm1; // HTML要素を記憶しておく
    this.elm2 = elm2; // （必要な場合のみ）

	this.vc1 = new VCanvas( elm1 ); // VCanvasの初期化
	this.vc2 = new VCanvas( elm2 ); // VCanvasの初期化
	this.vc1.scale( 0, 1, 160, -2 ); // スケールの設定
	this.vc1.scale( 0, 1, 16, -2 ); // スケールの設定
	// 上記のように設定すると，左上の座標が(0,1)になり，
	// 右下の座標が(16,-1)になります．

    var timer1 = new vbTimer(); // アニメーションする場合，vbTimerを使う
    timer1.interval = 20; // アニメーションの動作間隔
    var nl = new nylon(); // イベントエミッタの初期化

	this.background(); // 背景を描画

    timer1.timer = () => {
	  // ここに何らかの計算を入れる
	  //

	  // ここにグラフ描画を入れる
      this.vc1.beginPath();
	  this.vc1.cls();	// 一旦画面を消去
	  // グラフ描画はbeginPathとstrokeで挟む
      this.vc1.stroke();
    }

    // 例えばstartのイベントが来たらタイマーを動かす
    nl.on( "start", ( key, params ) => {
      timer1.enable();
    });
	// 例えばstopのイベントが来たらタイマーを止める
    nl.on( "stop", ( key, params ) => {
      timer1.disable();
    });
	// その他のイベントが必要ならばここに書く
  }

  background() {
    this.vc1.cls();	// 消去
    this.vc2.cls(); // 消去

	// 背景を描画
  }
}

// ボタンに対するイベントの割り当てはここで
var guisetup = () => {
  var nl = new nylon();
  document.querySelector("#start").addEventListener( "click", () => {
    nl.emit( "start", null );
  });
  document.querySelector("#stop").addEventListener( "click", () => {
    nl.emit( "stop", null );
  });
}

window.addEventListener("load", function(e) {
  guisetup(); // ボタンにイベントを割り当てる

  var x = new simulator(
    document.querySelector('#graph1'),
    document.querySelector('#graph1b')
  );
});
