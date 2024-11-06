import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
export default function BlogPost() {
  return (
    <section className="space-y-12">
      <div className="w-full flex items-center justify-center">
      <div className="relative h-72 w-full">
          <Image
            src="/news/article-3-img.png"
            alt="International Money Transfers"
            objectFit="contain"
            fill
          />
        </div>
      </div>
      <div className="space-y-4">
        <h2>Understanding International Money Transfers: A Guide</h2>
        <p>
          While Venmo is a popular payment app in the U.S., it does
          not work in Europe or other international markets. This
          limitation is important for individuals looking to send
          money abroad. Here&apos;s a brief overview of the basics of
          international money transfers, including how to compare
          costs using tools like CurraPay.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">
          Basics of International Money Transfers
        </h3>
        <ol className="list-decimal ml-4 space-y-2">
          <li>
            <b>Transfer Methods:</b> There are several ways to send
            money internationally, including:
            <ol className="list-disc ml-12 pt-2 space-y-2">
              <li>
                <b>Bank Transfers:</b> Traditional banks offer
                international wire transfers, but they often come with
                high fees and less favorable exchange rates.
              </li>
              <li>
                <b>Money Transfer Services: </b> Companies like
                Western Union, MoneyGram, and newer digital services
                such as Wise (formerly TransferWise) and Remitly offer
                faster and often cheaper alternatives.
              </li>
              <li>
                <b>Peer-to-Peer Apps: </b> While apps like Venmo,
                Zelle, and Cash App are popular in the U.S., they
                generally do not support international transfers.
              </li>
            </ol>
          </li>

          <li>
            <b>Costs Involved: </b> When sending money abroad,
            consider the following:
            <ol className="list-disc ml-12 pt-2 space-y-2">
              <li>
                <b>Transfer Fees: </b> Different providers have
                varying fee structures. These can be flat fees or a
                percentage of the amount sent.
              </li>
              <li>
                <b>Exchange Rates: </b> The rate at which your
                currency converts to the recipient&apos;s currency can
                significantly affect the total amount received. Some
                providers may offer less favorable rates.
              </li>
              <li>
                <b>Speed of Transfer: </b> Transfers can take anywhere
                from minutes to several days, depending on the method
                chosen.
              </li>
              <li>
                <b>Security and Regulation: </b> Always use reputable
                services that comply with international regulations to
                ensure the security of your funds. Look for services
                that provide tracking options and customer support.
              </li>
            </ol>
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">
          Using CurraPay for Cost Comparison
        </h3>
        <p>
          CurraPay is an innovative tool that helps users compare the
          costs of sending money internationally through various
          providers. Here&apos;s how it works:
        </p>
        <ol className="list-decimal ml-4 space-y-2">
          <li>
            <b>Cost Transparency:</b> CurraPay allows users to see the
            total costs associated with different transfer services,
            including fees and exchange rates. This helps users make
            informed decisions.
          </li>
          <li>
            <b>User-Friendly Interface:</b> The platform is designed
            to be intuitive, allowing users to input the amount they
            want to send and receive a list of options based on their
            preferences.
          </li>
          <li>
            <b>Fast Comparisons:</b> By aggregating information from
            multiple providers, CurraPay simplifies the process of
            finding the best deal, ensuring that users save money on
            their international transfers.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">Conclusion</h3>
        <p>
          While Venmo does not operate in Europe, there are many
          alternatives for sending money internationally.
          Understanding the basics of international money transfers,
          including fees and exchange rates, is essential for making
          informed decisions. Tools like CurraPay provide valuable
          insights, allowing users to compare costs and choose the
          best options for sending money abroad efficiently and
          securely.
        </p>
      </div>
      <div className="-translate-x-1 translate-y-8">
        <Link
          className="inline-flex items-center text-black hover:text-accent hover:underline"
          href="/news"
        >
          <ChevronLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Link>
      </div>
    </section>
  );
}
