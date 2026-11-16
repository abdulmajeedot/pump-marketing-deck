/* Shared slide engine.
   - Slides are <section class="slide"> inside #stage, built by each design with Deck.render([...]).
   - Build steps: any element with data-at="n" gets class "in" once step >= n and "now" while step == n.
     Next/back walks the steps first, then the slides. An element with data-go="n" jumps to step n on click.
   - URL options: #3 opens slide 3, ?step=2 opens at step 2, ?view=sheet shows all slides,
     ?still=1 freezes animations, ?thumb=1 hides the control bar (used by the gallery). */
(function () {
  var Deck = window.Deck = {};
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function maxStep(s) { var m = 0; $$('[data-at]', s).forEach(function (e) { m = Math.max(m, +e.getAttribute('data-at')); }); return m; }
  function paint(s, k) {
    s.setAttribute('data-step', k);
    $$('[data-at]', s).forEach(function (e) { var a = +e.getAttribute('data-at'); e.classList.toggle('in', a <= k); e.classList.toggle('now', a === k); });
  }
  Deck.esc = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  /* hidden <svg> for gradients, patterns, markers and filters, kept outside the slides so clones can use them */
  Deck.defs = function (inner) { document.body.insertAdjacentHTML('afterbegin', '<svg class="defs" aria-hidden="true"><defs>' + inner + '</defs></svg>'); };

  Deck.render = function (slides) { $('#stage').innerHTML = slides.join(''); Deck.init(); };

  Deck.init = function () {
    var stage = $('#stage'), vp = $('#viewport'), q = new URLSearchParams(location.search);
    var slides = $$('#stage > .slide'), cur = 0, step = 0;
    if (q.get('still')) document.body.classList.add('still');
    if (q.get('thumb')) document.body.classList.add('thumb', 'still');
    document.body.insertAdjacentHTML('beforeend',
      '<div id="over"><div id="grid"></div></div>' +
      '<nav id="bar"><a href="index.html">All designs</a><b>' + document.title + '</b><span class="sp"></span>' +
      '<button id="pv" aria-label="Back">&#9664;</button><span id="ct"></span><button id="nx" aria-label="Next">&#9654;</button>' +
      '<button id="sh">All slides</button><button id="fs">Fullscreen</button></nav>');
    var over = $('#over'), grid = $('#grid');
    slides.forEach(function (s, i) { s.setAttribute('data-n', i + 1); paint(s, 0); });

    function fit() { stage.style.transform = 'scale(' + Math.min(vp.clientWidth / 1280, vp.clientHeight / 720) + ')'; minis(); }
    function go(n, k) {
      cur = Math.max(0, Math.min(slides.length - 1, n));
      slides.forEach(function (s, i) { s.classList.toggle('active', i === cur); });
      var m = maxStep(slides[cur]);
      step = k === 'end' ? m : Math.min(+k || 0, m);
      paint(slides[cur], step);
      $('#ct').textContent = (cur + 1) + ' / ' + slides.length;
      try { history.replaceState(null, '', location.search + '#' + (cur + 1)); } catch (e) {}
    }
    function next() { if (step < maxStep(slides[cur])) paint(slides[cur], ++step); else if (cur < slides.length - 1) go(cur + 1, 0); }
    function prev() { if (step > 0) paint(slides[cur], --step); else if (cur > 0) go(cur - 1, 'end'); }
    Deck.next = next; Deck.prev = prev; Deck.go = go;

    function sheet(on) {
      if (on === undefined) on = !over.classList.contains('open');
      over.classList.toggle('open', on);
      if (!on) return;
      grid.innerHTML = '';
      slides.forEach(function (s, i) {
        var b = document.createElement('button'); b.className = 'pick';
        var m = document.createElement('div'); m.className = 'mini';
        var st = document.createElement('div'); st.className = stage.className;
        var cl = s.cloneNode(true); cl.classList.add('active'); paint(cl, maxStep(cl));
        st.appendChild(cl); m.appendChild(st); b.appendChild(m);
        b.insertAdjacentHTML('beforeend', '<span>' + (i + 1) + '</span>');
        b.onclick = function () { sheet(false); go(i, 0); };
        grid.appendChild(b);
      });
      var rows = Math.ceil(slides.length / 4);
      grid.style.maxWidth = 'calc((100vh - 110px - ' + rows * 26 + 'px) / ' + rows + ' * 16 / 9 * 4 + 48px)';
      minis();
    }
    function minis() { $$('.mini', grid).forEach(function (m) { m.firstChild.style.transform = 'scale(' + (m.clientWidth / 1280) + ')'; }); }
    function full() { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); }

    $('#pv').onclick = prev; $('#nx').onclick = next; $('#sh').onclick = function () { sheet(); }; $('#fs').onclick = full;
    stage.addEventListener('click', function (e) {
      var g = e.target.closest && e.target.closest('[data-go]');
      if (g) { step = Math.min(+g.getAttribute('data-go'), maxStep(slides[cur])); paint(slides[cur], step); return; }
      next();
    });
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); next(); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
      else if (k === 'Home') go(0, 0);
      else if (k === 'End') go(slides.length - 1, 'end');
      else if (k === 'f' || k === 'F') full();
      else if (k === 'o' || k === 'O') sheet();
      else if (k === 'Escape') sheet(false);
    });
    window.addEventListener('resize', fit);
    document.addEventListener('fullscreenchange', fit);
    window.addEventListener('beforeprint', function () { slides.forEach(function (s) { paint(s, maxStep(s)); }); });
    window.addEventListener('afterprint', function () { slides.forEach(function (s, i) { paint(s, i === cur ? step : 0); }); });

    go((parseInt(location.hash.slice(1), 10) || 1) - 1, q.get('step') === 'end' ? 'end' : +(q.get('step') || 0));
    fit();
    if (q.get('view') === 'sheet') sheet(true);
  };

  /* ---------- charts ---------- */

  /* Sankey between two years. data: [[name, left, right, colour, rightLabel?]] */
  Deck.sankey = function (data, o) {
    o = o || {};
    var w = o.w || 740, h = o.h || 420, xl = o.xl || 110, xr = o.xr || w - 150, nw = o.nw || 12, top = o.top || 36, bot = o.bot || 30,
        gap = o.gap || 10, n = data.length, t1 = 0, t2 = 0, ink = o.ink || '#222', sub = o.sub || ink, node = o.node || ink;
    data.forEach(function (d) { t1 += d[1]; t2 += d[2]; });
    var u = (h - top - bot - gap * (n - 1)) / Math.max(t1, t2);
    function stack(k, t) {
      var ord = data.map(function (d, i) { return i; });
      if (o.rank) ord.sort(function (p, q) { return data[q][k] - data[p][k] || p - q; });
      var y = top + (o.center ? ((h - top - bot) - (t * u + gap * (n - 1))) / 2 : 0), pos = {};
      ord.forEach(function (i) { pos[i] = [y, y + data[i][k] * u]; y += data[i][k] * u + gap; });
      return pos;
    }
    var L = stack(1, t1), R = stack(2, t2), mx = (xl + nw + xr) / 2, out = '', lab = '', f = o.font || 'inherit';
    data.forEach(function (d, i) {
      var a = L[i], b = R[i], x0 = xl + nw, x1 = xr;
      out += '<path class="rb" fill="' + d[3] + '" fill-opacity="' + (o.op || .85) + '" d="M' + x0 + ' ' + a[0] + 'C' + mx + ' ' + a[0] + ' ' + mx + ' ' + b[0] + ' ' + x1 + ' ' + b[0] +
        'L' + x1 + ' ' + b[1] + 'C' + mx + ' ' + b[1] + ' ' + mx + ' ' + a[1] + ' ' + x0 + ' ' + a[1] + 'Z"><title>' + Deck.esc(d[0]) + ': ' + d[1] + ' → ' + d[2] + '</title></path>';
      lab += '<rect x="' + xl + '" y="' + (a[0] - 1) + '" width="' + nw + '" height="' + (a[1] - a[0] + 2) + '" fill="' + (o.nodeColor ? d[3] : node) + '"/>' +
        '<rect x="' + xr + '" y="' + (b[0] - 1) + '" width="' + nw + '" height="' + (b[1] - b[0] + 2) + '" fill="' + (o.nodeColor ? d[3] : node) + '"/>' +
        '<text x="' + (xl - 12) + '" y="' + ((a[0] + a[1]) / 2 + 6) + '" text-anchor="end" fill="' + ink + '"><tspan font-weight="700">' + Deck.esc(d[0]) + '</tspan>' + (o.hideL ? '' : '<tspan dx="8" fill="' + sub + '">' + d[1] + '</tspan>') + '</text>' +
        '<text x="' + (xr + nw + 12) + '" y="' + ((b[0] + b[1]) / 2 + 6) + '" fill="' + ink + '"><tspan font-weight="700">' + Deck.esc(d[0]) + '</tspan><tspan dx="8" fill="' + sub + '">' + (d[4] != null ? d[4] : d[2]) + '</tspan></text>';
    });
    var yrs = (o.years || ['', '']);
    out += '<text x="' + (xl + nw / 2) + '" y="16" text-anchor="middle" fill="' + ink + '" class="yr">' + yrs[0] + '</text><text x="' + (xr + nw / 2) + '" y="16" text-anchor="middle" fill="' + ink + '" class="yr">' + yrs[1] + '</text>';
    return '<svg class="chart sk ' + (o.cls || '') + '" viewBox="0 0 ' + w + ' ' + h + '" style="font-family:' + f + ';font-size:' + (o.fs || 16) + 'px">' + out + lab + '</svg>';
  };

  /* Slope chart between two years. data: [[name, left, right]], o.color(d,i), o.width(d,i) */
  Deck.slope = function (data, o) {
    o = o || {};
    var w = o.w || 700, h = o.h || 420, x1 = o.x1 || 160, x2 = o.x2 || w - 160, top = o.top || 44, bot = o.bot || 24, g = o.gap || 22,
        ink = o.ink || '#222', sub = o.sub || ink, r = o.r || 6,
        max = o.max || Math.max.apply(null, data.map(function (d) { return Math.max(d[1], d[2]); }));
    function y(v) { return top + (1 - v / max) * (h - top - bot); }
    function place(k) {
      var it = data.map(function (d, i) { return { i: i, y: y(d[k]) }; }).sort(function (a, b) { return b.y - a.y; }), res = {};
      for (var j = 1; j < it.length; j++) if (it[j - 1].y - it[j].y < g) it[j].y = it[j - 1].y - g;
      it.forEach(function (a) { res[a.i] = a.y; }); return res;
    }
    var PL = place(1), PR = place(2), out = '', top2 = '';
    var col = o.color || function () { return ink; }, wid = o.width || function () { return 3; };
    data.forEach(function (d, i) {
      var c = col(d, i), sw = wid(d, i), seg = '<g class="sl" data-i="' + i + '"><path d="M' + x1 + ' ' + y(d[1]) + 'L' + x2 + ' ' + y(d[2]) + '" stroke="' + c + '" stroke-width="' + sw + '" fill="none" stroke-linecap="round"/>' +
        '<circle cx="' + x1 + '" cy="' + y(d[1]) + '" r="' + r + '" fill="' + c + '"/><circle cx="' + x2 + '" cy="' + y(d[2]) + '" r="' + r + '" fill="' + c + '"/>' +
        '<text x="' + (x1 - 16) + '" y="' + (PL[i] + 6) + '" text-anchor="end" fill="' + ink + '"><tspan font-weight="700">' + Deck.esc(d[0]) + '</tspan><tspan dx="9" fill="' + sub + '">' + d[1] + '</tspan></text>' +
        '<text x="' + (x2 + 16) + '" y="' + (PR[i] + 6) + '" fill="' + ink + '"><tspan font-weight="700">' + Deck.esc(d[0]) + '</tspan><tspan dx="9" fill="' + sub + '">' + d[2] + '</tspan></text></g>';
      if (o.hi === i) top2 += seg; else out += seg;
    });
    var yrs = o.years || ['', ''];
    return '<svg class="chart slope ' + (o.cls || '') + '" viewBox="0 0 ' + w + ' ' + h + '" style="font-family:' + (o.font || 'inherit') + ';font-size:' + (o.fs || 16) + 'px">' +
      '<path d="M' + x1 + ' ' + (top - 12) + 'V' + (h - bot + 6) + 'M' + x2 + ' ' + (top - 12) + 'V' + (h - bot + 6) + '" stroke="' + (o.axis || sub) + '" stroke-opacity=".35" stroke-width="1.5"/>' +
      '<text x="' + x1 + '" y="16" text-anchor="middle" fill="' + ink + '" class="yr">' + yrs[0] + '</text><text x="' + x2 + '" y="16" text-anchor="middle" fill="' + ink + '" class="yr">' + yrs[1] + '</text>' +
      out + top2 + '</svg>';
  };
})();
