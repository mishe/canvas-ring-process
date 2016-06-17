/**
 * ==================================
 * opts.parent 插入到哪里 一个JS元素对象
 * opts.width 宽度 = 2* (半径+弧宽)
 * opts.radius 半径
 * opts.arc 弧宽
 * opts.perent 百分比
 * opts.color 弧渲染颜色 [底色,进度色]
 * opts.textColor 文字渲染颜色
 * opts.textSize 文字渲染大小
 * opts.animated 是否以动画的方式绘制 默认false
 * opts.after 绘制完成时执行函数
 * ==================================
 **/

function drawRing(opts) {
    var _opts = {
        parent: document.body,
        width: 100,
        radius: 45,
        arc: 5,
        perent: 100,
        color: ['#ccc', '#042b61'],
        textColor: '#000',
        textSize: '14px',
        animated: false,
        after: function() {}
    }, k;
    for (k in opts) _opts[k] = opts[k];

    var parent = _opts.parent,
        width = _opts.width,
        radius = _opts.radius,
        arc = _opts.arc,
        perent = parseFloat(_opts.perent),
        color = _opts.color,
        textSize = _opts.textSize,
        textColor = _opts.textColor,
        c = document.createElement('canvas'),
        ctx = null,
        x = 0,
        animated = _opts.animated,
        after = _opts.after;

    parent.appendChild(c);
    ctx = c.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = width;

    function clearFill() {
        ctx.clearRect(0, 0, width, width);
    }

    function fillBG() {
        ctx.beginPath();
        ctx.lineWidth = arc;
        ctx.strokeStyle = color[0];
        ctx.arc(width / 2, width / 2, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color[0];
        ctx.arc(width / 2, width / 2, radius-arc+6, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function fillArc(x) {
        var grd = ctx.createRadialGradient(width / 2, width / 2, 0, width,width, 360);
        grd.addColorStop(0, '#ff0');
        grd.addColorStop(1, '#f00');
        ctx.beginPath();
        ctx.lineWidth = arc;
        ctx.strokeStyle = grd;
        ctx.arc(width / 2, width / 2, radius, -90 * Math.PI / 180, (x * 3.6 - 90) * Math.PI / 180);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = grd;
        ctx.arc(width / 2, width / 2, radius-arc+6, -90 * Math.PI / 180, (x * 3.6 - 90) * Math.PI / 180);
        ctx.stroke();
    }

    function fillText(x) {
        ctx.font = textSize + ' Arial';
        ctx.fillStyle = textColor;
        ctx.textBaseline = "middle";
        ctx.textAlign = 'center';
        ctx.fillText(x.toFixed(1) + '%', width / 2, width / 2-30);
    }

    function fill(x) {
        fillBG();
        fillArc(x);
        // fillText(x);
    }

    if (!animated) return fill(perent);

    fill(x);
    !function animate() {
        if (++x > perent) return after && after();
        setTimeout(animate, 10);
        clearFill();
        fill(x);
    }();
}
