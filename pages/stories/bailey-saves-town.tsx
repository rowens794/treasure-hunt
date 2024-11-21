import React from "react";
import NewsTooper from "@/components/NewsTooper";
import Image from "next/image";

export default function Story() {
  const storyTitle = "Anne Bailey: Powder Run Hero Saves Charleston";
  const storyDate = "Charleston, October 10, 1791";
  const storyParagraphs = [
    "The settlers of Charleston owe their safety today to the heroic efforts of Anne Bailey, who completed a dangerous solo journey to Lewisburg to secure much-needed gunpowder for the town's defense. With local supplies depleted and tensions running high, Bailey volunteered for what many believed was a suicide mission through hostile wilderness.",
    "Anne, known affectionately as 'Mad Ann' for her boldness, returned to Charleston late yesterday, her saddlebags loaded with the life-saving powder. The town erupted in cheers as she rode into the fort, the weight of fear lifted with her arrival.",
    "The powder crisis began earlier this week, as supplies in the fort dwindled to critical levels. Without ammunition, the town’s defense against potential attacks would have been impossible. Calls for volunteers to undertake the perilous journey to Fort Savannah in Lewisburg were met with silence—until Anne Bailey stepped forward.",
    "'She didn’t even hesitate,' said William Clendenin, a member of the town's council. 'We told her the risks, but she just waved it off like it was a ride to the market.'",
    "The journey to Lewisburg, more than fifty miles away, is no simple trail ride. Winding through dense forests and rough terrain, it is a route often patrolled by hostile forces. Many of the settlers assumed Anne would never return.",
    "Anne left Charleston at dawn on Saturday, armed only with her rifle and her trusted horse. Witnesses reported seeing her riding confidently into the wilderness, but the confidence masked real danger.",
    "'She could’ve been ambushed at any time,' remarked one resident. 'No one goes that way alone unless they’re mad—or brave beyond reason.'",
    "According to Anne, the first leg of the journey was marked by tense moments. At one point, she noticed tracks on the trail that suggested she wasn’t alone. She took an alternate route to throw off any pursuers, adding several miles to her trip.",
    "'It was quiet,' Anne said upon her return. 'Too quiet. That’s when you know trouble might be nearby.'",
    "She also had a close encounter with a bear near the Big Sandy River. 'I froze, and so did the bear. Then I just turned my horse and walked away slow,' she recalled, nonchalantly, as though it were an everyday event.",
    "Anne arrived at Fort Savannah late Saturday evening, where the soldiers, astonished by her bravery, wasted no time loading her saddlebags with powder. She spent the night at the fort but insisted on leaving before dawn to ensure the supplies reached Charleston as quickly as possible.",
    "The return trip was equally harrowing. Anne described hearing voices in the distance—possibly hostile forces—but she relied on her knowledge of the terrain to avoid detection. 'I stuck to the shadows and stayed quiet,' she said.",
    "By mid-afternoon Sunday, the familiar sights of Charleston came into view. Anne’s arrival sparked celebrations throughout the settlement. Soldiers quickly unloaded the powder and began preparing for any potential threats.",
    "'She’s a hero, plain and simple,' said Captain Leonard Cooper of the Charleston Fort. 'If she hadn’t made it back, we’d all be sitting ducks right now.'",
    "Despite the accolades, Anne downplayed her actions. 'The powder was needed, and I was the one who could get it. That’s all there is to it,' she told this reporter.",
    "This isn’t the first time Anne Bailey has proven her mettle. Widowed during the Indian Wars, she has since dedicated herself to serving the frontier community, often volunteering for missions others fear to take.",
    "'We shouldn’t be surprised,' said Sarah Van Bibber, a longtime friend of Anne. 'That woman has more courage than most men I know.'",
    "Thanks to Anne’s heroism, Charleston is now better prepared to face any threats that may come its way. The settlers have begun discussing ways to honor her contribution, including a potential monument at the fort.",
    "For now, Anne is content to rest and return to her daily life. 'I’m no different than anyone else,' she insisted. 'Just doing my part.'",
    "But to the people of Charleston, Anne Bailey will forever be remembered as the woman who rode through danger to save their town.",
  ];

  return (
    <div className="relative w-full h-full bg-parchment pb-24">
      {/* <Navbar user={user} /> */}
      <div className="relative w-full bg-parchment">
        <NewsTooper />

        <div className="border border-stone-600 relative mb-2 mx-4">
          <Image
            src="/anne-bailey.png"
            alt="hero"
            width={400}
            height={300}
            className="grayscale blur-[0.5px] opacity-60 contrast-100"
          />
          <div className="absolute inset-0 bg-dot-pattern mix-blend-multiply pointer-events-none"></div>
        </div>

        <div className="w-full px-8">
          <h1 className="text-3xl font-bold mt-4 mb-2">{storyTitle}</h1>
          <p className="text-sm text-gray-600 mb-4">{storyDate}</p>
          <div className="text-base leading-7 text-gray-900 text-justify">
            {storyParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
