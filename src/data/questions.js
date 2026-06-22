export const questions = [
  {
    id: 1,
    type: "situation",
    parity: "odd",
    text: `清晨离开休息点巡视四周时，你会先：`,
    en: `Leaving your resting spot at dawn, you first...`,
    emoji: ["📡", "🗺️", "🌄", "🌿"],
    options: [
      { label: "A", text: `发出信号，先和附近同伴对上"频道"`, en: `Signal to nearby companions first`, animal: "滇金丝猴" },
      { label: "B", text: `看好路线，判断怎样行动最有效率`, en: `Scout the route for maximum efficiency`, animal: "豺" },
      { label: "C", text: `先去开阔点，确保视野够大`, en: `Head to high ground for a wider view`, animal: "黑颈鹤" },
      { label: "D", text: `一声不响沿边线移动，先不暴露自己`, en: `Move silently along the edge, stay hidden`, animal: "雪豹" }
    ]
  },
  {
    id: 2,
    type: "situation",
    parity: "even",
    text: `山里突然降温起风，你会：`,
    en: `Temperature drops and wind picks up in the mountains. You...`,
    emoji: ["🌲", "🍽️", "🫥", "🏔️"],
    options: [
      { label: "A", text: `缩回高处舒服的位置，先少消耗点体力`, en: `Retreat to a cozy spot and conserve energy`, animal: "小熊猫" },
      { label: "B", text: `不急着走，守着附近能吃的资源更实际`, en: `Stay put and guard nearby food resources`, animal: "亚洲黑熊" },
      { label: "C", text: `迅速躲进隐蔽地带，先把自己藏好`, en: `Quickly find cover and stay hidden`, animal: "林麝" },
      { label: "D", text: `稳稳挪到更能扛风的地方，不慌不忙`, en: `Calmly move to more sheltered ground`, animal: "羚牛" }
    ]
  },
  {
    id: 3,
    type: "core",
    parity: "odd",
    text: `你发现一片不错的食物点，第一反应是：`,
    en: `You find a great food source. Your first instinct is to...`,
    emoji: ["📢", "🤝", "👁️", "🕵️"],
    options: [
      { label: "A", text: `先让同伴知道，消息共享最重要`, en: `Tell companions first — sharing info matters most`, animal: "滇金丝猴" },
      { label: "B", text: `看能不能配合起来，把资源拿得更稳`, en: `See if coordinating with others gets more`, animal: "豺" },
      { label: "C", text: `先保持一点距离，确认周围动静`, en: `Keep distance and check the surroundings first`, animal: "黑颈鹤" },
      { label: "D", text: `先伏低观察，等最合适的时候再靠近`, en: `Crouch and observe, approach at the right moment`, animal: "雪豹" }
    ]
  },
  {
    id: 4,
    type: "situation",
    parity: "even",
    text: `你刚被陌生动静惊到，最像哪种反应：`,
    en: `An unfamiliar sound startles you. Your reaction is most like...`,
    emoji: ["🌳", "💪", "💨", "🧱"],
    options: [
      { label: "A", text: `先上树，换到更安全的位置`, en: `Climb up, get to a safer position`, animal: "小熊猫" },
      { label: "B", text: `先把气势顶出来，让对方知道别乱来`, en: `Stand your ground and show you mean business`, animal: "亚洲黑熊" },
      { label: "C", text: `轻快撤开，不和风险正面对撞`, en: `Slip away quickly, avoid direct confrontation`, animal: "林麝" },
      { label: "D", text: `先稳住阵脚，别自己先乱`, en: `Stay calm, don't panic`, animal: "羚牛" }
    ]
  },
  {
    id: 5,
    type: "situation",
    parity: "odd",
    text: `要穿过一段陌生区域，你最可能：`,
    en: `You need to cross unfamiliar territory. You most likely...`,
    emoji: ["🌿", "👥", "🔭", "🪨"],
    options: [
      { label: "A", text: `走高处，利用树与树之间的通道`, en: `Take the high route through the treetops`, animal: "滇金丝猴" },
      { label: "B", text: `找适合一起推进的路线`, en: `Find a route that works for the whole group`, animal: "豺" },
      { label: "C", text: `选方便提前发现风险的开阔路段`, en: `Choose open ground where you can spot danger early`, animal: "黑颈鹤" },
      { label: "D", text: `贴着掩体和地形边缘走`, en: `Hug cover and terrain edges`, animal: "雪豹" }
    ]
  },
  {
    id: 6,
    type: "situation",
    parity: "even",
    text: `当天气变差、吃的也少了，你会：`,
    en: `Weather worsens and food gets scarce. You...`,
    emoji: ["😴", "🍖", "👻", "🐂"],
    options: [
      { label: "A", text: `能休息就休息，先把消耗降下来`, en: `Rest as much as possible, cut energy use`, animal: "小熊猫" },
      { label: "B", text: `先想办法补充能量，别让自己亏着`, en: `Focus on finding food, don't let yourself go hungry`, animal: "亚洲黑熊" },
      { label: "C", text: `减少存在感，先把自己藏稳`, en: `Lay low and stay hidden`, animal: "林麝" },
      { label: "D", text: `扛住，当下最重要的是维持稳定状态`, en: `Hold steady — stability is what matters now`, animal: "羚牛" }
    ]
  },
  {
    id: 7,
    type: "situation",
    parity: "odd",
    text: `如果同伴或附近个体突然出状况，你会：`,
    en: `A companion suddenly gets into trouble. You...`,
    emoji: ["📍", "⚡", "👀", "🤫"],
    options: [
      { label: "A", text: `先呼应、定位，确保彼此知道位置`, en: `Call out, locate each other, stay connected`, animal: "滇金丝猴" },
      { label: "B", text: `迅速进入协作状态，该配合就配合`, en: `Jump into action, coordinate immediately`, animal: "豺" },
      { label: "C", text: `拉开警戒距离，保证自己能看清全局`, en: `Keep a watchful distance, assess the full picture`, animal: "黑颈鹤" },
      { label: "D", text: `自己悄悄靠近处理，不想惊动太多`, en: `Quietly handle it yourself, without stirring things up`, animal: "雪豹" }
    ]
  },
  {
    id: 8,
    type: "situation",
    parity: "even",
    text: `一天快结束了，你最想把自己安顿在：`,
    en: `Day is ending. You most want to settle in...`,
    emoji: ["☁️", "🥜", "🌑", "⛰️"],
    options: [
      { label: "A", text: `高一点、软一点、舒服一点的地方`, en: `Somewhere high, soft, and comfortable`, animal: "小熊猫" },
      { label: "B", text: `靠近资源、明天也方便继续找吃的地方`, en: `Close to food sources, easy to continue tomorrow`, animal: "亚洲黑熊" },
      { label: "C", text: `最不容易被发现的地方`, en: `The place least likely to be found`, animal: "林麝" },
      { label: "D", text: `地形稳、退路清楚的地方`, en: `Stable terrain with clear escape routes`, animal: "羚牛" }
    ]
  },
  {
    id: 9,
    type: "core",
    parity: "odd",
    text: `你最信任的安全感来自：`,
    en: `Your deepest sense of security comes from...`,
    emoji: ["🫂", "🎯", "🔭", "🌫️"],
    options: [
      { label: "A", text: `我知道同伴在哪`, en: `Knowing where my companions are`, animal: "滇金丝猴" },
      { label: "B", text: `我知道队伍怎么配合`, en: `Knowing how the team coordinates`, animal: "豺" },
      { label: "C", text: `我看得清局势`, en: `Being able to read the situation clearly`, animal: "黑颈鹤" },
      { label: "D", text: `别人看不见我`, en: `Others can't see me`, animal: "雪豹" }
    ]
  },
  {
    id: 10,
    type: "situation",
    parity: "even",
    text: `如果有人抢你盯上的资源，你更可能：`,
    en: `Someone takes the resource you had your eye on. You more likely...`,
    emoji: ["🔄", "😤", "↩️", "🛡️"],
    options: [
      { label: "A", text: `算了，换个点继续`, en: `Let it go, find another spot`, animal: "小熊猫" },
      { label: "B", text: `这不行，我得把场子找回来`, en: `Not okay — I'm getting it back`, animal: "亚洲黑熊" },
      { label: "C", text: `不正面硬碰，退一步再看`, en: `Avoid confrontation, step back and reassess`, animal: "林麝" },
      { label: "D", text: `顶住，对方真要来我也不虚`, en: `Hold firm — I'm not backing down if pushed`, animal: "羚牛" }
    ]
  },
  {
    id: 11,
    type: "core",
    parity: "odd",
    text: `哪个场景最像你的"主场"：`,
    en: `Which scene feels most like your home turf?`,
    emoji: ["🌲", "🌿", "🌾", "🏔️"],
    options: [
      { label: "A", text: `树冠之间，热闹但有秩序`, en: `Among the treetops — lively but ordered`, animal: "滇金丝猴" },
      { label: "B", text: `林地里，行动讲究配合`, en: `In the forest — movement requires coordination`, animal: "豺" },
      { label: "C", text: `湿地或开阔地，时刻保持警觉`, en: `Wetlands or open ground — always alert`, animal: "黑颈鹤" },
      { label: "D", text: `岩坡与高山之间，安静地掌控一切`, en: `Rocky slopes and high peaks — quietly in control`, animal: "雪豹" }
    ]
  },
  {
    id: 12,
    type: "core",
    parity: "even",
    text: `你最不能接受的是：`,
    en: `What's most unacceptable to you?`,
    emoji: ["😮‍💨", "😠", "👁️", "🌀"],
    options: [
      { label: "A", text: `被迫一直高强度运转，连休息都不行`, en: `Forced to run at full speed with no rest`, animal: "小熊猫" },
      { label: "B", text: `到嘴的东西突然没了`, en: `Having something taken right before you get it`, animal: "亚洲黑熊" },
      { label: "C", text: `自己的踪迹被轻易暴露`, en: `Your whereabouts easily exposed`, animal: "林麝" },
      { label: "D", text: `节奏乱掉，影响整体状态`, en: `Losing your rhythm, disrupting your whole state`, animal: "羚牛" }
    ]
  },
  {
    id: 13,
    type: "situation",
    parity: "odd",
    text: `要保护年幼个体或弱小同伴时，你会：`,
    en: `When protecting a young or vulnerable companion, you...`,
    emoji: ["🫂", "🛡️", "🌅", "🤫"],
    options: [
      { label: "A", text: `先把大家聚到能互相照应的位置`, en: `Get everyone into a position where they can look out for each other`, animal: "滇金丝猴" },
      { label: "B", text: `先顶住麻烦，别让它继续靠近`, en: `Block the threat, don't let it get closer`, animal: "豺" },
      { label: "C", text: `优先带进更安全的开阔/警戒区`, en: `Lead to safer open or watchable ground first`, animal: "黑颈鹤" },
      { label: "D", text: `沿着最稳妥的路线悄悄带走`, en: `Quietly take the safest route away`, animal: "雪豹" }
    ]
  },
  {
    id: 14,
    type: "situation",
    parity: "even",
    text: `到了新地方，你第一眼最关注：`,
    en: `Arriving somewhere new, your first focus is...`,
    emoji: ["🛏️", "🍎", "🌫️", "🗺️"],
    options: [
      { label: "A", text: `哪儿适合落脚休息`, en: `Where to rest and settle in`, animal: "小熊猫" },
      { label: "B", text: `哪儿最可能有吃的`, en: `Where food is most likely to be found`, animal: "亚洲黑熊" },
      { label: "C", text: `哪儿能躲、能撤、能不被看见`, en: `Where to hide, retreat, and stay invisible`, animal: "林麝" },
      { label: "D", text: `哪条路最稳、最能扛环境变化`, en: `Which path is most stable and resilient`, animal: "羚牛" }
    ]
  },
  {
    id: 15,
    type: "core",
    parity: "odd",
    text: `哪种"高光时刻"最像你：`,
    en: `Which 'shining moment' is most like you?`,
    emoji: ["🎉", "✅", "👁️‍🗨️", "🌫️"],
    options: [
      { label: "A", text: `一群伙伴都在，而我最会把气氛带起来`, en: `Everyone's together and I'm the one who fires things up`, animal: "滇金丝猴" },
      { label: "B", text: `一次配合下来，事情稳稳搞定`, en: `One smooth coordination and things just get done`, animal: "豺" },
      { label: "C", text: `我一出现，周围立刻安静下来开始注意我`, en: `When I appear, everything quiets and attention turns to me`, animal: "黑颈鹤" },
      { label: "D", text: `没人看清我，但结果已经决定了`, en: `No one saw me coming, but the outcome was already set`, animal: "雪豹" }
    ]
  },
  {
    id: 16,
    type: "core",
    parity: "even",
    text: `如果你真的住进横断山，你最可能活成：`,
    en: `If you actually lived in the Hengduan Mountains, you'd most likely be...`,
    emoji: ["🌿", "🍖", "🌬️", "⛰️"],
    options: [
      { label: "A", text: `慢热又会享受的树上住民`, en: `A slow-warming, comfort-loving tree dweller`, animal: "小熊猫" },
      { label: "B", text: `不好惹的林中干饭派`, en: `The forest's no-nonsense eating machine`, animal: "亚洲黑熊" },
      { label: "C", text: `轻盈、警觉、距离感刚刚好的观察者`, en: `Light-footed, watchful, perfectly distanced observer`, animal: "林麝" },
      { label: "D", text: `稳得住场面的高山生存派`, en: `The steady, unshakeable mountain survivor`, animal: "羚牛" }
    ]
  }
];
