export const animals = [
  {
    id: "snow_leopard",
    name: "雪豹",
    nameEn: "Snow Leopard",
    code: "SOLO",
    isEgg: false,
    eggType: null,
    conservationStatus: "VU",
    wildPopulation: "约500只",
    iucnUrl: "https://www.iucnredlist.org/species/22732/50664030",
    tags: [`独行高手`, `高山潜伏者`, `精准出手`],
    quote: `没人看清我，但结果已经决定了。`,
    personalityName: `独行客`,
    personalityDesc: `你是很典型的"存在感不靠热闹"的人。你不喜欢被过度打扰，也不喜欢随便表态。你更擅长看、等、判断，然后在真正值得的时候出手。你给人的感觉往往是安静、克制、有距离，但真正了解你的人会知道：你的冷不是空，是很强的掌控力。`,
    species: {
      habitat: `雪豹是当之无愧的"高海拔生态系统健康温度计"。作为横断山脉高山裸岩地带的顶级掠食者，它们身披灰白色带有黑斑的奢华皮毛，完美隐身于茫茫雪山与碎石之中。`,
      skill: `它们能够在接近70度的陡坡上，以极高的速度追击岩羊。这不仅得益于强壮的四肢，更归功于那条长达1米、毛茸茸的粗大尾巴，能在高速跳跃和急转弯时提供完美的平衡。`,
      funFact: `作为大型猫科动物，雪豹其实是个"哑巴战神"——因为颈部舌骨的特殊构造，它们无法像狮子老虎那样发出震耳欲聋的咆哮，只能发出类似猫咪呼噜声、嘶嘶声。而且它们在独处或紧张时，会偷偷把自己粗大的尾巴叼在嘴里……这是动物学家在红外相机里拍到的真实画面。\n\n想知道更多？搜索：IUCN Snow Leopard`,
      statusDesc: `"雪山之王"正面临气候变暖的逼迫。雪线上升导致它们的领地正在缩小，同时还要面对偷猎和人兽冲突的威胁。它们需要一片不被打扰的广阔群山。`
    },
    vector: [2, 3, 1, 1, 2, 3, 3]
  },
  {
    id: "yunnan_snub_monkey",
    name: "滇金丝猴",
    nameEn: "Yunnan Snub-nosed Monkey",
    code: "WIFI",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    wildPopulation: "约3000只",
    iucnUrl: "https://www.iucnredlist.org/species/39866/10278553",
    tags: [`社交发动机`, `高山树冠居民`, `气氛担当`],
    quote: `我不制造气氛，我就是气氛。`,
    personalityName: `社交达`,
    personalityDesc: `你是那种"一个人也能热闹，一群人更能热闹"的类型。你很在意连接感，不一定非要成为全场中心，但你总能让空气流动起来。你对环境变化很敏感，也很擅长从互动里获取安全感。你最强的能力不是硬碰硬，而是让关系网、信息流和现场气氛都站到你这边。`,
    species: {
      habitat: `滇金丝猴并不是"金"色的，而是身披黑白相间的毛发。它们是中国特有的世界级珍稀灵长类，生活在横断山脉海拔3000-5000米的暗针叶林中，是除了人类之外，世界上分布海拔最高的灵长类动物。`,
      skill: `在大雪封山的严冬，当其他动物找不到食物时，它们进化出了极其特殊的食性，以挂在树枝上的"松萝"（一种地衣）为主要越冬口粮。它们拥有庞大的"重层社会结构"，几十甚至上百只猴子组成大群，晚上紧紧抱在一起互相取暖。`,
      funFact: `它们是地球上唯一拥有"性感红唇"的非人灵长类动物！而且它们没有鼻梁，只有两个朝天的鼻孔（为了适应高寒缺氧），所以下雨天如果仰起头，是真的会打喷嚏的。\n\n想知道更多？搜索：IUCN Yunnan Snub-nosed Monkey`,
      statusDesc: `濒危（EN）。目前野生种群数量仅3000只左右。原始森林的砍伐导致它们栖息地破碎化，猴群之间无法交流基因。保护它们，就是保护横断山脉的原始高山森林生态。`
    },
    vector: [2, 2, 3, 3, 2, 1, 2]
  },
  {
    id: "dhole",
    name: "豺",
    nameEn: "Dhole",
    code: "COO",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    wildPopulation: "全球成年个体不足3000只",
    iucnUrl: "https://www.iucnredlist.org/species/5953/9190449",
    tags: [`团队执行者`, `配合型高手`, `行动比口号重要`],
    quote: `单打独斗是浪费，我们一起上。`,
    personalityName: `协作者`,
    personalityDesc: `你身上最强的不是"冲"，而是"会配合地冲"。你不是那种喜欢一个人硬扛全部的人，你更擅长在合适的位置发力，让每个人都在正确时机做正确的事。你的风格很像一支训练有素的小队：不浪费力气，不搞无效表演，真正厉害的是协作效率。`,
    species: {
      habitat: `豺（也叫亚洲野犬、红狼）曾广泛分布于亚洲，如今却成了比大熊猫还罕见的存在。作为森林生态系统中的顶级捕食者之一，它们在横断山脉的密林、林缘地带游荡。`,
      skill: `豺是自然界最顶级的"特种部队"。它们极度依赖群居，捕猎时分工明确：有的负责驱赶，有的负责埋伏，有的负责接力追击。凭借超强的耐力和精妙的战术，豺群甚至能捕杀体型比自己大数倍的成年水牛或野猪。`,
      funFact: `与狼的嚎叫不同，豺的沟通方式非常奇特。它们能发出类似鸟鸣的"口哨声"和"吱吱声"，这种高频声音在茂密的森林中穿透力极强，是群内成员在高速移动中保持联系的"战术对讲机"。\n\n想知道更多？搜索：IUCN Dhole`,
      statusDesc: `濒危（EN）。全球成年个体可能已不足3000只。由于栖息地破坏、猎物密度下降以及犬类传染病（如犬瘟热），豺的种群正面临静悄悄的消亡。`
    },
    vector: [3, 3, 3, 3, 3, 3, 1]
  },
  {
    id: "black_necked_crane",
    name: "黑颈鹤",
    nameEn: "Black-necked Crane",
    code: "CCTV",
    isEgg: false,
    eggType: null,
    conservationStatus: "NT",
    wildPopulation: "约15000只",
    iucnUrl: "https://www.iucnredlist.org/species/22692162/93341759",
    tags: [`优雅警戒者`, `距离感美人`, `开阔地观察家`],
    quote: `我不是高冷，我只是在观察你。`,
    personalityName: `观察家`,
    personalityDesc: `你有一种很特别的气质：安静，但不弱；克制，但不空。你不靠喧闹来证明自己，反而越是拉开距离，越显得有分量。你对"场"的要求很高，喜欢看清局势后再进入，讨厌混乱和过度逼近。别人会觉得你有点高冷，但那其实是你对秩序的坚持。`,
    species: {
      habitat: `它们是地球上15种鹤中，唯一一种一生都在高原地区繁殖、越冬的"高原神鸟"。横断山脉西北部的湿地和高山草甸，是它们赖以生存的家园。`,
      skill: `它们有着极强的领地意识和家族观念。在广袤的开阔湿地中，它们总是保持着极高的警惕性。一旦发现危险，会立刻发出高亢清亮的鸣叫，提醒整个鹤群起飞撤离。`,
      funFact: `黑颈鹤是鸟界的"探戈大师"。在求偶或宣示领地时，它们会展开双翅，伴随着鸣叫在草地上跳起极其优雅、极具仪式感的舞蹈，甚至还会叼起地上的树枝抛向空中作为点缀。\n\n想知道更多？搜索：IUCN Black-necked Crane`,
      statusDesc: `近危（NT）。虽然在国家的大力保护下种群数量有所回升，但高寒湿地的退化、气候变化带来的干旱，以及人类放牧对水源的挤占，依然是它们生存的严峻挑战。`
    },
    vector: [3, 2, 2, 2, 2, 2, 3]
  },
  {
    id: "red_panda",
    name: "小熊猫",
    nameEn: "Red Panda",
    code: "REST",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    wildPopulation: "不足10000只",
    iucnUrl: "https://www.iucnredlist.org/species/714/110023718",
    tags: [`慢热选手`, `节能大师`, `可爱但有边界感`],
    quote: `不是懒，是把能量留给值得的事。`,
    personalityName: `节能派`,
    personalityDesc: `你不是懒，你只是很懂"把能量花在值得的地方"。你讨厌无意义的内耗，喜欢找一个舒服、安全、能喘口气的位置慢慢恢复。你对世界不是没兴趣，而是更愿意用自己的节奏去接近它。别人以为你佛，其实你只是特别会保护自己。`,
    species: {
      habitat: `再次重申，它不是小浣熊！小熊猫是小熊猫科小熊猫属的唯一物种，妥妥的"独苗"。它们广泛分布于喜马拉雅-横断山脉的亚高山森林中，极度依赖拥有丰富竹下植被的原始林。`,
      skill: `它的"佛系"其实是生存逼出来的。小熊猫长着食肉动物的肠胃，却偏要吃素（主食竹叶）。因为吸收率极低，为了不被"饿死"，它们只能通过大量睡觉、减少运动来降低能量消耗，把"节能减排"刻进了DNA。`,
      funFact: `遇到危险或受到惊吓时，小熊猫会突然站立起来，并高举双爪。人类觉得这动作是"投降卖萌"，但这其实是它们在努力让自己看起来体型更大，是在向敌人发出凶狠的警告信！\n\n想知道更多？搜索：IUCN Red Panda`,
      statusDesc: `濒危（EN）。全球野生种群数量急剧下降。随着人类工程和农林的扩张，小熊猫的家园正在消失，"可爱"并不能成为抵御栖息地丧失的武器。`
    },
    vector: [2, 2, 1, 1, 1, 1, 2]
  },
  {
    id: "asian_black_bear",
    name: "亚洲黑熊",
    nameEn: "Asian Black Bear",
    code: "HOLD",
    isEgg: false,
    eggType: null,
    conservationStatus: "VU",
    wildPopulation: "数据不详",
    iucnUrl: "https://www.iucnredlist.org/species/22824/9391240",
    tags: [`资源守护者`, `直接派`, `吃饱了才有安全感`],
    quote: `碰我底线之前，先想清楚后果。`,
    personalityName: `守护者`,
    personalityDesc: `你是很典型的"实用主义者"。你不爱空谈，你更关心眼前的资源、边界和现实收益。你有自己的温和区，也有非常清楚的底线区。你不一定时时刻刻都在输出存在感，但谁碰到你的底线，谁就会知道你不是软柿子。`,
    species: {
      habitat: `亚洲黑熊广泛栖息于亚洲的山地森林中。它们是典型的杂食动物，随着季节变化在横断山脉不同海拔间垂直迁徙——春天在谷底吃嫩芽，秋天跑到高处找坚果。`,
      skill: `它们是"森林里的顶级爬树匠"。为了吃到树冠上的橡子或松子，笨重的黑熊能灵活地爬上高树，并把折断的树枝垫在屁股底下，在树杈间给自己搭出一个舒适的"干饭王座"（被称为熊巢）。`,
      funFact: `亚洲黑熊胸前都有一块极为醒目的"V"字型或新月型白斑，因此得名"月熊（Moon Bear）"。虽然体型庞大，但它们的视力极差（俗称黑瞎子），找吃的全靠比狗还要灵敏的嗅觉和听觉。\n\n想知道更多？搜索：IUCN Asian Black Bear`,
      statusDesc: `易危（VU）。尽管适应力极强，但人类对森林的开发切断了它们的觅食路线。更残忍的是，非法的"活熊取胆"和野生熊掌贸易，至今仍是悬在它们头顶的利刃。`
    },
    vector: [2, 1, 1, 1, 3, 3, 3]
  },
  {
    id: "forest_musk_deer",
    name: "林麝",
    nameEn: "Forest Musk Deer",
    code: "GHOST",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    wildPopulation: "数据不详",
    iucnUrl: "https://www.iucnredlist.org/species/42391/61978544",
    tags: [`安静观察者`, `高敏感型`, `撤退速度很快`],
    quote: `你找不到我，但我一直在。`,
    personalityName: `隐者`,
    personalityDesc: `你不是冷漠，你只是对环境变化特别敏感。你习惯先判断、再靠近，不喜欢把自己暴露在不必要的风险里。你很少正面张扬，但你的反应速度、感知能力和自我保护意识都很强。你最厉害的不是存在感，而是"你想走的时候，谁也拦不住"。`,
    species: {
      habitat: `林麝是一种体型娇小、没有犄角的鹿类。它们生性孤僻、极其胆小，主要隐居在横断山脉针阔混交林或陡峭的灌丛中，通常只在晨昏时分才悄悄出来活动。`,
      skill: `它们是森林里的"跑酷大师"。林麝的蹄子非常特殊，不仅能在近乎垂直的悬崖峭壁上如履平地，遇到猛兽追击时，还能一跃跳上倾斜的树干躲避危机。`,
      funFact: `你敢信吗？雄性林麝虽然没有角，但嘴里却长着两根长达几厘米的"吸血鬼獠牙"（发达的上犬齿），这是它们争夺配偶时的决斗武器。\n\n想知道更多？搜索：IUCN Forest Musk Deer`,
      statusDesc: `濒危（EN）。成年雄性林麝腹部有一个香腺，能分泌极其名贵的"麝香"。正因为这价比黄金的香料，林麝遭受了极其惨烈的疯狂盗猎。你以为的岁月静好，其实是它们躲避猎枪的胆战心惊。`
    },
    vector: [1, 1, 1, 1, 1, 2, 2]
  },
  {
    id: "takin",
    name: "羚牛",
    nameEn: "Takin",
    code: "TANK",
    isEgg: false,
    eggType: null,
    conservationStatus: "VU",
    wildPopulation: "数据不详",
    iucnUrl: "https://www.iucnredlist.org/species/22137/9360918",
    tags: [`稳住型选手`, `抗压高手`, `山地重装坦克`],
    quote: `别看我平时慢吞吞，IYKYK。`,
    personalityName: `坦克`,
    personalityDesc: `你最大的优点是稳。不是慢，而是稳。你不会被一点风吹草动带乱节奏，也不喜欢靠表演制造声量。你像那种真正能扛事的人：关键时刻站得住，环境再差也能往前推进。别人靠聪明赢一次，你靠稳定赢很多次。`,
    species: {
      habitat: `名字里虽然带"牛"，但羚牛其实在分类上更接近羊（牛科羊亚科），是名副其实的大型高山羊类。横断山脉的四川、云南西北部是它们（特别是四川亚种和不丹亚种）的重要栖息地。`,
      skill: `它们是真正的高山"重装步兵"。能在海拔2500-4500米的陡峭岩壁上稳稳行走。横断山脉常年雨雾弥漫，羚牛的皮肤能分泌出一种特殊的油脂，像穿了一件天然的"冲锋衣"，防风又防雨。`,
      funFact: `羚牛常被称为"六不像"——它庞大隆起的背脊像棕熊，两条倾斜的后腿像非洲斑鬣狗，四肢粗短像牛，脸像驼鹿，宽大扁平的尾巴像山羊，而两只角又像角马。\n\n想知道更多？搜索：IUCN Takin`,
      statusDesc: `易危（VU）。作为国家一级保护动物，它们体型虽大，但在面对栖息地被公路、水电站割裂时，依然显得无比脆弱。种群隔离是它们目前最大的困境。`
    },
    vector: [2, 3, 3, 1, 2, 3, 1]
  },

  // Easter egg animals
  {
    id: "giant_panda",
    name: "大熊猫",
    nameEn: "Giant Panda",
    code: "VIP#0",
    isEgg: true,
    eggType: "hidden",
    conservationStatus: "VU",
    wildPopulation: "约1800只",
    iucnUrl: "https://www.iucnredlist.org/species/712/121745669",
    tags: [`躺赢顶流`, `天选之兽`, `系统默认VIP`],
    quote: `系统默认给我开了最高权限。`,
    personalityName: "VIP#0",
    personalityDesc: `【待填写】`,
    species: {
      habitat: `【待填写】`,
      skill: `【待填写】`,
      funFact: `【待填写】\n\n想知道更多？搜索：IUCN Giant Panda`,
      statusDesc: `【待填写】`
    },
    vector: null
  },
  {
    id: "clouded_leopard",
    name: "云豹",
    nameEn: "Clouded Leopard",
    code: "NULL",
    isEgg: true,
    eggType: "combo",
    conservationStatus: "VU",
    wildPopulation: "不足10000只（中国大陆已极罕见）",
    iucnUrl: "https://www.iucnredlist.org/species/23049/50049167",
    tags: [`神秘到不存在`, `你永远找不到我`, `倒反天罡`],
    quote: `你可能永远找不到我。`,
    personalityName: "NULL",
    personalityDesc: `【待填写】`,
    species: {
      habitat: `【待填写】`,
      skill: `【待填写】`,
      funFact: `【待填写】\n\n想知道更多？搜索：IUCN Clouded Leopard`,
      statusDesc: `【待填写】`
    },
    vector: [2, 1, 1, 1, 2, 2, 3]
  },
  {
    id: "chinese_monal",
    name: "绿尾虹雉",
    nameEn: "Chinese Monal",
    code: "RARE",
    isEgg: true,
    eggType: "combo",
    conservationStatus: "VU",
    wildPopulation: "数据不详",
    iucnUrl: "https://www.iucnredlist.org/species/22679187/92806486",
    tags: [`极度稀有`, `高冷美学顶点`, `出现即惊喜`],
    quote: `你见过我，算你运气好。`,
    personalityName: "RARE",
    personalityDesc: `【待填写】`,
    species: {
      habitat: `【待填写】`,
      skill: `【待填写】`,
      funFact: `【待填写】\n\n想知道更多？搜索：IUCN Chinese Monal`,
      statusDesc: `【待填写】`
    },
    vector: [2, 1, 2, 2, 2, 2, 2]
  },
  {
    id: "snow_leopard_extreme",
    name: "雪豹极致形态",
    nameEn: "Snow Leopard (Extreme)",
    code: "SLAY?",
    isEgg: true,
    eggType: "extreme",
    conservationStatus: "VU",
    wildPopulation: "约500只",
    iucnUrl: "https://www.iucnredlist.org/species/22732/50664030",
    tags: [`高冷外壳`, `沙雕内核`, `咬尾巴的那只`],
    quote: `外人看我：雪山之王。我自己：[被风吓到原地起跳]。`,
    personalityName: "SLAY?",
    personalityDesc: `【待填写】`,
    species: null,
    reuseScienceFrom: "snow_leopard",
    vector: [2, 3, 1, 1, 2, 3, 3]
  },
  {
    id: "monkey_extreme",
    name: "滇金丝猴极致形态",
    nameEn: "Yunnan Snub-nosed Monkey (Extreme)",
    code: "5G",
    isEgg: true,
    eggType: "extreme",
    conservationStatus: "EN",
    wildPopulation: "约3000只",
    iucnUrl: "https://www.iucnredlist.org/species/39866/10278553",
    tags: [`全雄群蛰伏者`, `候场中`, `5G信号`],
    quote: `我不是WIFI，我是5G，只是还没覆盖到你。`,
    personalityName: "5G",
    personalityDesc: `【待填写】`,
    species: null,
    reuseScienceFrom: "yunnan_snub_monkey",
    vector: [2, 2, 3, 3, 2, 1, 2]
  }
];

export const animalsMap = Object.fromEntries(
  animals.map(a => [a.id, a])
);

export const baseAnimals = animals.filter(a => !a.isEgg);

export const animalNameToId = {
  "雪豹": "snow_leopard",
  "滇金丝猴": "yunnan_snub_monkey",
  "豺": "dhole",
  "黑颈鹤": "black_necked_crane",
  "小熊猫": "red_panda",
  "亚洲黑熊": "asian_black_bear",
  "林麝": "forest_musk_deer",
  "羚牛": "takin",
  "大熊猫": "giant_panda",
  "云豹": "clouded_leopard",
  "绿尾虹雉": "chinese_monal",
  "雪豹极致形态": "snow_leopard_extreme",
  "滇金丝猴极致形态": "monkey_extreme",
};
