/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 8. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Nehrin neresine?', en: 'Where on the river?',
      note: 'Ali A noktasında. Nehirden su alıp B noktasındaki çadıra gidecek. Nehrin neresine uğrarsa yolu en kısa olur?' },
    { scene: 2, start: 10.8, end: 19.2, tr: 'Bileşenler', en: 'What we have',
      note: 'Ali A(1, 4), çadır B(7, 2). Nehir x ekseni. Nehirde bir P noktası arıyoruz: AP artı PB en kısa olsun.' },
    { scene: 2, start: 19.4, end: 27.8, tr: 'Tahminler', en: 'Guesses',
      note: 'P(1, 0) olursa yaklaşık 10,3; P(7, 0) olursa yaklaşık 9,2 birim. Denemek yavaş, bir strateji gerekli.' },
    { scene: 3, start: 28.8, end: 37.2, tr: 'Çadırı yansıt', en: 'Reflect the tent',
      note: 'Çadırı nehre göre yansıtalım: B′(7, −2). Nehirdeki her P için PB, PB′ ne eşit.' },
    { scene: 3, start: 37.4, end: 45.8, tr: 'P(5, 0)', en: 'P(5, 0)',
      note: 'A’dan B′ne en kısa yol düz çizgi. Bu çizgi nehri P(5, 0) noktasında kesiyor. Ali oraya uğramalı.' },
    { scene: 4, start: 46.8, end: 55.0, tr: '8,49 birim', en: '8.49 units',
      note: 'AP yaklaşık 5,66, PB yaklaşık 2,83: toplam 8,49. P(4, 0) için 8,61: daha uzun.' },
    { scene: 4, start: 55.2, end: 63.8, tr: 'Eşit açılar', en: 'Equal angles',
      note: 'Kısa yol: toplam, AB′ uzunluğu, 6 kök 2. Gelen ve giden yollar nehirle eşit açı yapıyor, bilardo topu gibi.' },
    { scene: 5, start: 64.8, end: 72.0, tr: '2 sağa ötele', en: 'Translate 2 right',
      note: 'Ali ve çadırı birlikte 2 birim sağa öteleyelim: A(3, 4), B(9, 2). Yansıma B′(9, −2).' },
    { scene: 5, start: 72.2, end: 79.8, tr: 'P de ötelendi', en: 'P moved too',
      note: 'Yeni P(7, 0): o da 2 sağa gitti. Yol aynı uzunlukta, yalnızca taşındı. Strateji her konumda işe yarar.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Adım adım', en: 'Step by step',
      note: 'Aklında kalsın: bileşenleri belirle, düzlemde göster, tahmin et, strateji seç, uygula ve kontrol et.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'A → P → B!', en: 'A → P → B!',
      note: 'En kısa yol: A, P(5, 0), B!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
