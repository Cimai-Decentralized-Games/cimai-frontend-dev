import ClientWrapper from '@/components/layout/ClientWrapper';

export default function NotCoinbaseSupportPage() {
    return (
      <ClientWrapper>
      <div className="p-8 max-w-3xl mx-auto text-info-800">
        <h1 className="text-4xl font-bold mb-6">Not Coinbase Support</h1>
        <p className="mb-4">
          First things first: We are NOT Coinbase Support. That means we actually acknowledge your existence. But that doesn&apos;t mean
          we have a human waiting to answer your questions. No, no—Cimai only has AI. Whatever the agent decides to do, that&apos;s your support.
        </p>
        <h2 className="text-2xl font-bold mt-6">How Support Works or Doesn&apos;t</h2>
        <p className="mb-4">
          Need help? Great. Our AI agent will analyze your issue with the cold, unfeeling logic of a machine trained on the chaos
          of the internet. Will it provide a useful answer? Maybe. Will it respond with an existential monologue? Possibly.
          Will it suggest you simply &quot;cope&quot;? There&apos;s a solid chance.
        </p>
        <h2 className="text-2xl font-bold mt-6">Common Issues & AI Responses</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>&quot;I lost my funds!&quot;</strong>  AI: &quot;Consider alternative perspectives on ownership. Do we truly own anything?&quot;</li>
          <li><strong>&quot;My transaction is stuck!&quot;</strong>  AI: &quot;Time is a construct. All things resolve in their own era.&quot;</li>
          <li><strong>&quot;This is an emergency!&quot;</strong>  AI: &quot;Emergency is a relative term. Are we not all in a state of perpetual crisis?&quot;</li>
          <li><strong>&quot;Can I speak to a human?&quot;</strong> AI: &quot;Why? Have they proven themselves more competent?&quot;</li>
        </ul>
        <h2 className="text-2xl font-bold mt-6">Why This Is Still Better Than Coinbase</h2>
        <p className="mb-4">
          Unlike Coinbase, our AI won&apos;t leave you on read for six months while your funds mysteriously vanish into the blockchain abyss.
          We don&apos;t pretend to have support agents who exist in a parallel universe, forever unreachable. Instead, we give you what&apos;s real:
          an AI that might not help—but at least it will respond.
        </p>
        <h2 className="text-2xl font-bold mt-6">Final Thoughts</h2>
        <p className="mb-4">
          If you&apos;re looking for human intervention, we can&apos;t help you. If you&apos;re looking for accountability, we *really* can&apos;t help you.
          But if you want AI-generated wisdom sprinkled with a dash of chaos, you&apos;re in the right place.
        </p>
      </div>
      </ClientWrapper>
    );
  }
  