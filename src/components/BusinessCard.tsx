import { Github, Linkedin, Mail, Phone, Download, ExternalLink } from 'lucide-react';

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Elroy Mbabazi',
    'ORG:Mbabazi Technologies Inc.',
    'TITLE:Founder',
    'TEL;TYPE=CELL:+14372210664',
    'EMAIL:mbabazielroy@yahoo.com',
    'URL:https://www.linkedin.com/in/elroy-mbabazi/',
    'URL:https://github.com/mbabazielroy',
    'NOTE:Founder of Sendly — mobile money for East Africa. Building safer transactions with username-based transfers and recipient confirmation.',
    'END:VCARD',
  ].join('\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'elroy-mbabazi.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const LINKS = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'mbabazielroy@yahoo.com',
    href: 'mailto:mbabazielroy@yahoo.com',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: '+1 (437) 221-0664',
    href: 'tel:+14372210664',
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: 'linkedin.com/in/elroy-mbabazi',
    href: 'https://www.linkedin.com/in/elroy-mbabazi/',
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: 'github.com/mbabazielroy',
    href: 'https://github.com/mbabazielroy',
  },
];

export default function BusinessCard() {
  const portfolioUrl = typeof window !== 'undefined'
    ? window.location.href.replace(/\/?#\/card$/, '')
    : '';

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=047857&bgcolor=ffffff&data=${encodeURIComponent(portfolioUrl)}`;

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800">

          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500" />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-stone-800">
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-500 mb-3">
              Mbabazi Technologies Inc.
            </p>
            <h1 className="text-3xl font-bold text-white mb-1">
              Elroy Mbabazi
            </h1>
            <p className="text-stone-400 font-medium">Founder</p>

            <div className="mt-4 bg-stone-800/60 border border-emerald-900/60 rounded-xl px-4 py-3">
              <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-1">Building</p>
              <p className="text-sm text-emerald-400 font-semibold">Sendly</p>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Safer mobile money for East Africa — username transfers with recipient confirmation.
              </p>
            </div>
          </div>

          {/* Contact links */}
          <div className="px-8 py-6 space-y-4 border-b border-stone-800">
            {LINKS.map(({ icon, label, href }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-3 text-stone-300 hover:text-emerald-400 transition-colors group"
              >
                <span className="text-emerald-600 group-hover:text-emerald-400 transition-colors flex-shrink-0">
                  {icon}
                </span>
                <span className="text-sm font-medium truncate">{label}</span>
              </a>
            ))}
          </div>

          {/* Footer: QR + actions */}
          <div className="px-8 py-6 flex items-end justify-between gap-4">
            {/* QR code */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={qrUrl}
                alt="Scan to visit portfolio"
                width={70}
                height={70}
                className="rounded-lg opacity-90"
              />
              <p className="text-xs text-stone-500">Portfolio</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 flex-1">
              <button
                onClick={downloadVCard}
                className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full"
              >
                <Download className="w-4 h-4" />
                Save Contact
              </button>
              <a
                href="/#"
                className="flex items-center justify-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full"
              >
                <ExternalLink className="w-4 h-4" />
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Sub-label */}
        <p className="text-center text-xs text-stone-600 mt-4">
          elroy.mbabazi &nbsp;·&nbsp; Ontario, Canada
        </p>
      </div>
    </div>
  );
}
