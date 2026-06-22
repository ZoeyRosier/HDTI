export const questions = [
  {
    id: 1,
    type: "situation",
    parity: "odd",
    text: `天刚亮，离开昨晚的落脚点，你会先：`,
    en: `Just after dawn, leaving last night's resting spot, you first...`,
    emoji: ["📡", "🗺️", "🌄", "🌿"],
    options: [
      { label: "A", text: `发出信号，先和附近同伴对上"频道"`, en: `Signal to nearby companions first`, animal: "滇金丝猴" },
      { label: "B", text: `看好路线，判断怎样行动最有效率`, en: `Scout the route for maximum efficiency`, animal: "豺" },
      { label: "C", text: `先去开阔点，确保视野够大`, en: `Head to high ground for a wider view`, animal: "黑颈鹤" },
      { label: "D", text: `沿着不显眼的边线移动，先不暴露自己`, en: `Move along unnoticed edges, stay hidden first`, animal: "雪豹" }
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
      { label: "C", text: `保持距离观察一会儿，确认周围没有陷阱`, en: `Keep distance and observe — make sure there's no trap`, animal: "黑颈鹤" },
      { label: "D", text: `先伏低观察，等最合适的时候再无声靠近`, en: `Crouch and observe, then approach silently at the right moment`, animal: "雪豹" }
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
      { label: "B", text: `先把气势亮出来，让对方知道别乱来`, en: `Show your presence — let them know not to mess around`, animal: "亚洲黑熊" },
      { label: "C", text: `轻快撤开，不和风险正面对撞`, en: `Slip away quickly, avoid direct confrontation`, animal: "林麝" },
      { label: "D", text: `先稳住阵脚，不因为惊吓就乱了节奏`, en: `Hold your ground — don't let the startle break your rhythm`, animal: "羚牛" }
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
      { label: "A", text: `走高处，利用树冠之间的通道快速通过`, en: `Take the high route through the tree canopy`, animal: "滇金丝猴" },
      { label: "B", text: `找适合一起推进的路线`, en: `Find a route that works for the whole group`, animal: "豺" },
      { label: "C", text: `选开阔路段，方便提前发现任何风吹草动`, en: `Choose open ground to catch any movement early`, animal: "黑颈鹤" },
      { label: "D", text: `贴着地形边缘和掩体走，把自己藏进阴影里`, en: `Hug terrain edges and cover, blend into the shadows`, animal: "雪豹" }
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
    text: `附近同伴突然发出状况信号，你会：`,
    en: `A nearby companion suddenly signals trouble. You...`,
    emoji: ["📍", "⚡", "👀", "🤫"],
    options: [
      { label: "A", text: `立即回应定位，确保彼此都知道对方在哪`, en: `Respond immediately — make sure you both know where the other is`, animal: "滇金丝猴" },
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
      { label: "A", text: `高一点、软一点、舒服到不想动的地方`, en: `Somewhere high, soft, and comfortable enough to never want to move`, animal: "小熊猫" },
      { label: "B", text: `靠近资源，明天一睁眼就能继续干饭的地方`, en: `Close to food — wake up and get straight back to eating`, animal: "亚洲黑熊" },
      { label: "C", text: `最不容易被发现的隐蔽角落`, en: `The most hidden, hardest-to-find corner around`, animal: "林麝" },
      { label: "D", text: `地形稳、退路清楚、能扛住任何变化的地方`, en: `Stable terrain, clear exits, built to handle anything`, animal: "羚牛" }
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
      { label: "D", text: `整体节奏被打乱，害得后面一路都不稳`, en: `Losing your overall rhythm and being off-balance the whole way after`, animal: "羚牛" }
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
      { label: "C", text: `先带到视野更清楚、能提前发现危险的区域`, en: `Move to clearer ground where danger can be spotted early`, animal: "黑颈鹤" },
      { label: "D", text: `沿最稳妥、最不容易惊动别人的路线悄悄带走`, en: `Quietly take the most careful route — minimal disturbance`, animal: "雪豹" }
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
      { label: "A", text: `哪儿适合落脚休息，待着舒服`, en: `Where to rest comfortably and settle in`, animal: "小熊猫" },
      { label: "B", text: `哪儿最可能有吃的，先把基本生存顾住`, en: `Where food is most likely — cover the basics first`, animal: "亚洲黑熊" },
      { label: "C", text: `哪儿方便藏、方便撤、最好还不容易被发现`, en: `Where to hide, retreat, and ideally stay undetected`, animal: "林麝" },
      { label: "D", text: `哪条路径最稳，能扛天气，也能扛突发情况`, en: `Which path holds up — against weather and the unexpected`, animal: "羚牛" }
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
      { label: "A", text: `有点要冷掉的场子，被我重新接住了`, en: `A fading vibe — and I caught it before it dropped`, animal: "滇金丝猴" },
      { label: "B", text: `一轮配合下来，事情稳稳往前推进`, en: `One round of coordination and things steadily move forward`, animal: "豺" },
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
      { label: "A", text: `慢热、低耗、把日子过舒服的树上住民`, en: `Slow to warm up, low on energy use, living comfortably in the trees`, animal: "小熊猫" },
      { label: "B", text: `边界明确、谁碰底线谁难受的林中干饭派`, en: `Clear boundaries — cross the line and feel it, forest edition`, animal: "亚洲黑熊" },
      { label: "C", text: `轻、警觉、随时能退到安全距离的隐身观察者`, en: `Light, alert, always ready to pull back to a safe distance`, animal: "林麝" },
      { label: "D", text: `抗压、稳场、环境再硬也能顶住的高山生存派`, en: `Pressure-resistant, steady — holds up no matter how harsh the terrain`, animal: "羚牛" }
    ]
  }
];

export const optionVectors = {
  Q1:  { A: [2,2,3,3,2,1,2], B: [3,2,2,2,3,2,3], C: [3,2,2,2,2,2,3], D: [2,1,1,1,2,2,2] },
  Q2:  { A: [1,1,1,1,1,1,1], B: [1,2,1,1,2,3,2], C: [1,1,1,1,2,1,1], D: [2,2,2,1,2,2,1] },
  Q3:  { A: [2,2,3,3,2,1,2], B: [2,2,3,3,3,3,2], C: [2,2,1,1,1,2,3], D: [1,1,1,1,1,2,2] },
  Q4:  { A: [1,1,1,1,2,1,2], B: [2,3,1,2,2,3,2], C: [1,1,1,1,2,1,1], D: [2,2,2,1,1,2,1] },
  Q5:  { A: [2,2,2,2,2,1,3], B: [3,2,3,3,3,2,3], C: [3,2,1,2,2,2,3], D: [2,1,1,1,2,2,2] },
  Q6:  { A: [1,1,1,1,1,1,1], B: [2,2,1,1,3,3,3], C: [1,1,1,1,1,1,1], D: [2,2,2,1,2,2,1] },
  Q7:  { A: [2,2,3,3,2,1,2], B: [2,3,3,3,3,2,2], C: [2,2,2,2,2,2,3], D: [2,2,1,1,2,2,2] },
  Q8:  { A: [1,1,1,1,1,1,1], B: [2,2,1,1,3,3,2], C: [1,1,1,1,1,1,1], D: [2,2,2,1,2,2,1] },
  Q9:  { A: [2,2,3,3,2,1,2], B: [2,3,3,3,3,3,2], C: [3,2,1,2,2,2,3], D: [1,1,1,1,1,2,2] },
  Q10: { A: [1,1,1,1,2,1,2], B: [2,3,2,2,3,3,2], C: [1,1,1,1,1,1,2], D: [2,3,2,2,2,3,2] },
  Q11: { A: [2,2,3,3,2,1,2], B: [3,3,3,3,3,3,2], C: [3,2,2,2,2,2,3], D: [2,2,1,1,2,3,3] },
  Q12: { A: [1,1,1,1,1,1,1], B: [2,3,1,1,3,3,2], C: [1,1,1,1,1,1,2], D: [2,2,2,1,2,2,1] },
  Q13: { A: [2,2,3,3,2,1,2], B: [2,3,3,3,3,3,2], C: [3,2,2,2,2,2,3], D: [2,1,1,1,2,2,1] },
  Q14: { A: [1,1,1,1,1,1,1], B: [2,2,1,1,3,3,3], C: [1,1,1,1,1,1,2], D: [2,2,2,1,2,2,1] },
  Q15: { A: [2,2,3,3,2,1,2], B: [2,3,3,3,3,3,2], C: [3,2,2,2,2,2,3], D: [1,2,1,1,2,3,3] },
  Q16: { A: [1,1,1,1,1,1,2], B: [2,3,1,1,3,3,3], C: [1,1,1,1,1,1,2], D: [2,2,2,1,2,2,1] },
};
