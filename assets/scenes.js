/* Illustrations des lieux, affichées tant qu'aucune photo n'est déposée dans /images/<lieu>/. */
const SCENES = (() => {
  let n = 0;
  const uid = () => `s${++n}`;
  const rand = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  const scenes = {
    anafi(u) {
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFDDE7"/><stop offset="1" stop-color="#F3F0E8"/></linearGradient>
        <linearGradient id="${u}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3C6D99"/><stop offset="1" stop-color="#1D3F61"/></linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#${u}k)"/>
      <circle cx="610" cy="200" r="44" fill="#FBF7EC"/>
      <path d="M470 520 Q560 468 650 492 T800 498 V520Z" fill="#A9BCCB"/>
      <rect y="520" width="800" height="480" fill="url(#${u}m)"/>
      <g stroke="#FFFFFF" stroke-opacity=".35" stroke-width="2">
        <line x1="420" y1="560" x2="520" y2="560"/><line x1="560" y1="590" x2="700" y2="590"/><line x1="380" y1="630" x2="460" y2="630"/>
      </g>
      <g>
        <rect x="-10" y="640" width="250" height="360" fill="#F7F5F0"/>
        <rect x="200" y="700" width="40" height="300" fill="#E2DCD0"/>
        <rect x="90" y="760" width="56" height="110" fill="#2F5D8A"/>
        <rect x="240" y="740" width="190" height="260" fill="#F2EFE8"/>
        <path d="M262 740 A72 72 0 0 1 406 740Z" fill="#2F5D8A"/>
        <rect x="320" y="820" width="34" height="60" fill="#E2DCD0"/>
        <rect x="-10" y="900" width="820" height="100" fill="#ECE7DD"/>
        <rect x="430" y="860" width="380" height="140" fill="#F6F3EC"/>
      </g>`;
    },
    saarah(u) {
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8C6CC"/><stop offset=".55" stop-color="#F0C9A8"/><stop offset="1" stop-color="#F5DCC0"/></linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#${u}k)"/>
      <circle cx="420" cy="560" r="62" fill="#FAE6CC"/>
      <path d="M0 590 C150 540 300 560 420 606 S700 650 800 580 V1000 H0Z" fill="#DDA673"/>
      <path d="M0 700 C200 630 380 700 520 690 S720 640 800 690 V1000 H0Z" fill="#C98B4E"/>
      <path d="M0 830 C180 760 360 800 480 845 S700 890 800 820 V1000 H0Z" fill="#A86C38"/>
      <path d="M0 700 C200 630 380 700 520 690" fill="none" stroke="#F3D3AE" stroke-width="2" opacity=".7"/>
      <path d="M180 790 C300 770 380 800 480 845" fill="none" stroke="#C98B4E" stroke-width="2" opacity=".6"/>`;
    },
    moux(u) {
      const r = rand(7);
      let vines = "";
      for (let i = 0; i < 26; i++) {
        const y = 650 + i * 14;
        vines += `<line x1="${-40 + r() * 30}" y1="${y + 40}" x2="840" y2="${y - 30}" stroke="#5A5A2F" stroke-opacity="${0.18 + i * 0.012}" stroke-width="${1.5 + i * 0.12}" stroke-dasharray="${6 + i * 0.4} ${5 + i * 0.3}"/>`;
      }
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEDDBD"/><stop offset="1" stop-color="#E9CF9C"/></linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#${u}k)"/>
      <circle cx="630" cy="290" r="48" fill="#FBF0D6"/>
      <path d="M0 520 L120 474 L250 436 L370 404 L470 424 L590 384 L710 430 L800 452 V640 H0Z" fill="#9C9A7E" opacity=".75"/>
      <path d="M0 610 C220 566 420 600 800 560 V1000 H0Z" fill="#B8B286"/>
      ${vines}
      <path d="M0 880 C260 850 520 880 800 860 V1000 H0Z" fill="#8E8A5A"/>
      <g fill="#3E4322">
        <ellipse cx="120" cy="560" rx="18" ry="120"/><ellipse cx="158" cy="575" rx="15" ry="104"/><ellipse cx="560" cy="540" rx="12" ry="80"/>
      </g>`;
    },
    fregeneuil(u) {
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4EAE4"/><stop offset="1" stop-color="#D3DED6"/></linearGradient>
        <filter id="${u}b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
        <filter id="${u}b2" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>
      </defs>
      <rect width="800" height="1000" fill="url(#${u}k)"/>
      <g filter="url(#${u}b)" fill="#A7B9AD">
        <ellipse cx="120" cy="520" rx="170" ry="90"/><ellipse cx="380" cy="540" rx="150" ry="60"/><ellipse cx="660" cy="515" rx="190" ry="85"/>
      </g>
      <rect y="590" width="800" height="190" fill="#C6D3CB"/>
      <g stroke="#EEF2EE" stroke-width="2" opacity=".8">
        <line x1="80" y1="640" x2="260" y2="640"/><line x1="420" y1="672" x2="640" y2="672"/><line x1="200" y1="720" x2="360" y2="720"/>
      </g>
      <g filter="url(#${u}b)" fill="#7E9988" opacity=".9">
        <ellipse cx="650" cy="470" rx="150" ry="190"/>
      </g>
      <g stroke="#6F8B79" stroke-width="3" fill="none" opacity=".55">
        <path d="M560 420 Q570 540 556 640"/><path d="M610 400 Q620 540 612 660"/><path d="M680 410 Q690 540 700 650"/><path d="M730 430 Q735 540 750 630"/>
      </g>
      <rect y="560" width="800" height="90" fill="#FFFFFF" opacity=".45" filter="url(#${u}b2)"/>
      <path d="M0 790 C200 760 480 800 800 770 V1000 H0Z" fill="#8FA89A"/>
      <g stroke="#5F7A69" stroke-width="3" stroke-linecap="round">
        <line x1="90" y1="860" x2="80" y2="780"/><line x1="110" y1="860" x2="120" y2="770"/><line x1="130" y1="870" x2="146" y2="790"/>
        <line x1="640" y1="900" x2="630" y2="820"/><line x1="660" y1="900" x2="676" y2="814"/>
      </g>
      <g fill="#7B7398"><ellipse cx="120" cy="768" rx="7" ry="11"/><ellipse cx="676" cy="812" rx="7" ry="11"/></g>`;
    },
    chamblac(u) {
      const trees = [[90, 700, 70], [250, 690, 58], [610, 705, 66], [730, 690, 50]];
      let orchard = "";
      trees.forEach(([x, y, r], k) => {
        orchard += `<rect x="${x - 5}" y="${y}" width="10" height="${r + 30}" fill="#3B2B22"/><circle cx="${x}" cy="${y}" r="${r}" fill="${k % 2 ? "#3F5133" : "#4A5E3A"}"/>`;
        for (let j = 0; j < 6; j++) orchard += `<circle cx="${x - r * .6 + (j * 37) % (r * 1.2)}" cy="${y - r * .4 + (j * 23) % (r * .9)}" r="5" fill="#B84A35"/>`;
      });
      let rain = "";
      for (let i = 0; i < 60; i++) { const x = (i * 137) % 820, y = (i * 263) % 640; rain += `<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + 34}"/>`; }
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4E5866"/><stop offset="1" stop-color="#9AA0A3"/></linearGradient>
        <radialGradient id="${u}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F6C77E" stop-opacity=".7"/><stop offset="1" stop-color="#F6C77E" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#${u}k)"/>
      <path d="M0 600 C200 560 420 590 800 555 V1000 H0Z" fill="#5E6B4D"/>
      <path d="M0 640 C160 615 300 640 460 625 S700 600 800 620" fill="none" stroke="#3F4A33" stroke-width="16" stroke-linecap="round"/>
      <g>
        <path d="M330 520 L470 420 L610 520Z" fill="#4A3A32"/>
        <rect x="350" y="520" width="240" height="190" fill="#EDE3D2"/>
        <g stroke="#5A3E2E" stroke-width="9">
          <line x1="350" y1="520" x2="590" y2="520"/><line x1="350" y1="615" x2="590" y2="615"/><line x1="350" y1="708" x2="590" y2="708"/>
          <line x1="352" y1="520" x2="352" y2="710"/><line x1="430" y1="520" x2="430" y2="710"/><line x1="510" y1="520" x2="510" y2="710"/><line x1="588" y1="520" x2="588" y2="710"/>
          <line x1="352" y1="615" x2="430" y2="520"/><line x1="510" y1="520" x2="588" y2="615"/>
        </g>
        <circle cx="470" cy="660" r="70" fill="url(#${u}g)"/>
        <rect x="448" y="635" width="44" height="50" fill="#F2C27A"/>
        <rect x="560" y="400" width="22" height="70" fill="#5A4A40"/>
      </g>
      ${orchard}
      <path d="M0 800 C260 780 520 810 800 790 V1000 H0Z" fill="#4E5B3E"/>
      <g stroke="#E3E8EC" stroke-opacity=".35" stroke-width="2">${rain}</g>`;
    },
    venise(u) {
      let poles = "";
      [[300, "#2F5D8A"], [340, "#A4402F"], [380, "#2F5D8A"]].forEach(([x, c]) => {
        poles += `<rect x="${x}" y="610" width="12" height="190" fill="#F3EFE6"/>`;
        for (let k = 0; k < 6; k++) poles += `<rect x="${x}" y="${616 + k * 30}" width="12" height="14" fill="${c}"/>`;
      });
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C5FA8"/><stop offset="1" stop-color="#8FB2DA"/></linearGradient>
        <linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4F8C8C"/><stop offset="1" stop-color="#2F5F63"/></linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#${u}k)"/>
      <rect x="0" y="420" width="250" height="400" fill="#D9C2A0"/>
      <g fill="#7A6A58" opacity=".55">${[0, 1, 2, 3].map((r) => [30, 90, 150, 200].map((c) => `<path d="M${c} ${470 + r * 85} v-26 a14 14 0 0 1 28 0 v26Z"/>`).join("")).join("")}</g>
      <rect x="250" y="500" width="70" height="320" fill="#B9A58A"/>
      <rect x="470" y="200" width="330" height="620" fill="#EFE7D8"/>
      <rect x="470" y="200" width="330" height="22" fill="#D8CDBA"/>
      <path d="M520 200 L534 120 L548 200Z" fill="#B8A98F"/>
      <g fill="#5E5A52" opacity=".75">${[0, 1, 2, 3, 4].map((r) => [500, 570, 640, 710].map((c) => `<rect x="${c}" y="${250 + r * 110}" width="34" height="64"/>`).join("")).join("")}</g>
      <rect y="800" width="800" height="200" fill="url(#${u}w)"/>
      ${poles}
      <g stroke="#E4F0EC" stroke-opacity=".5" stroke-width="2"><line x1="40" y1="850" x2="200" y2="850"/><line x1="260" y1="900" x2="420" y2="900"/><line x1="90" y1="950" x2="240" y2="950"/></g>
      <path d="M430 880 L800 850 L800 930 L470 930 Q440 915 430 880Z" fill="#7A4524"/>
      <path d="M520 870 L740 852 L740 880 L530 892Z" fill="#B8743E"/>
      <path d="M560 862 h120 v-26 h-110Z" fill="#3B2A1E"/>
      <path d="M380 930 Q480 940 560 930" fill="none" stroke="#F3F7F4" stroke-width="5" stroke-opacity=".7"/>`;
    },
  };

  return {
    /* variante "lieu" (paysage) ou "detail" (recadrage serré) */
    svg(id, variante = "lieu") {
      const draw = scenes[id];
      if (!draw) return "";
      const vb = variante === "detail" ? "180 420 440 560" : "0 0 800 1000";
      return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${draw(uid())}</svg>`;
    },
  };
})();
