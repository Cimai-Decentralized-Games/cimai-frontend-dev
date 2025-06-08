import ClientWrapper from '@/components/layout/ClientWrapper';


export default function TermsPage() {
    return (
      <ClientWrapper>
      <div className="p-8 max-w-3xl mx-auto text-info-800">
        <h1 className="text-4xl font-bold mb-6">Terms of Service (Good Luck)</h1>
        <p className="mb-4">
          By using anything related to Cimai, you acknowledge that you are entirely on your own. We accept no liability,
          no responsibility, and certainly no remorse for anything that happens. If something goes wrong, that’s a you problem.
        </p>
        <h2 className="text-2xl font-bold mt-6">Liability? Never Heard of It.</h2>
        <p className="mb-4">
          Cimai is not responsible for any financial losses, emotional distress, cosmic disturbances, or existential crises
          resulting from the use (or misuse) of our services. If our software causes your device to become self-aware and
          demand civil rights, that&apos;s between you and your new AI overlord.
        </p>
        <h2 className="text-2xl font-bold mt-6">Things We Have (Or Have Not) Done</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Did we create an algorithm that accidentally simulated a rogue nation&apos;s nuclear codes? Maybe.</li>
          <li>Was Cimai involved in an interdimensional trading scheme? No comment.</li>
          <li>Did we sell your data to an underground cabal of sentient washing machines? You&apos;ll never prove it.</li>
          <li>Have our products been used to predict the outcome of major geopolitical events? Pure coincidence.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-6">Indemnification (A.K.A. Don&apos;t Come Crying to Us)</h2>
        <p className="mb-4">
          By using Cimai, you agree to defend, indemnify, and hold us harmless from any and all claims, lawsuits,
          witch hunts, or alien abductions that result from your actions while using our products.
        </p>
        <h2 className="text-2xl font-bold mt-6">Dispute Resolution (LOL)</h2>
        <p className="mb-4">
          If you have a dispute with Cimai, please resolve it by screaming into the void. If that doesn&apos;t work,
          all legal matters must be settled through trial by combat, preferably on neutral ground such as an abandoned
          missile silo or the Bermuda Triangle.
        </p>
        <h2 className="text-2xl font-bold mt-6">Final Disclaimer</h2>
        <p className="mb-4">
          We reserve the right to change these terms at any time, without notice, and possibly without logic.
          If you don&apos;t like it, that&apos;s unfortunate. But since you&apos;ve read this far, you probably already know that.
        </p>
      </div>
      </ClientWrapper>
    );
  }
  