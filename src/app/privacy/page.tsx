import ClientWrapper from '@/components/layout/ClientWrapper';

export default function PrivacyPage() {
    return (
      <ClientWrapper>
        <div className="p-8 max-w-3xl mx-auto text-info-800">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy? Lol.</h1>
          <p className="mb-4">
            Listen, let&apos;s get one thing straight—there&apos;s no such thing as privacy. The Deep State, Big Tech,
            and probably your neighbor&apos;s cat are already listening to everything you do. Think incognito mode
            protects you? Cute.
          </p>
          <p className="mb-4">
            Here at Cimai, we don&apos;t even pretend to respect your privacy. In fact, if you&apos;re not running your own ops,
            you *deserve* to be tracked. You wouldn&apos;t show up to a gunfight with a toothbrush, would you?
            Because last I checked, a million-dollar smile doesn&apos;t stop bullets.
          </p>
          <h2 className="text-2xl font-bold mt-6">What We Collect</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Your IP, because why not?</li>
            <li>Your browser history—yes, even that tab.</li>
            <li>Your dreams, fears, and possibly your mother&apos;s maiden name.</li>
            <li>Whatever the NSA left behind.</li>
          </ul>
          <h2 className="text-2xl font-bold mt-6">What We Do With It</h2>
          <p className="mb-4">
            Nothing... or everything. Maybe we sell it, maybe we just admire it. Who knows? What we do know is
            that if you expect privacy, you&apos;re in the wrong era.
          </p>
          <h2 className="text-2xl font-bold mt-6">Your Options?</h2>
          <p className="mb-4">
            There are none. But hey, you can always self-host, air-gap your machines, and communicate via carrier pigeon.
            That might slow us down. Or maybe not.
          </p>
          <h2 className="text-2xl font-bold mt-6">Final Thoughts</h2>
          <p className="mb-4">
            Privacy is dead. But hey, at least we&apos;re honest about it. Welcome to the real world.
          </p>
        </div>
      </ClientWrapper>
    );
  }
  