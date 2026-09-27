/* SAHNE 1 — NEHİR (0–10 s)  Nehrin neresine?
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  function tally(ctx, env, t, rows) {
    const T = KD.L(env).TL;
    rows.forEach(([t0, t1, txt, hot], i) => { const al = win(t, t0, t1) * END(t); if (al > 0) F().T(ctx, txt, T.x, T.y[i], { size: T.s, alpha: al, halo: true, color: hot ? A.amber : undefined }); });
  }

  function dashL(ctx, p, q, a, seed, color, w = 2.5) {
    if (a <= 0) return; const n = Math.max(6, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / 14));
    for (let j = 0; j < n; j += 2) Ink.path(ctx, [[lerp(p[0], q[0], j / n), lerp(p[1], q[1], j / n)], [lerp(p[0], q[0], (j + 1) / n), lerp(p[1], q[1], (j + 1) / n)]], { w, alpha: a, seed: seed + j, taper: [0, 0], color });
  }
  function seg2(ctx, p, q, a, k, seed, color, w = 3.5) { if (a > 0 && k > 0) Ink.path(ctx, [p, [lerp(p[0], q[0], k), lerp(p[1], q[1], k)]], { w, alpha: a, seed, taper: [0, 0], color }); }
  function dot(ctx, p, a, color) { if (a <= 0) return; ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, 7); ctx.fillStyle = color ? `rgba(${color},${a})` : `rgba(${LI.INK_RGB},${a})`; ctx.fill(); }
  function txt(ctx, env, p, s, a, hot, sz = 0.8) { if (a > 0) F().T(ctx, s, p[0], p[1], { size: KD.L(env).G.s * sz, alpha: a, halo: true, color: hot ? A.amber : undefined }); }
  function arcAt(ctx, C, r, u0, u1, a, seed, color) {
    if (a <= 0) return; const P = []; for (let j = 0; j <= 16; j++) { const u = lerp(u0, u1, j / 16); P.push([C[0] + r * Math.cos(u), C[1] + r * Math.sin(u)]); }
    Ink.path(ctx, P, { w: 2.5, alpha: a, seed, taper: [0, 0], color });
  }
  const lerpP = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];
  const G = (env, x, y) => { const p = KD.L(env).PL; return [p.x + x * p.u, p.y - y * p.u]; };
  function plane(ctx, env, a) {
    if (a <= 0) return; const s = KD.L(env).G.s;
    ctx.save(); ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.12 * a})`; ctx.lineWidth = 1.2; ctx.beginPath();
    for (let x = 0; x <= 10; x++) { ctx.moveTo(...G(env, x, -3)); ctx.lineTo(...G(env, x, 5)); }
    for (let y = -3; y <= 5; y++) { ctx.moveTo(...G(env, 0, y)); ctx.lineTo(...G(env, 10, y)); }
    ctx.stroke(); ctx.restore();
    Ink.path(ctx, [G(env, 0, -3.3), G(env, 0, 5.4)], { w: 3, alpha: a, seed: 4101, taper: [0, 0] });
    F().T(ctx, 'y', ...G(env, 0.4, 5.5), { size: s * 0.55, alpha: a, halo: true }); F().T(ctx, 'x', ...G(env, 10.6, 0.1), { size: s * 0.55, alpha: a, halo: true });
    [5, 10].forEach((v) => F().T(ctx, String(v), ...G(env, v, -0.5), { size: s * 0.42, alpha: a * 0.8, halo: true }));
    // the river along the x-axis
    const P = []; for (let j = 0; j <= 80; j++) { const x = j / 8; P.push(G(env, x, 0.08 * Math.sin(j * 1.3))); }
    Ink.path(ctx, P, { w: 5, alpha: a * 0.85, seed: 4102, taper: [0, 0], color: '90,130,170' });
    F().T(ctx, 'nehir', ...G(env, 8.8, 0.55), { size: s * 0.5, alpha: a * 0.8, halo: true, color: undefined });
  }
  function place(ctx, env, p, name, a, dx = -24, dy = -22, tent) {
    if (a <= 0) return; const s = KD.L(env).G.s, q = G(env, ...p);
    if (tent) Ink.path(ctx, [[q[0] - 16, q[1] + 2], [q[0], q[1] - 20], [q[0] + 16, q[1] + 2], [q[0] - 16, q[1] + 2]], { w: 3, alpha: a, seed: 4110, taper: [0, 0] }); else dot(ctx, q, a);
    F().T(ctx, name, q[0] + dx, q[1] + dy, { size: s * 0.6, alpha: a, halo: true });
  }
  function path(ctx, env, pts, a, k, seed, color, w = 3.5, dashed) {
    if (a <= 0 || k <= 0) return; const P = pts.map((p) => G(env, ...p));
    const Q = [P[0]], L = P.length - 1, n = L * k, mm = Math.floor(n); for (let i = 1; i <= mm && i <= L; i++) Q.push(P[i]); if (mm < L) Q.push(lerpP(P[mm], P[mm + 1], n - mm));
    if (dashed) for (let i = 0; i < Q.length - 1; i++) dashL(ctx, Q[i], Q[i + 1], a, seed + i * 30, color); else Ink.path(ctx, Q, { w, alpha: a, seed, taper: [0, 0], color });
  }
  function angleArc(ctx, V, P, Q, r, a, seed) { if (a <= 0) return; const u0 = Math.atan2(P[1] - V[1], P[0] - V[0]); let d = Math.atan2(Q[1] - V[1], Q[0] - V[0]) - u0; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; arcAt(ctx, V, r, u0, u0 + d, a, seed, LI.AMBER_RGB); }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Ali nehirden su alıp çadıra gidecek'],
      [10.6, 27.8, 'Anlayalım ve tahmin edelim'],
      [28.4, 45.8, 'Strateji: çadırı nehre göre yansıtalım'],
      [46.4, 63.8, 'Kontrol edelim'],
      [64.4, 79.8, 'Her şeyi 2 birim sağa ötelersek?'],
    ]);
  }

  function figure(ctx, env, t) {
    const a = END(t), s = KD.L(env).G.s;
    const aP = a * win(t, 4.6, 79.8); plane(ctx, env, aP);
    const sh = inOut(seg(t, 66.0, 68.0)) * 2, A_ = [1 + sh, 4], B_ = [7 + sh, 2], Bp = [7 + sh, -2], P_ = [5 + sh, 0];
    const aA = a * win(t, 5.2, 79.8);
    place(ctx, env, A_, 'A (Ali)', aA * seg(t, 5.4, 5.8), -10, -26); place(ctx, env, B_, 'B (çadır)', aA * seg(t, 6.0, 6.4), 20, -34, true);
    // S2: two guesses
    const g = a * win(t, 15.6, 27.8);
    path(ctx, env, [A_, [1, 0], B_], g * 0.8, seg(t, 15.8, 16.8), 4120, LI.INK_RGB, 3, true);
    path(ctx, env, [A_, [7, 0], B_], g * 0.8, seg(t, 18.0, 19.0), 4130, LI.INK_RGB, 3, true);
    txt(ctx, env, lerpP(G(env, 1, 0), G(env, 1, 4), 0.5).map((v, i) => v + (i ? 0 : -60)), '≈ 10,3', g * seg(t, 17.0, 17.4), false, 0.6);
    txt(ctx, env, G(env, 8.2, 3.4), '≈ 9,2', g * seg(t, 19.2, 19.6), false, 0.6);
    tally(ctx, env, t, [[11.2, 27.8, 'A(1, 4) Ali, B(7, 2) çadır'], [12.6, 27.8, 'Nehir: x ekseni; P nehirde'], [14.0, 27.8, 'AP + PB en kısa olsun'], [20.4, 27.8, 'P(1, 0): 10,3 · P(7, 0): 9,2', true]]);
    // S3: reflect B, draw the straight line
    const r = a * win(t, 29.0, 79.8);
    if (r > 0) {
      dashL(ctx, G(env, ...B_), lerpP(G(env, ...B_), G(env, ...Bp), seg(t, 29.2, 30.2)), r * 0.8, 4140, LI.AMBER_RGB);
      place(ctx, env, Bp, 'B′', r * seg(t, 30.2, 30.6), 24, 10);
      path(ctx, env, [A_, Bp], r * 0.7 * win(t, 33.4, 63.8), seg(t, 33.4, 34.8), 4150, LI.AMBER_RGB, 3, true);
      place(ctx, env, P_, 'P', r * seg(t, 35.0, 35.4), -8, 30);
      path(ctx, env, [A_, P_, B_], r, seg(t, 37.0, 38.4), 4160, LI.AMBER_RGB, 5);
      dashL(ctx, G(env, ...P_), G(env, ...B_), 0, 0);
      const k4 = a * win(t, 55.4, 63.8); if (k4 > 0) { const V = G(env, ...P_); angleArc(ctx, V, G(env, P_[0] - 3, 0), G(env, ...A_), 34, k4, 4170); angleArc(ctx, V, G(env, P_[0] + 3, 0), G(env, ...B_), 34, k4, 4171); }
    }
    tally(ctx, env, t, [[30.4, 45.8, 'B′(7, −2): B’nin yansıması'], [32.0, 45.8, 'P nehirde: PB = PB′'], [35.2, 45.8, 'AB′ doğrusu nehri P(5, 0)’da keser'], [38.6, 45.8, 'En kısa yol: A → P(5, 0) → B', true]]);
    // S4: check
    const c = a * win(t, 50.0, 55.0);
    path(ctx, env, [A_, [4, 0], B_], c * 0.8, seg(t, 50.2, 51.2), 4180, LI.INK_RGB, 3, true);
    tally(ctx, env, t, [[47.2, 63.8, 'AP + PB ≈ 5,66 + 2,83 = 8,49'], [50.4, 63.8, 'P(4, 0): 5 + 3,61 = 8,61 daha uzun'], [53.0, 63.8, '8,49 < 8,61 < 9,2 < 10,3 ✓'], [55.6, 63.8, 'Kısa yol: AB′ = 6√2 ≈ 8,49', true]]);
    tally(ctx, env, t, [[65.4, 79.8, 'A(3, 4), B(9, 2) oldu'], [68.4, 79.8, 'B′(9, −2)'], [69.8, 79.8, 'Yeni P(7, 0): o da 2 sağa'], [72.4, 79.8, 'Yol aynı uzunlukta, yalnızca taşındı', true]]);
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[5.6, 10.2, 'Nehrin neresine uğrarsa yol en kısa olur?'],
      [11.4, 27.8, 'Bileşenler: noktalar, nehir, uzaklıklar'],
      [29.4, 45.8, 'Nehir bir ayna gibi'],
      [47.4, 63.8, 'Başka bir noktayla karşılaştıralım'],
      [65.4, 79.8, 'Ali ve çadır birlikte 2 sağa ötelensin']]);
    exprs(ctx, t, at(W, 1), [[15.8, 27.8, 'Tahmin: birkaç yol deneyelim'],
      [33.4, 45.8, 'A’dan B′ne en kısa yol düz çizgi'],
      [55.6, 63.8, 'Gelen ve giden yollar nehirle eşit açı yapar'],
      [69.8, 79.8, 'Yansıma ve öteleme birlikte çalışır']]);
    exprs(ctx, t, at(W, 2), [[22.4, 27.8, 'Denemek yavaş: bir strateji lazım', true], [41.4, 45.8, 'P(5, 0) noktasına uğramalı', true],
      [59.6, 63.8, 'Bilardo topu da banttan böyle seker', true], [75.4, 79.8, 'Strateji her konumda işe yarar', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Bileşenleri belirle, düzlemde göster', 80.6], ['Tahmin et, strateji seç: yansıt', 81.6], ['Uygula ve kontrol et', 82.6], ['En kısa yol: A → P(5, 0) → B!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'The river', nameTr: 'Nehir', concept: 'Where to stop?', conceptTr: 'Nereye uğramalı?', render });
})(window.LI = window.LI || {});
