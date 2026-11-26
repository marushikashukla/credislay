/* =====================================================================
   CREDISLAY — LENDING PARTNERS STRIP
   Edit the names below (3 to 7 work best). They scroll in the
   "Our lending partners" strip on the homepage and all landing pages.
   Keep each name inside quotes, with a comma after each line.
   ===================================================================== */
var CREDISLAY_LENDERS = [
  'Lender Name 1',
  'Lender Name 2',
  'Lender Name 3',
  'Lender Name 4',
  'Lender Name 5'
];

/* ---- No need to edit below this line ---- */
(function () {
  var track = document.getElementById('lenderTrack');
  var section = document.getElementById('lenders');
  if (!track || !section) return;
  var names = CREDISLAY_LENDERS.map(function (n) { return String(n || '').trim(); }).filter(Boolean);
  if (!names.length) { section.hidden = true; return; }

  var icon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>';
  function esc(s) { return s.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // Repeat the list so one group is wide enough to fill the screen, then add a copy for a seamless loop.
  var group = [];
  while (group.length < 8) group = group.concat(names);
  var html = '';
  group.forEach(function (n, i) {
    html += '<span class="lender"' + (i >= names.length ? ' aria-hidden="true"' : '') + '>' + icon + esc(n) + '</span>';
  });
  group.forEach(function (n) { html += '<span class="lender" aria-hidden="true">' + icon + esc(n) + '</span>'; });
  track.innerHTML = html;
  track.style.animationDuration = (group.length * 3.2) + 's';
})();
