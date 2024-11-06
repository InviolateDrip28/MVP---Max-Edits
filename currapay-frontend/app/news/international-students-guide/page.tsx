import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BlogPost() {
  return (
    <section className="space-y-12">
      <div className="w-full flex items-center justify-center">
        <div className="relative h-72 w-full">
          <Image
            src="/news/article-4-img.png"
            alt="International Students"
            objectFit="contain"
            fill
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2>
          A Guide for International Students Studying in U.S. Colleges
          and Universities
        </h2>
        <p>
          Studying in the United States offers international students
          a unique opportunity to immerse themselves in diverse
          cultures, gain a world-class education, and build valuable
          connections. This article provides an overview of what
          international students can expect, tips for navigating life
          in the U.S., and resources to make the most of their
          experience.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">Preparing for Your Journey</h3>
        <ol className="list-decimal ml-4 space-y-2">
          <li>
            <b>Visa Requirements: </b> To study in the U.S.,
            international students typically need an F-1 or M-1
            student visa. Ensure you have the necessary documents,
            including your Form I-20 from your university, proof of
            financial support, and a valid passport.
          </li>
          <li>
            <b>Financial Planning: </b> Tuition and living expenses in
            the U.S. can be high. Research scholarship opportunities
            and financial aid options available for international
            students. Create a budget that includes tuition, housing,
            food, transportation, and personal expenses.
          </li>
          <li>
            <b>Health Insurance: </b> Health care in the U.S. can be
            expensive, so having health insurance is essential. Many
            universities require students to have health insurance,
            either through the university or a private provider. Be
            sure to understand your coverage and options.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">Navigating Campus Life</h3>
        <ol className="list-decimal ml-4 space-y-2">
          <li>
            <b>Orientation Programs: </b> Most universities offer
            orientation programs for international students, which
            provide valuable information about academic expectations,
            campus resources, and cultural adjustment. Take advantage
            of these programs to meet other students and ask
            questions.
          </li>
          <li>
            <b>Cultural Adjustment:</b> Moving to a new country can be
            challenging. Be prepared for cultural differences, and
            give yourself time to adapt. Engaging with local
            communities, joining student organizations, and
            participating in cultural events can help ease the
            transition.
          </li>
          <li>
            <b>Academic Expectations: </b> U.S. academic culture may
            differ from what you&apos;re used to. Be prepared for a
            focus on critical thinking, class participation, and
            collaboration. Utilize academic resources such as tutoring
            centers, writing labs, and office hours with professors.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">Building Connections</h3>
        <ol className="list-decimal ml-4 space-y-2">
          <li>
            <b>Networking Opportunities: </b> Building relationships
            is key to both personal and professional growth. Attend
            campus events, join clubs related to your interests, and
            participate in career fairs to connect with peers and
            potential employers.
          </li>
          <li>
            <b>Support Services: </b> Many universities have dedicated
            offices for international students that provide support in
            areas such as visa advising, cultural adjustment, and
            career counseling. Don&apos;t hesitate to seek help when
            needed.
          </li>
          <li>
            <b>Making Friends: </b> Forming friendships with both
            international and domestic students can enrich your
            experience. Engage in social activities, study groups, and
            community service opportunities to meet new people.
          </li>
          <li>
            <b>Networking: </b> Engaging with local Mexican
            communities can provide emotional support and practical
            advice for navigating life in the U.S. Social media
            platforms and local community centers can facilitate
            connections.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">Practical Tips for Daily Life</h3>
        <ol className="list-decimal ml-4 space-y-2">
          <li>
            <b>Transportation:</b> Familiarize yourself with local
            transportation options. Some cities have public transit
            systems, while others may require you to rely on
            ridesharing apps or bicycles.
          </li>
          <li>
            <b>Banking: </b> Opening a U.S. bank account can help you
            manage your finances more easily. Research different banks
            and their services, including international wire
            transfers, ATM access, and fees.
          </li>
          <li>
            <b>Communication: </b> Stay connected with family and
            friends back home using apps like WhatsApp, Skype, or
            Zoom. Also, consider using services like CurraPay to
            compare costs for sending money home if needed.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">Conclusion</h3>
        <p>
          Studying in the U.S. as an international student can be an
          enriching and transformative experience. By preparing
          adequately, engaging with campus life, and building a
          support network, you can make the most of your time abroad.
          Embrace the challenges and opportunities that come your way,
          and remember that you are not alone on this journey. Your
          education and experiences in the U.S. will open doors to a
          world of possibilities.
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
