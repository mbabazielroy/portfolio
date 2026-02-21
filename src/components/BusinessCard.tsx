import { Github, Linkedin, Mail, Phone, Download, ExternalLink, Share2 } from 'lucide-react';

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
    'NOTE:Founder of Sendly — mobile money for East Africa. Username-based transfers with recipient confirmation before any funds move.',
    'END:VCARD',
  ].join('\r\n');

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

async function shareCard(portfolioUrl: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Elroy Mbabazi — Founder, Mbabazi Technologies',
        text: 'Building Sendly — safer mobile money for East Africa.',
        url: portfolioUrl,
      });
    } catch {
      // user cancelled — do nothing
    }
  } else {
    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      alert('Link copied to clipboard!');
    } catch {
      // clipboard not available
    }
  }
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
  const portfolioUrl =
    typeof window !== 'undefined'
      ? window.location.href.replace(/\/?#\/card\/?$/, '')
      : '';

  // QR code: white bg, Sendly green dots — points to portfolio root
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=3EC44A&bgcolor=18181b&data=${encodeURIComponent(portfolioUrl)}`;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">

          {/* Top bar — full Sendly brand green (this is a Sendly company card) */}
          <div className="h-1 bg-[#3EC44A]" />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/elroyheadshot.jpg"
                alt="Elroy Mbabazi"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#3EC44A]/40 flex-shrink-0"
              />
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">
                  Mbabazi Technologies Inc.
                </p>
                <h1 className="text-2xl font-bold text-white leading-tight">Elroy Mbabazi</h1>
                <p className="text-zinc-400 text-sm font-medium">Founder</p>
              </div>
            </div>

            {/* Sendly block */}
            <div className="mt-4 bg-zinc-800 border border-[#3EC44A]/20 rounded-xl px-4 py-3">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                Building
              </p>
              <p className="text-sm font-bold" style={{ color: '#3EC44A' }}>
                Sendly
              </p>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                Safer mobile money for East Africa — username transfers with
                recipient confirmation.
              </p>
            </div>
          </div>

          {/* Contact links */}
          <div className="px-8 py-6 space-y-4 border-b border-zinc-800">
            {LINKS.map(({ icon, label, href }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <span
                  className="flex-shrink-0 transition-colors"
                  style={{ color: '#3EC44A' }}
                >
                  {icon}
                </span>
                <span className="text-sm font-medium truncate">{label}</span>
              </a>
            ))}
          </div>

          {/* Footer: QR + actions */}
          <div className="px-8 py-6 flex items-end justify-between gap-4">
            {/* QR code — points to portfolio */}
            <div className="flex flex-col items-center gap-1.5">
              <img
                src={qrUrl}
                alt="Scan to open portfolio"
                width={64}
                height={64}
                className="rounded-lg"
              />
              <p className="text-xs text-zinc-600">Portfolio</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 flex-1">
              {/*
                "Save Contact" downloads a .vcf vCard file.
                On iOS Safari this triggers "Add to Contacts" natively.
                On Android it opens the Contacts app.
                Apple Wallet .pkpass requires server-side Apple certificate
                signing, which isn't available in a static site.
              */}
              <button
                onClick={downloadVCard}
                className="flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full"
                style={{ backgroundColor: '#3EC44A' }}
              >
                <Download className="w-4 h-4" />
                Save Contact
              </button>

              {/*
                Share button uses the Web Share API on mobile (iOS / Android).
                On iOS this shows the native share sheet — includes AirDrop,
                Messages, Mail, and "Add to Contacts". Falls back to clipboard copy.
              */}
              <button
                onClick={() => shareCard(portfolioUrl)}
                className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <a
                href="/#"
                className="flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full"
              >
                <ExternalLink className="w-4 h-4" />
                Portfolio
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-700 mt-4">
          elroy.mbabazi &nbsp;·&nbsp; Ontario, Canada
        </p>
      </div>
    </div>
  );
}
