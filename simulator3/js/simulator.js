class simulator {

  constructor( elm1, elm2 ) {
    this.elm1 = elm1; // HTML要素を記憶しておく
    this.elm2 = elm2; // （必要な場合のみ）

	this.vc1 = new VCanvas( elm1 ); // VCanvasの初期化
	this.vc2 = new VCanvas( elm2 ); // VCanvasの初期化
	this.vc1.scale( 0, 1, 160, -2 ); // スケールの設定
	this.vc2.scale( 0, 1, 16, -2 ); // スケールの設定
	this.theta = 0; // θ

    var timer1 = new vbTimer(); // アニメーションする場合，vbTimerを使う
    timer1.interval = 20; // アニメーションの動作間隔
    var nl = new nylon(); // イベントエミッタの初期化

	this.background(); // 背景を描画

    timer1.timer = () => {
      var y = Math.sin( Math.PI/180. * this.theta / 160 * 360.);
      this.theta++;

	  this.vc1.cls();	// 一旦画面を消去
      this.vc1.beginPath();
	  this.vc1.circle( this.theta, y, 10 );
      this.vc1.stroke();
	  if( this.theta > 160 ) timer1.disable();
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
	this.vc2.beginPath();
	this.vc2.lineStart( 0, 0 );
	for( var i=0; i<=16; i++ ) {
		var y = Math.sin( Math.PI/180. * i / 16. * 360.);
		this.vc2.lineto( i, y );
	}
	this.vc2.stroke();
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
