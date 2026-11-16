/* Line icons on a 48 x 48 grid. Strokes use currentColor; shapes with class "a" take the accent fill (--ia).
   Each design restyles them with CSS (stroke width, colour, accent, frame). */
window.ICONS = {
  /* pillars */
  team: '<circle cx="24" cy="13" r="5.5"/><circle cx="10.5" cy="18" r="4"/><circle cx="37.5" cy="18" r="4"/><path class="a" d="M13 40c0-7.5 5-12.5 11-12.5S35 32.5 35 40z"/><path d="M3.5 36c0-5.5 3-9 7-9M44.5 36c0-5.5-3-9-7-9"/>',
  segment: '<path d="M22 8a17 17 0 1 0 17 17H22z"/><path class="a" d="M26 4v17h17A17 17 0 0 0 26 4z"/>',
  channels: '<circle class="a" cx="9" cy="24" r="5"/><path d="M14 24h7c6 0 8-12 14-12h5M21 24h19M21 24c6 0 8 12 14 12h5"/><path d="M37 8l4 4-4 4M37 20l4 4-4 4M37 32l4 4-4 4"/>',
  pump: '<circle cx="24" cy="24" r="19"/><circle class="a" cx="24" cy="24" r="5"/><path d="M24 19c3-6 9-8 13-6M29 24c6 3 8 9 6 13M24 29c-3 6-9 8-13 6M19 24c-6-3-8-9-6-13"/>',

  /* team */
  potential: '<circle cx="16" cy="14" r="6"/><path d="M4 41c0-8 5-13 12-13s12 5 12 13"/><path d="M29 41l5-8 4 3 6-10"/><path d="M39.5 26H44v4.5"/><path class="a" d="M37 4l1.8 3.7 4 .6-2.9 2.8.7 4L37 13.2l-3.6 1.9.7-4-2.9-2.8 4-.6z"/>',
  training: '<path class="a" d="M3 18L24 9l21 9-21 9z"/><path d="M11 22v9c0 3.5 6 7 13 7s13-3.5 13-7v-9"/><path d="M45 18v11"/><circle class="f" cx="45" cy="31.5" r="1.8"/>',
  sharing: '<path class="a" d="M24 4a9 9 0 0 0-5.5 16.1V24h11v-3.9A9 9 0 0 0 24 4z"/><path d="M20 28h8M17.5 26.5L10 33.5M30.5 26.5l7.5 7M24 31v4"/><circle cx="8" cy="38" r="4"/><circle cx="40" cy="38" r="4"/><circle cx="24" cy="40" r="4"/>',
  spirit: '<path class="a" d="M24 42S8 33 8 21.5A8.5 8.5 0 0 1 24 17a8.5 8.5 0 0 1 16 4.5C40 33 24 42 24 42z"/><path d="M14.5 23c1.2-2.8 3.6-3.9 5.8-3.2M24 4v5M11 8l3 3M37 8l-3 3"/>',
  collab: '<circle class="a" cx="24" cy="30" r="10"/><circle cx="18" cy="19" r="10"/><circle cx="30" cy="19" r="10"/>',
  rhythm: '<path d="M15 42L20 6h8l5 36z"/><path d="M11 42h26M24 34L35 13"/><circle class="a" cx="31.5" cy="20.5" r="3.6"/>',

  /* segments */
  dealers: '<path d="M6 24v17h24V24"/><path class="a" d="M4 24l3-11h22l3 11z"/><path d="M14 41v-8h8v8M12 13l-1.5 11M18 13v11M24 13l1.5 11"/><circle cx="38" cy="31" r="8"/><circle class="a" cx="38" cy="31" r="3.4"/><path d="M38 19v4M38 39v4M46 31h-4"/>',
  demos: '<circle cx="17" cy="27" r="10"/><circle class="a" cx="17" cy="27" r="3.5"/><path d="M17 17v-6h17v9M9 41h16M13 37v4M21 37v4"/><path class="a" d="M34 25c-2.5 3.5-4 5.5-4 7.5a4 4 0 0 0 8 0c0-2-1.5-4-4-7.5z"/><path d="M40 8l3-3M42 14h4"/>',
  survey: '<rect x="7" y="8" width="24" height="33" rx="2.5"/><path d="M14 8V5h10v3M12 17h14M12 23h10M12 29h6"/><circle class="a" cx="32" cy="31" r="7.5"/><path d="M37.5 36.5L44 43"/>',
  drillers: '<path d="M24 5L13 40M24 5l11 35M16.5 29h15M19.5 18h9M4 40h40M24 5v36"/><path class="a" d="M33 5h11v9h-6l-3.5 3v-3H33z"/>',
  strength: '<path class="a" d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10z"/><path d="M17 23l5 5 9-10"/>',
  promotion: '<path class="a" d="M7 19v10h6l15 8V11l-15 8z"/><path d="M13 29l3 11h5l-2.5-10M33 19c2 2 2 8 0 10M37 15c4 4 4 14 0 18M41 11c6 6 6 20 0 26"/>',

  /* channels */
  keychan: '<circle class="a" cx="24" cy="24" r="6"/><circle cx="8" cy="9" r="4"/><circle cx="40" cy="9" r="4"/><circle cx="8" cy="39" r="4"/><circle cx="40" cy="39" r="4"/><path d="M11 12l8 8M37 12l-8 8M11 36l8-8M37 36l-8-8"/>',
  projects: '<rect x="6" y="18" width="18" height="24"/><path d="M11 24h3M17 24h2M11 30h3M17 30h2M11 36h3M17 36h2M33 42V7M26 10h18M41 10v8M3 42h42"/><rect class="a" x="38.5" y="18" width="5" height="5"/>',
  beyond: '<circle cx="18" cy="29" r="13" stroke-dasharray="3 4"/><circle class="a" cx="18" cy="29" r="3"/><path d="M23 23l7-6M26 17h4v4"/><path class="a" d="M37 25s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="37" cy="13" r="2.4"/>',
  install: '<path d="M5 33h12a7 7 0 0 0 7-7V8M19 8h10M3 29v8"/><circle class="a" cx="34" cy="32" r="10"/><path d="M29 32l4 4 7-8"/>',
  sanitary: '<path d="M15 23v-8a7 7 0 0 1 7-7h5a7 7 0 0 1 7 7v3M11 23h8"/><path class="a" d="M34 23c-2 3-3 4.5-3 6a3 3 0 0 0 6 0c0-1.5-1-3-3-6z"/><path d="M5 32h38c0 6-8 10-19 10S5 38 5 32z"/>',
  rss: '<rect x="9" y="5" width="30" height="12" rx="2"/><text x="24" y="14" text-anchor="middle">RSS</text><path d="M6 27h36M8 27v15h32V27"/><rect class="a" x="13" y="20" width="8" height="7"/><rect class="a" x="27" y="21" width="8" height="6"/>',
  dept: '<path class="a" d="M4 17L24 6l20 11z"/><path d="M8 21h32M11 21v15M19.5 21v15M28.5 21v15M37 21v15M7 36h34M4 41h40"/>'
};
window.I = function (name, cls) {
  return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 48 48" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
};
