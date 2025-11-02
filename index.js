document.addEventListener("DOMContentLoaded", function() {
    particlesJS("particles-js",{
        "particles":{
            "number":{
                "value":80,//この数値を変更すると幾何学模様の数が増減できる
                "density":{
                    "enable":true,
                    "value_area":800
                }
            },
        "color":{
            "value":"#ffffff"//色
        },
        "shape":{
            "type":"polygon",//形状はpolygonを指定
            "stroke":{
                "width":0,
            },
        "polygon":{
            "nb_sides":3//多角形の角の数
        },
        "image":{
            "width":190,
            "height":100
        }
        },
        "opacity":{
            "value":0.664994832269074,
            "random":false,
            "anim":{
                "enable":true,
                "speed":2.2722661797524872,
                "opacity_min":0.08115236356258881,
                "sync":false
            }
        },
        "size":{
            "value":3,
            "random":true,
            "anim":{
                "enable":false,
                "speed":40,
                "size_min":0.1,
                "sync":false
            }
        },
        "line_linked":{
            "enable":true,
            "distance":150,
            "color":"#ffffff",
            "opacity":0.6,
            "width":1
        },
            "move":{
                "enable":true,
                "speed":2.2,//速度を少し遅く（以前は 6 -> 2.2）
            "direction":"none",//方向指定なし
            "random":false,//動きはランダムにしない
            "straight":false,//動きをとどめない
            "out_mode":"out",//画面の外に出るように描写
            "bounce":false,//跳ね返りなし
            "attract":{
                "enable":false,
                "rotateX":600,
                "rotateY":961.4383117143238
            }
        }
        },
        "interactivity":{
            "detect_on":"canvas",
            "events":{
                "onhover":{
                    "enable":false,
                    "mode":"repulse"
                },
            "onclick":{
                "enable":false
                },
            "resize":true
            }
        },
        "retina_detect":true
    });
});
    // --- マウス追従で背景の微妙なパララックスを作る ---
    (function(){
        const root = document.documentElement;
        let w = window.innerWidth, h = window.innerHeight;
        let tx = 0, ty = 0; // 目標（-1..1）
        let cx = 0, cy = 0; // 現在値
        const maxX = 40; // 水平方向の最大ピクセル移動
        const maxY = 20; // 垂直方向の最大ピクセル移動

        function onMove(e){
            tx = (e.clientX - w/2) / (w/2);
            ty = (e.clientY - h/2) / (h/2);
            // 少しだけアニメを早めたい場合はここで --bg-rotate-duration を変更できる
            // root.style.setProperty('--bg-rotate-duration', '60s');
        }

        window.addEventListener('mousemove', onMove, {passive:true});
        window.addEventListener('resize', function(){ w = window.innerWidth; h = window.innerHeight; });

        // Ensure .bg-blob exists (so we can set transform directly without relying on pseudo-elements)
        let blob = document.querySelector('.bg-blob');
        if(!blob){
            blob = document.createElement('div');
            blob.className = 'bg-blob';
            const rot = document.createElement('div');
            rot.className = 'rotator';
            blob.appendChild(rot);
            document.body.appendChild(blob);
        }

        function loop(){
            // 緩やかに追従（Lerp）
            cx += (tx - cx) * 0.08;
            cy += (ty - cy) * 0.08;
            const px = (cx * maxX).toFixed(2) + 'px';
            const py = (cy * maxY).toFixed(2) + 'px';
            // Update CSS variables (fallback) and also directly set transform on the real element
            root.style.setProperty('--mouse-x', px);
            root.style.setProperty('--mouse-y', py);
            blob.style.transform = `translate(${px}, ${py}) scale(1.15)`;
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    })();


window.addEventListener("scroll", function() {
    let button = document.getElementById("backToTop");
    if (window.scrollY > 20) { // 20pxスクロールしたらボタンを表示
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("backToTop").addEventListener("click", function() {
        window.scrollTo(0, 0); // ページの最上部にスクロール
    });
});

