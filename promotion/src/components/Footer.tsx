import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Image
          src="/logo.png"
          alt="ListeningMind"
          width={140}
          height={22}
          className="mx-auto mb-4 brightness-0 invert opacity-80"
        />
        <div className="flex items-center justify-center gap-4 text-xs">
          <a
            href="mailto:hp@listeningmind.com"
            className="hover:text-white transition-colors"
          >
            hp@listeningmind.com
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="https://listeningmind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            listeningmind.com
          </a>
        </div>
        <p className="text-xs mt-3">
          &copy; 2026 ListeningMind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
