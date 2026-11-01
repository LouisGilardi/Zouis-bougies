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
    sahara(u) {
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
    paris(u) {
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C3C9CF"/><stop offset="1" stop-color="#E4E2DB"/></linearGradient>
        <radialGradient id="${u}l" cx=".15" cy=".8" r=".55"><stop offset="0" stop-color="#F2C98A" stop-opacity=".45"/><stop offset="1" stop-color="#F2C98A" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="1000" fill="#45474C"/>
      <rect x="190" y="110" width="420" height="720" fill="url(#${u}k)"/>
      <path d="M190 640 L250 640 L250 600 L268 600 L268 640 L330 640 L360 610 L430 610 L460 640 L520 640 L520 590 L540 590 L540 640 L610 640 V830 H190Z" fill="#8D9197"/>
      <g fill="#F3E3C2" opacity=".9"><rect x="280" y="680" width="16" height="24"/><rect x="470" y="672" width="16" height="24"/><rect x="380" y="700" width="16" height="24"/></g>
      <rect x="190" y="110" width="420" height="720" fill="none" stroke="#ECE7DD" stroke-width="16"/>
      <line x1="400" y1="110" x2="400" y2="830" stroke="#ECE7DD" stroke-width="10"/>
      <line x1="190" y1="350" x2="610" y2="350" stroke="#ECE7DD" stroke-width="8"/>
      <line x1="190" y1="590" x2="610" y2="590" stroke="#ECE7DD" stroke-width="8"/>
      <rect x="150" y="826" width="500" height="22" fill="#D9D3C7"/>
      <rect y="880" width="800" height="120" fill="#6E5641"/>
      <g stroke="#5A4533" stroke-width="2">
        <path d="M0 940 L60 900 L120 940 L180 900 L240 940 L300 900 L360 940 L420 900 L480 940 L540 900 L600 940 L660 900 L720 940 L780 900 L840 940"/>
        <path d="M0 1000 L60 960 L120 1000 L180 960 L240 1000 L300 960 L360 1000 L420 960 L480 1000 L540 960 L600 1000 L660 960 L720 1000 L780 960 L840 1000"/>
      </g>
      <rect width="800" height="1000" fill="url(#${u}l)"/>`;
    },
    meribel(u) {
      const firs = [[60, 760, 1.2], [130, 790, 1.5], [210, 770, 1], [620, 780, 1.3], [700, 760, 1.6], [760, 800, 1.1], [300, 820, 1.4]];
      let trees = "";
      firs.forEach(([x, y, s]) => {
        trees += `<path d="M${x} ${y - 150 * s} L${x + 46 * s} ${y} L${x - 46 * s} ${y}Z" fill="#24382E"/><path d="M${x} ${y - 150 * s} L${x + 14 * s} ${y - 108 * s} L${x - 14 * s} ${y - 108 * s}Z" fill="#F4F6F8"/>`;
      });
      return `
      <defs>
        <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E8CC0"/><stop offset="1" stop-color="#CFE0EE"/></linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#${u}k)"/>
      <path d="M0 520 L140 330 L230 420 L360 250 L480 400 L590 300 L800 480 V700 H0Z" fill="#A9BACB"/>
      <path d="M140 330 L190 400 L170 395 L150 420 L120 360Z M360 250 L420 330 L395 325 L370 350 L330 300Z M590 300 L650 360 L620 355 L600 375 L570 330Z" fill="#FFFFFF"/>
      <path d="M0 640 C200 590 420 620 800 580 V1000 H0Z" fill="#E9EEF2"/>
      <g>
        <path d="M400 560 L520 500 L640 560Z" fill="#FFFFFF"/>
        <rect x="420" y="560" width="200" height="130" fill="#8A6142"/>
        <rect x="420" y="640" width="200" height="50" fill="#9C9690"/>
        <rect x="450" y="585" width="36" height="40" fill="#F2C27A"/><rect x="554" y="585" width="36" height="40" fill="#F2C27A"/>
        <rect x="585" y="505" width="18" height="40" fill="#6E6A66"/>
      </g>
      <path d="M0 760 C220 720 520 760 800 730 V1000 H0Z" fill="#F7F9FB"/>
      ${trees}
      <path d="M0 880 C260 850 520 880 800 860 V1000 H0Z" fill="#FFFFFF"/>`;
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
