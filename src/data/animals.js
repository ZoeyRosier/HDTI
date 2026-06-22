/**
 * 动物数据 — 语言无关的 metadata + locale: { zh, en } 文案块。
 * 展示时用 ../i18n/resolve.js 的 pickAnimal(animal, lang)。
 */
export const animals = [
  {
    id: "snow_leopard",
    code: "SOLO",
    isEgg: false,
    eggType: null,
    conservationStatus: "VU",
    iucnUrl: "https://www.iucnredlist.org/species/22732/50664030",
    vector: [2, 3, 1, 1, 2, 3, 3],
    locale: {
      zh: { name: `雪豹`, namePinyin: `xuě bào`, wildPopulation: `约500只`, tags: [`独行高手`, `高山潜伏者`, `精准出手`], quote: `没人看清我，但结果已经决定了。`, personalityName: `独行客`, personalityDesc: `你在场，但很多时候别人不确定你在不在场——这不是你的失误，这是你的战术。

你不是内向，你只是对"值不值得开口"这件事标准极高。跟你相处久了的人会发现，你沉默的时候不是没想法，而是已经把局势审完了，只是懒得同步给别人。你从不急着证明自己，因为你深知：真正有分量的事，等着就行，时机到了自然看见。

你最大的特点，是从不用力——但结果总是莫名扎实。别人花了很大力气在场子里刷存在感，你只是站在那里，事情就往你这边滑。不是你运气好，是你早就把退路、风险、时机在心里过了一遍，只是没告诉任何人。

唯一的问题是：偶尔太安静，会让人误以为你好欺负。然后他们就知道了。`, species: { habitat: `雪豹是当之无愧的"高海拔生态系统健康温度计"。作为横断山脉高山裸岩地带的顶级掠食者，它们身披灰白色带有黑斑的奢华皮毛，完美隐身于茫茫雪山与碎石之中。`, skill: `它们能够在接近70度的陡坡上，以极高的速度追击岩羊。这不仅得益于强壮的四肢，更归功于那条长达1米、毛茸茸的粗大尾巴，能在高速跳跃和急转弯时提供完美的平衡。`, funFact: `作为大型猫科动物，雪豹其实是个"哑巴战神"——因为颈部舌骨的特殊构造，它们无法像狮子老虎那样发出震耳欲聋的咆哮，只能发出类似猫咪呼噜声、嘶嘶声。而且它们在独处或紧张时，会偷偷把自己粗大的尾巴叼在嘴里……这是动物学家在红外相机里拍到的真实画面。

想知道更多？搜索：IUCN Snow Leopard`, statusDesc: `"雪山之王"正面临气候变暖的逼迫。雪线上升导致它们的领地正在缩小，同时还要面对偷猎和人兽冲突的威胁。它们需要一片不被打扰的广阔群山。` } },
      en: { name: `Snow Leopard`, wildPopulation: `~500 individuals`, tags: [`Solo expert`, `Alpine lurker`, `Precision striker`], quote: `Nobody saw me coming — but the outcome was already decided.`, personalityName: `The Solitary`, personalityDesc: `You're present, yet people often aren't sure whether you are — that's not a mistake, it's your strategy.

You're not introverted; you simply hold an extremely high bar for "is this worth saying out loud?" Those who know you well learn that your silence doesn't mean you're empty — you've already read the room, you just can't be bothered to sync with everyone. You never rush to prove yourself because you know: things that truly matter will reveal themselves in time.

Your signature move is never forcing anything — yet results somehow land solidly. While others exhaust themselves performing presence, you simply stand there and things drift your way. Not luck — you've already mapped exits, risks, and timing in your head without telling anyone.

The one catch: being too quiet sometimes makes people think you're easy to push around. Then they find out.`, species: { habitat: `The snow leopard is a true "thermometer of high-altitude ecosystem health." As the apex predator of the Hengduan Mountains' alpine scree slopes, its grey-white coat patterned with black rosettes blends perfectly into snow and rock.`, skill: `They can chase blue sheep down slopes nearing 70° at high speed — powered by muscular limbs and a metre-long bushy tail that provides perfect balance during leaps and sharp turns.`, funFact: `Despite being a big cat, the snow leopard is a "silent warrior" — a special hyoid bone prevents the thunderous roars of lions and tigers; they only purr and hiss. When alone or nervous, they sometimes gently hold their own thick tail in their mouth — a real scene captured on trail cameras.

Learn more: search IUCN Snow Leopard`, statusDesc: `"King of the snow mountains" faces pressure from climate warming. Rising snowlines shrink their range while poaching and human-wildlife conflict threaten their need for vast, undisturbed mountain wilderness.` } },
    },
  },

  {
    id: "yunnan_snub_monkey",
    code: "WIFI",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    iucnUrl: "https://www.iucnredlist.org/species/39866/10278553",
    vector: [2, 2, 3, 3, 2, 1, 2],
    locale: {
      zh: { name: `滇金丝猴`, namePinyin: `diān jīn sī hóu`, wildPopulation: `约3000只`, tags: [`社交发动机`, `高山树冠居民`, `气氛担当`], quote: `我不制造气氛，我就是气氛。`, personalityName: `社交达`, personalityDesc: `你离开之后，那个聚会的空气质量会肉眼可见地下降。这不是夸张，这是事实。

你不一定是全场嗓门最大的那个，但你大概率是让场子"不至于死"的那个。话题快断了你会顺手接，有人快被晾在角落里你会第一个注意到，气氛要崩的时候你像个弹簧——你甚至不需要刻意，就这么把所有人连在一起了。

很多人以为你只是"会来事"，其实你做的是更难的事：你是让信号流动起来的那根线。没有你，大家其实都能发言，但不知道为什么，就是接不上。有了你，这个群体就突然像被插上了电——在线了，有人了，活了。

代价是：你比任何人都更容易感知到"这个场子我不舒服"，但因为太会接场子，你常常最后才走。`, species: { habitat: `滇金丝猴并不是"金"色的，而是身披黑白相间的毛发。它们是中国特有的世界级珍稀灵长类，生活在横断山脉海拔3000-5000米的暗针叶林中，是除了人类之外，世界上分布海拔最高的灵长类动物。`, skill: `在大雪封山的严冬，当其他动物找不到食物时，它们进化出了极其特殊的食性，以挂在树枝上的"松萝"（一种地衣）为主要越冬口粮。它们拥有庞大的"重层社会结构"，几十甚至上百只猴子组成大群，晚上紧紧抱在一起互相取暖。`, funFact: `它们是地球上唯一拥有"性感红唇"的非人灵长类动物！而且它们没有鼻梁，只有两个朝天的鼻孔（为了适应高寒缺氧），所以下雨天如果仰起头，是真的会打喷嚏的。

想知道更多？搜索：IUCN Yunnan Snub-nosed Monkey`, statusDesc: `濒危（EN）。目前野生种群数量仅3000只左右。原始森林的砍伐导致它们栖息地破碎化，猴群之间无法交流基因。保护它们，就是保护横断山脉的原始高山森林生态。` } },
      en: { name: `Yunnan Snub-nosed Monkey`, wildPopulation: `~3,000 individuals`, tags: [`Social engine`, `Canopy dweller`, `Vibe keeper`], quote: `I don't create the atmosphere — I am the atmosphere.`, personalityName: `The Connector`, personalityDesc: `When you leave, the air quality of that gathering visibly drops. That's not exaggeration — it's fact.

You may not be the loudest in the room, but you're probably the one keeping it from dying. You catch fading threads, notice who's being sidelined, and bounce back when the mood is about to collapse — often without even trying, you wire everyone together.

People think you're just "good with people," but what you actually do is harder: you're the line that keeps signals flowing. Without you, everyone can talk, yet somehow nothing connects. With you, the group suddenly powers on — online, alive, present.

The cost: you feel "this room isn't right for me" before anyone else, yet because you're so good at holding things together, you're often the last to leave.`, species: { habitat: `Yunnan snub-nosed monkeys aren't golden — they wear striking black-and-white fur. Endemic to China, they live in dark conifer forests at 3,000–5,000 m in the Hengduan Mountains — the highest-living primates on Earth besides humans.`, skill: `In harsh winters when food is scarce, they've evolved to feed mainly on "songluo" lichen hanging from branches. They form large multi-tiered social groups — dozens or hundreds huddling together at night for warmth.`, funFact: `They're the only non-human primate with "sexy red lips"! With no nose bridge and upward-facing nostrils adapted to hypoxia, they genuinely sneeze when rain falls and they tilt their heads up.

Learn more: search IUCN Yunnan Snub-nosed Monkey`, statusDesc: `Endangered (EN). Wild population is only ~3,000. Old-growth forest loss fragments habitat and blocks gene flow between troops. Protecting them means protecting the Hengduan's pristine alpine forests.` } },
    },
  },

  {
    id: "dhole",
    code: "COO",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    iucnUrl: "https://www.iucnredlist.org/species/5953/9190449",
    vector: [3, 3, 3, 3, 3, 3, 1],
    locale: {
      zh: { name: `豺`, namePinyin: `chái`, wildPopulation: `全球成年个体不足3000只`, tags: [`团队执行者`, `配合型高手`, `行动比口号重要`], quote: `单打独斗是浪费，我们一起上。`, personalityName: `协作者`, personalityDesc: `你是那种一听到"大家各做各的吧"就会在心里轻轻皱眉的人，因为你太知道了：真正能把事做成的，从来不是各自燃烧，而是彼此咬合。

你不迷恋一个人扛全场的英雄主义，甚至会觉得那种明明能一起推进、却非要单独表演的场面，多少有点浪费集体效率。你天生很会看位置、看节奏、看分工，也知道什么时候该顶上去，什么时候该接力，什么时候该把锋芒让给更适合的人。

别人看你，可能觉得你不够"主角脸"；可真正跟你共事过的人，多半只会留下一个印象：事情为什么总能在你出现以后，开始真的往前动了。

你对"无效配合"的容忍度极低。各说各话、开会开成表演、分工全靠喊——这几件事会让你在心里安静地把人拉黑。`, species: { habitat: `豺（也叫亚洲野犬、红狼）曾广泛分布于亚洲，如今却成了比大熊猫还罕见的存在。作为森林生态系统中的顶级捕食者之一，它们在横断山脉的密林、林缘地带游荡。`, skill: `豺是自然界最顶级的"特种部队"。它们极度依赖群居，捕猎时分工明确：有的负责驱赶，有的负责埋伏，有的负责接力追击。凭借超强的耐力和精妙的战术，豺群甚至能捕杀体型比自己大数倍的成年水牛或野猪。`, funFact: `与狼的嚎叫不同，豺的沟通方式非常奇特。它们能发出类似鸟鸣的"口哨声"和"吱吱声"，这种高频声音在茂密的森林中穿透力极强，是群内成员在高速移动中保持联系的"战术对讲机"。

想知道更多？搜索：IUCN Dhole`, statusDesc: `濒危（EN）。全球成年个体可能已不足3000只。由于栖息地破坏、猎物密度下降以及犬类传染病（如犬瘟热），豺的种群正面临静悄悄的消亡。` } },
      en: { name: "Dhole", wildPopulation: `Fewer than 3,000 mature individuals globally`, tags: [`Team executor`, `Coordination pro`, `Action over talk`], quote: `Going solo is wasteful — we move together.`, personalityName: `The Collaborator`, personalityDesc: `You inwardly flinch when you hear "let's all just do our own thing," because you know: real progress isn't individual burnout — it's interlocking effort.

You don't romanticise the lone hero. When people could push together but choose solo performance, it feels like wasted collective efficiency. You read positions, rhythm, and roles naturally — knowing when to step up, pass the baton, or yield the spotlight.

Others may not see you as the "main character"; those who've worked with you remember one thing: things actually start moving once you show up.

You have zero tolerance for fake collaboration — talking past each other, performative meetings, shouting assignments without structure quietly gets people blocked in your mind.`, species: { habitat: `Once widespread across Asia, the dhole (Asian wild dog) is now rarer than the giant panda. As a top forest predator, they roam dense woods and forest edges of the Hengduan Mountains.`, skill: `Dholes are nature's elite task force — highly social hunters with clear roles: drivers, ambushers, relay chasers. With endurance and tactics, packs can take down adult buffalo or wild boar many times their size.`, funFact: `Unlike wolves' howls, dholes communicate with bird-like whistles and squeaks — high-frequency calls that pierce dense forest like tactical radios on the move.

Learn more: search IUCN Dhole`, statusDesc: `Endangered (EN). Possibly fewer than 3,000 mature individuals remain. Habitat loss, prey decline, and canine diseases like distemper threaten a quiet extinction.` } },
    },
  },

  {
    id: "black_necked_crane",
    code: "CCTV",
    isEgg: false,
    eggType: null,
    conservationStatus: "NT",
    iucnUrl: "https://www.iucnredlist.org/species/22692162/93341759",
    vector: [3, 2, 2, 2, 2, 2, 3],
    locale: {
      zh: { name: `黑颈鹤`, namePinyin: `hēi jǐng hè`, wildPopulation: `约15000只`, tags: [`优雅警戒者`, `距离感美人`, `开阔地观察家`], quote: `我不是高冷，我只是在观察你。`, personalityName: `观察家`, personalityDesc: `你已经在心里把这个人分析完了。他们还以为你在发呆。

你对"场"有极强的感知力，进到一个新环境，你的第一反应不是融入，而是扫描：谁在主导、谁在陪衬、哪里有暗流、哪个方向随时可能出现变量。你不是不想靠近，你只是习惯先把地形摸清楚，再决定要不要进去。

结果就是：大多数人觉得你有点高冷，难接近，不好读。可真正了解你的人会知道，你只是选择了更费力但更扎实的方式——先看清楚，再靠近。你建立的关系，也因此比大多数人的都耐用。

有一点你自己大概也清楚：一旦你觉得某个场子"有什么不对"，你会在脸上挂零点几秒的表情，让整个房间都安静一下。你以为没人注意，其实所有人都注意到了。`, species: { habitat: `它们是地球上15种鹤中，唯一一种一生都在高原地区繁殖、越冬的"高原神鸟"。横断山脉西北部的湿地和高山草甸，是它们赖以生存的家园。`, skill: `它们有着极强的领地意识和家族观念。在广袤的开阔湿地中，它们总是保持着极高的警惕性。一旦发现危险，会立刻发出高亢清亮的鸣叫，提醒整个鹤群起飞撤离。`, funFact: `黑颈鹤是鸟界的"探戈大师"。在求偶或宣示领地时，它们会展开双翅，伴随着鸣叫在草地上跳起极其优雅、极具仪式感的舞蹈，甚至还会叼起地上的树枝抛向空中作为点缀。

想知道更多？搜索：IUCN Black-necked Crane`, statusDesc: `近危（NT）。虽然在国家的大力保护下种群数量有所回升，但高寒湿地的退化、气候变化带来的干旱，以及人类放牧对水源的挤占，依然是它们生存的严峻挑战。` } },
      en: { name: `Black-necked Crane`, wildPopulation: `~15,000 individuals`, tags: [`Graceful sentinel`, `Beautiful distance`, `Open-ground observer`], quote: `I'm not cold — I'm just watching you.`, personalityName: `The Observer`, personalityDesc: `You've already finished analysing this person. They think you were spacing out.

You sense the "field" intensely. Entering a new space, your first move isn't blending in — it's scanning: who's leading, who's supporting, where the undercurrents are, what could shift. You're not avoiding closeness; you map the terrain before deciding whether to step in.

Most people find you cool, hard to read, distant. Those who know you understand you chose the harder, sturdier path — see clearly first, then approach. Relationships you build outlast most.

You probably know this too: when something feels off, a half-second expression from you can quiet an entire room. You think nobody noticed. Everyone did.`, species: { habitat: `The only crane species that breeds and winters entirely on the plateau — "gods of the highlands." Northwestern Hengduan wetlands and alpine meadows are their home.`, skill: `Strong territorial and family bonds. On open wetlands they stay highly alert — one warning call sends the whole flock airborne.`, funFact: `Black-necked cranes are the tango masters of birds — during courtship or territory displays they spread wings, call, and dance with ritual grace, sometimes tossing twigs in the air.

Learn more: search IUCN Black-necked Crane`, statusDesc: `Near Threatened (NT). Numbers have recovered under protection, but wetland degradation, drought from climate change, and grazing pressure on water sources remain serious challenges.` } },
    },
  },

  {
    id: "red_panda",
    code: "REST",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    iucnUrl: "https://www.iucnredlist.org/species/714/110023718",
    vector: [2, 2, 1, 1, 1, 1, 2],
    locale: {
      zh: { name: `小熊猫`, namePinyin: `xiǎo xióng māo`, wildPopulation: `不足10000只`, tags: [`慢热选手`, `节能大师`, `可爱但有边界感`], quote: `不是懒，是把能量留给值得的事。`, personalityName: `节能派`, personalityDesc: `你有一套非常精密的内部能耗管理系统，只是外人看起来像"又在摸鱼"。

你不是没热情，你只是对"值不值得燃"这件事非常挑剔。无意义的社交、为了合群的表演、明显要拖很久才能看到结果的项目——这些东西在你的系统里会被自动归类为"高耗低效"，然后你就会开始犯困。这不是懒，这是你进化出来的自我保护。

你最厉害的地方在于：当别人都耗光了、开始摆烂的时候，你因为一直没乱花，还有电。这就是为什么很多时候，收尾的工作最终都落到你手里——不是你最积极，而是你还剩余量。

真正进入你舒适区的人会发现，你其实温热得很，只是预热时间比较长。但也有一件事是真的：你的边界感很清楚，某些地方一旦越线，你的"可爱"会在0.5秒内切换成"别碰"。`, species: { habitat: `再次重申，它不是小浣熊！小熊猫是小熊猫科小熊猫属的唯一物种，妥妥的"独苗"。它们广泛分布于喜马拉雅-横断山脉的亚高山森林中，极度依赖拥有丰富竹下植被的原始林。`, skill: `它的"佛系"其实是生存逼出来的。小熊猫长着食肉动物的肠胃，却偏要吃素（主食竹叶）。因为吸收率极低，为了不被"饿死"，它们只能通过大量睡觉、减少运动来降低能量消耗，把"节能减排"刻进了DNA。`, funFact: `遇到危险或受到惊吓时，小熊猫会突然站立起来，并高举双爪。人类觉得这动作是"投降卖萌"，但这其实是它们在努力让自己看起来体型更大，是在向敌人发出凶狠的警告信！

想知道更多？搜索：IUCN Red Panda`, statusDesc: `濒危（EN）。全球野生种群数量急剧下降。随着人类工程和农林的扩张，小熊猫的家园正在消失，"可爱"并不能成为抵御栖息地丧失的武器。` } },
      en: { name: `Red Panda`, wildPopulation: `Fewer than 10,000 individuals`, tags: [`Slow warm-up`, `Energy saver`, `Cute with boundaries`], quote: `Not lazy — saving energy for what matters.`, personalityName: `The Conserver`, personalityDesc: `You run a precise internal energy budget — outsiders just call it slacking.

You're not passionless; you're selective about what's worth burning for. Meaningless socialising, performative belonging, projects with no payoff for ages — your system tags these "high cost, low return" and you start fading. Not laziness — evolved self-protection.

Your superpower: when everyone else is drained and checked out, you still have charge left because you never wasted it. That's why closings often land on you — not because you're eager, but because you're the one with reserves.

People in your comfort zone find you warm — just with a long preheat. And yes: boundaries are clear. Cross a line and "cute" switches to "don't touch" in half a second.`, species: { habitat: `Not a raccoon! Red pandas are the sole species of their family, living in subalpine forests across the Himalaya–Hengduan range, depending on bamboo understory in old-growth woods.`, skill: `Their "chill" is survival strategy. Carnivore guts, bamboo diet, terrible absorption — so they sleep heavily and move little, with energy-saving wired into their DNA.`, funFact: `When scared, red pandas stand upright and raise both paws. Humans read it as surrender-cute; they're actually trying to look bigger — a fierce warning!

Learn more: search IUCN Red Panda`, statusDesc: `Endangered (EN). Wild numbers are falling fast. Development and farmland erase their homes — cuteness can't stop habitat loss.` } },
    },
  },

  {
    id: "asian_black_bear",
    code: "MINE",
    isEgg: false,
    eggType: null,
    conservationStatus: "VU",
    iucnUrl: "https://www.iucnredlist.org/species/22824/9391240",
    vector: [2, 1, 1, 1, 3, 3, 3],
    locale: {
      zh: { name: `亚洲黑熊`, namePinyin: `yà zhōu hēi xióng`, wildPopulation: `【待填写】`, tags: [`资源守护者`, `直接派`, `吃饱了才有安全感`], quote: `碰我底线之前，先想清楚后果。`, personalityName: `守护者`, personalityDesc: `你有温和区，也有雷区。很多人在进入雷区之前，还以为自己在温和区。

你不是那种喜欢天天划线、处处设防的人。日子过得去，大家都好说；可一旦有人真的把手伸向你守的东西——无论是你的时间、你的资源，还是某条你从没明说但清晰存在的边界——你会切换得非常干脆，干脆到让对方一瞬间不确定刚才那个好说话的你是不是幻觉。

你的安全感很具体：吃饱了、睡够了、手边有足够的余量，你就会是个很好相处的人。一旦这些东西开始被挤压，你会先用眼神提示，再用行动提示，再往后就不是提示了。

你不记仇，但你有记忆。踩过你一次的人，你不会追着算账，但你心里那张地图上，他们的位置会永远标着一个小旗。`, species: { habitat: `亚洲黑熊广泛栖息于亚洲的山地森林中。它们是典型的杂食动物，随着季节变化在横断山脉不同海拔间垂直迁徙——春天在谷底吃嫩芽，秋天跑到高处找坚果。`, skill: `它们是"森林里的顶级爬树匠"。为了吃到树冠上的橡子或松子，笨重的黑熊能灵活地爬上高树，并把折断的树枝垫在屁股底下，在树杈间给自己搭出一个舒适的"干饭王座"（被称为熊巢）。`, funFact: `亚洲黑熊胸前都有一块极为醒目的"V"字型或新月型白斑，因此得名"月熊（Moon Bear）"。虽然体型庞大，但它们的视力极差（俗称黑瞎子），找吃的全靠比狗还要灵敏的嗅觉和听觉。

想知道更多？搜索：IUCN Asian Black Bear`, statusDesc: `易危（VU）。尽管适应力极强，但人类对森林的开发切断了它们的觅食路线。更残忍的是，非法的"活熊取胆"和野生熊掌贸易，至今仍是悬在它们头顶的利刃。` } },
      en: { name: `Asian Black Bear`, wildPopulation: "TBD", tags: [`Resource guardian`, `Direct type`, `Fed means secure`], quote: `Think twice before crossing my line.`, personalityName: `The Guardian`, personalityDesc: `You have a gentle zone and a minefield. Many thought they were still in the gentle zone when they weren't.

You're not someone who draws lines everywhere. When life is fine, so is everyone. But when hands reach for what you guard — time, resources, unspoken boundaries — you switch fast, so fast they wonder if the easygoing you was real.

Your security is concrete: fed, rested, with margin — you're easy company. When those shrink, you signal with eyes first, then actions; after that it's not a signal.

You don't hold grudges, but you remember. People who crossed you once stay flagged on your inner map.`, species: { habitat: `Asian black bears roam mountain forests across Asia. Omnivorous, they migrate vertically with seasons in the Hengduan — spring shoots in valleys, autumn nuts higher up.`, skill: `Top tree climbers of the forest. To reach acorns or pine cones they'll climb high and pad broken branches into a comfortable "feeding throne" (bear nest) in the fork.`, funFact: `Every Asian black bear has a striking white V or crescent on the chest — hence "moon bear." Despite size, vision is poor; they find food mainly by smell and hearing sharper than a dog's.

Learn more: search IUCN Asian Black Bear`, statusDesc: `Vulnerable (VU). Forest development cuts feeding routes. Illegal bile farming and paw trade remain blades over their heads.` } },
    },
  },

  {
    id: "forest_musk_deer",
    code: "GHOST",
    isEgg: false,
    eggType: null,
    conservationStatus: "EN",
    iucnUrl: "https://www.iucnredlist.org/species/42391/61978544",
    vector: [1, 1, 1, 1, 1, 2, 2],
    locale: {
      zh: { name: `林麝`, namePinyin: `lín shè`, wildPopulation: `【待填写】`, tags: [`安静观察者`, `高敏感型`, `撤退速度很快`], quote: `你找不到我，但我一直在。`, personalityName: `隐者`, personalityDesc: `别人还在判断"这个局安不安全"，你已经规划好三条退路了。

你不是多疑，你只是信息处理速度比大多数人快——说话方式有点奇怪？收到了。眼神往左偏了一下？收到了。这个地方的空气质量突然变了？也收到了。你的系统永远在跑后台，这让你比任何人都更早察觉到"有点不对"，也比任何人都更快做出反应。

这种能力很好用，代价是：你有点累。你不能像某些人那样大大咧咧走进任何一个房间，因为你进去就会开始扫描、判断、计算——即使你只是想随便坐一坐。

很多人不懂你的消失。你不是疏远，你只是那个场子的信噪比不够好，你需要撤到一个安静的地方重置一下。等你回来，你还是你，而且状态比大多数人都更稳。

你最让人意外的地方，是当一个场子真的需要你的时候，你会从没人知道你在哪里，突然就出现了。`, species: { habitat: `林麝是一种体型娇小、没有犄角的鹿类。它们生性孤僻、极其胆小，主要隐居在横断山脉针阔混交林或陡峭的灌丛中，通常只在晨昏时分才悄悄出来活动。`, skill: `它们是森林里的"跑酷大师"。林麝的蹄子非常特殊，不仅能在近乎垂直的悬崖峭壁上如履平地，遇到猛兽追击时，还能一跃跳上倾斜的树干躲避危机。`, funFact: `你敢信吗？雄性林麝虽然没有角，但嘴里却长着两根长达几厘米的"吸血鬼獠牙"（发达的上犬齿），这是它们争夺配偶时的决斗武器。

想知道更多？搜索：IUCN Forest Musk Deer`, statusDesc: `濒危（EN）。成年雄性林麝腹部有一个香腺，能分泌极其名贵的"麝香"。正因为这价比黄金的香料，林麝遭受了极其惨烈的疯狂盗猎。你以为的岁月静好，其实是它们躲避猎枪的胆战心惊。` } },
      en: { name: `Forest Musk Deer`, wildPopulation: "TBD", tags: [`Quiet watcher`, `Highly sensitive`, `Fast retreat`], quote: `You can't find me — but I'm always here.`, personalityName: `The Hermit`, personalityDesc: `While others decide if a room is safe, you've already planned three exits.

You're not paranoid — you process signals faster than most. Odd phrasing? Noted. Eyes flick left? Noted. Air quality shift? Noted. Your background scan never stops — you notice "something's off" earlier and react faster.

Useful, but tiring. You can't stroll casually into every room like some people — you scan, judge, calculate even when you just wanted to sit.

People misread your disappearances. You're not distant — the signal-to-noise ratio was bad and you needed a quiet reset. You return as yourself, steadier than most.

Your surprise move: when a room truly needs you, you appear from nowhere.`, species: { habitat: `Small, hornless deer — solitary and extremely shy. They hide in Hengduan mixed forests and steep scrub, venturing out mainly at dawn and dusk.`, skill: `Forest parkour masters. Special hooves grip near-vertical cliffs; when chased they can leap onto slanted trunks to escape.`, funFact: `Male musk deer have no antlers but grow long "vampire fangs" (upper canines) — duel weapons for mating fights.

Learn more: search IUCN Forest Musk Deer`, statusDesc: `Endangered (EN). Males bear a musk gland worth more than gold — driving brutal poaching. Their calm appearance hides life dodging rifles.` } },
    },
  },

  {
    id: "takin",
    code: "TANK",
    isEgg: false,
    eggType: null,
    conservationStatus: "VU",
    iucnUrl: "https://www.iucnredlist.org/species/22137/9360918",
    vector: [2, 3, 3, 1, 2, 3, 1],
    locale: {
      zh: { name: `羚牛`, namePinyin: `líng niú`, wildPopulation: `【待填写】`, tags: [`稳住型选手`, `抗压高手`, `山地重装坦克`], quote: `推不动我的事，最后都被我推走了。`, personalityName: `坦克`, personalityDesc: `你不是反应慢，你只是在别人还没开始慌的时候，就已经把重心放下去了。

你不属于那种靠速度和灵巧赢的类型。你赢的方式更古老：扛着走，推着过，谁都知道你会到，你也知道，所以不急。别人在你前面蹦跳，你慢吞吞往前推，然后你发现他们已经在喘了，你还没用到五成力。

你对"乱"有极高的耐受力。别人开始慌的时候，你是那个让大家觉得"还好他在"的人——不是因为你有什么妙招，而是你压根没有被带乱的打算，你的重心就是比别人低，就是比别人稳。

真正让人害怕的不是你爆发时有多猛，而是你根本没有爆发——你只是往前走，然后发现障碍已经不在了。你自己好像也不太记得是什么时候处理掉的。`, species: { habitat: `名字里虽然带"牛"，但羚牛其实在分类上更接近羊（牛科羊亚科），是名副其实的大型高山羊类。横断山脉的四川、云南西北部是它们（特别是四川亚种和不丹亚种）的重要栖息地。`, skill: `它们是真正的高山"重装步兵"。能在海拔2500-4500米的陡峭岩壁上稳稳行走。横断山脉常年雨雾弥漫，羚牛的皮肤能分泌出一种特殊的油脂，像穿了一件天然的"冲锋衣"，防风又防雨。`, funFact: `羚牛常被称为"六不像"——它庞大隆起的背脊像棕熊，两条倾斜的后腿像非洲斑鬣狗，四肢粗短像牛，脸像驼鹿，宽大扁平的尾巴像山羊，而两只角又像角马。

想知道更多？搜索：IUCN Takin`, statusDesc: `易危（VU）。作为国家一级保护动物，它们体型虽大，但在面对栖息地被公路、水电站割裂时，依然显得无比脆弱。种群隔离是它们目前最大的困境。` } },
      en: { name: "Takin", wildPopulation: "TBD", tags: [`Steady type`, "Pressure-proof", `Mountain tank`], quote: `What couldn't push me, I pushed through.`, personalityName: `The Tank`, personalityDesc: `You're not slow — you dropped your centre of gravity before others even started panicking.

You don't win by speed or agility. You win the old way: carry, push, everyone knows you'll arrive, and so do you — no rush. Others bounce ahead; you lumber forward and find them gasping while you're barely at half power.

You tolerate chaos well. When people panic, you're the one who makes them feel "okay, they're here" — not tricks, just refusal to be knocked off balance. Your centre is lower and steadier.

What's scary isn't your burst — it's that you never burst. You just walk forward and the obstacle isn't there anymore. You barely remember when you cleared it.`, species: { habitat: `"Takin" suggests cattle but they're closer to goats — large high-altitude caprines. Sichuan and northwest Yunnan in the Hengduan are key habitat for several subspecies.`, skill: `True alpine heavy infantry on 2,500–4,500 m cliffs. Constant mist drives secretion of waterproof skin oils — a natural hardshell against wind and rain.`, funFact: `Called "six-unlike" — back like a bear, hind legs like a hyena, limbs like cattle, face like a moose, tail like a goat, horns like a wildebeest.

Learn more: search IUCN Takin`, statusDesc: `Vulnerable (VU). Despite top-tier protection, roads and hydropower fragment habitat. Isolated populations are their biggest crisis.` } },
    },
  },

  {
    id: "giant_panda",
    code: "SOFT",
    isEgg: true,
    eggType: "hidden",
    conservationStatus: "VU",
    iucnUrl: "https://www.iucnredlist.org/species/712/121745669",
    vector: null,
    locale: {
      zh: { name: `大熊猫`, namePinyin: `dà xióng māo`, wildPopulation: `约1800只`, tags: [`柔软稳定核`, `节奏掌控者`, `看似松弛实则很有主见`], quote: `系统默认给我开了最高权限。`, personalityName: "SOFT", personalityDesc: `先说清楚：SOFT不是"好捏"，不是"没脾气"，更不是"随便"。

你身上那种让人放松的气质，不是因为你没有想法，而是因为你的想法从不需要靠外放来证明。你不急着争、不急着抢、不急着让所有人知道你在。你有自己的节奏，而且你对这个节奏的掌控，比大多数人意识到的要强得多。

该吃饭的时候吃饭，该休息的时候休息，该坚持的时候谁都别想推走——你不是佛，你只是很清楚什么时候该动、什么时候不值得动。别人以为你在随波逐流，其实你在选择性地随。

你最厉害的地方不是一时很亮，而是漫长时间里始终稳着，还挺暖。这种人不多，但一旦你身边有一个，你会发现自己很难不依赖那种稳定感。`, species: { habitat: `【待填写】物种档案`, skill: `【待填写】生存绝技`, funFact: `【待填写】冷知识

想知道更多？搜索：IUCN Giant Panda`, statusDesc: `【待填写】保护现状` } },
      en: { name: `Giant Panda`, wildPopulation: `~1,800 individuals`, tags: [`Soft stable core`, `Rhythm master`, `Relaxed but firm`], quote: `The system gave me admin by default.`, personalityName: "SOFT", personalityDesc: `First: SOFT doesn't mean pushover, temperless, or "whatever."

The ease you give others isn't lack of opinion — your opinions don't need performance to exist. You don't rush to compete, grab, or announce yourself. You have your rhythm, and you control it more than people realise.

Eat when it's time to eat, rest when it's time to rest, hold the line when it's time — you're not zen, you just know when to move and when it's not worth it. Others think you drift; you're selectively flowing.

Your gift isn't a flash of brilliance — it's staying steady and warm over long stretches. Rare — and hard not to lean on once you've felt it.`, species: { habitat: `Species profile — coming soon`, skill: `Survival skills — coming soon`, funFact: `Fun facts — coming soon

Learn more: search IUCN Giant Panda`, statusDesc: `Conservation status — coming soon` } },
    },
  },

  {
    id: "clouded_leopard",
    code: "NULL",
    isEgg: true,
    eggType: "combo",
    conservationStatus: "VU",
    iucnUrl: "https://www.iucnredlist.org/species/23049/50049167",
    vector: [2, 1, 1, 1, 2, 2, 3],
    locale: {
      zh: { name: `云豹`, namePinyin: `yún bào`, wildPopulation: `不足10000只（中国大陆已极罕见）`, tags: [`神秘到不存在`, `你永远找不到我`, `倒反天罡`], quote: `你可能永远找不到我。`, personalityName: "NULL", personalityDesc: `科学家带着设备进山找你的同类，最后只拍到风。这是赞美。

你不是刻意神秘，你只是自然而然地存在于大多数人的感知边缘——你来过，但没人能说清你什么时候来的；你在，但很多时候大家只是"感觉"你在，并不能真正确定。这不是你故意制造的效果，这是你存在的方式。

你身上最奇特的地方，是你明明有很强的存在感，但那种存在感是事后才被人意识到的。当时没人注意，过了一段时间，有人突然说：哎，那件事是你处理的吧？然后所有人才想起来，哦，对，你在。

你的稀有度是真实的。不是所有人都能读懂你，也不是所有场子都值得让你现身。那些真正见过你的人，会明白那是一件需要珍惜的事。`, species: { habitat: `【待填写】物种档案`, skill: `【待填写】生存绝技`, funFact: `【待填写】冷知识

想知道更多？搜索：IUCN Clouded Leopard`, statusDesc: `【待填写】保护现状` } },
      en: { name: `Clouded Leopard`, wildPopulation: `Fewer than 10,000 (extremely rare in mainland China)`, tags: [`Too mysterious to exist`, `You will never find me`, `Plot twist`], quote: `You may never find me.`, personalityName: "NULL", personalityDesc: `Scientists searched with gear and only caught wind. That's a compliment.

You're not performing mystery — you naturally live at the edge of most people's perception. You were there, but nobody can timestamp it; you're present, yet people only "sense" you without certainty. That's not an act — it's how you exist.

Your strangest trait: strong presence that's only recognised in hindsight. Nobody noticed in the moment; weeks later someone says, "Wait, you handled that?" and everyone remembers — oh, right, you were there.

Your rarity is real. Not everyone reads you; not every room deserves you. Those who have seen you know it's something to cherish.`, species: { habitat: `Species profile — coming soon`, skill: `Survival skills — coming soon`, funFact: `Fun facts — coming soon

Learn more: search IUCN Clouded Leopard`, statusDesc: `Conservation status — coming soon` } },
    },
  },

  {
    id: "chinese_monal",
    code: "GLOW",
    isEgg: true,
    eggType: "combo",
    conservationStatus: "VU",
    iucnUrl: "https://www.iucnredlist.org/species/22679187/92806486",
    vector: [2, 1, 2, 2, 2, 2, 2],
    locale: {
      zh: { name: `绿尾虹雉`, namePinyin: `lǜ wěi hóng zhì`, wildPopulation: `【待填写】`, tags: [`高山发光体`, `惊艳型存在`, `安静但自带镜头感`], quote: `你见过我，算你运气好。`, personalityName: "GLOW", personalityDesc: `你出现在一个地方，那个地方的平均审美会被临时拉高，这不是你的问题，这是你的体质。

你不是在刻意发光，你只是天生的颜色就比周围亮一点、质感就比周围高一档、存在感就比周围稠一点。你不需要开口，不需要表演，不需要做任何特别的事——你只需要出现。然后有人会在心里想：哦，今天来了。

你不怎么常出现。不是因为你不想，而是因为你有自己的节奏，你对"值不值得这次出现"有非常清楚的判断。这反而让每一次你真正出现的场合，都带着某种"等到了"的分量。

稀有是你最真实的属性。见过你的人，会觉得运气好；没见过你的人，会有点遗憾。这两件事你都不需要做什么，它们会自己发生。`, species: { habitat: `【待填写】物种档案`, skill: `【待填写】生存绝技`, funFact: `【待填写】冷知识

想知道更多？搜索：IUCN Chinese Monal`, statusDesc: `【待填写】保护现状` } },
      en: { name: `Chinese Monal`, wildPopulation: "TBD", tags: [`Alpine glow`, `Stunning presence`, `Quiet but photogenic`], quote: `If you saw me, count yourself lucky.`, personalityName: "GLOW", personalityDesc: `When you enter a place, the average aesthetic temporarily rises — not your fault, your constitution.

You're not trying to shine — your colour, texture, and presence are simply denser than the surroundings. No speech, no performance, no special effort — you just appear. Someone thinks: oh, today got better.

You don't show up often — not because you don't want to, but because you judge whether an appearance is worth it. That makes every real appearance feel like "finally."

Rarity is your truest trait. Those who've met you feel lucky; those who haven't feel a little regret. You don't need to do anything — it happens on its own.`, species: { habitat: `Species profile — coming soon`, skill: `Survival skills — coming soon`, funFact: `Fun facts — coming soon

Learn more: search IUCN Chinese Monal`, statusDesc: `Conservation status — coming soon` } },
    },
  },

  {
    id: "snow_leopard_extreme",
    code: "SLAY?",
    isEgg: true,
    eggType: "extreme",
    conservationStatus: "VU",
    iucnUrl: "https://www.iucnredlist.org/species/22732/50664030",
    reuseScienceFrom: "snow_leopard",
    vector: [2, 3, 1, 1, 2, 3, 3],
    locale: {
      zh: { name: `雪豹极致形态`, namePinyin: `xuě bào jí zhì xíng tài`, wildPopulation: `约500只`, tags: [`高冷外壳`, `沙雕内核`, `咬尾巴的那只`], quote: `外人看我：雪山之王。我自己：[被风吓到原地起跳]。`, personalityName: "SLAY?", personalityDesc: `你给外人的印象和你给自己的印象，是两套完全不同的叙事。

外人版本：沉稳、神秘、有点难接近、说话不多但每次说都说到点上，总之整体气质是"这个人很厉害"。你自己的版本：刚才那个动静是什么、我要不要在意、算了先不在意、不对感觉有点不对、哎怎么回事、等等——然后你就把自己的尾巴叼住了。

你身上的高冷有一部分是真的，但另一部分其实是你需要大量独处时间来消化内耗的结果。你看起来在掌控一切，私下里有时候只是在咬尾巴——字面意义上的，或者比喻意义上的。

好消息是，这个版本的你比"纯高冷"更有意思，也更真实。那个站在山顶看起来所向披靡的身影，偶尔会因为一阵风歪一下，这才是你，这才叫SLAY?。` },
      en: { name: `Snow Leopard (Extreme)`, wildPopulation: `~500 individuals`, tags: [`Cool exterior`, `Chaotic interior`, "Tail-biter"], quote: `Others see: king of the mountains. Me: [startled jump at wind].`, personalityName: "SLAY?", personalityDesc: `The story others tell about you and the story you tell yourself are two completely different scripts.

Public version: calm, mysterious, slightly distant, few words but always on point — overall vibe "this person is formidable." Private version: what was that noise, should I care, maybe not, wait something feels off, huh, hold on — and you bite your own tail.

Part of your cool is real; part is needing solitude to process inner noise. You look in control; privately you're sometimes literally biting your tail — figuratively or literally.

Good news: this version is more interesting and more real. The figure on the peak that looks invincible sometimes wobbles in the wind — that's you. That's SLAY?.` },
    },
  },

  {
    id: "monkey_extreme",
    code: "5G",
    isEgg: true,
    eggType: "extreme",
    conservationStatus: "EN",
    iucnUrl: "https://www.iucnredlist.org/species/39866/10278553",
    reuseScienceFrom: "yunnan_snub_monkey",
    vector: [2, 2, 3, 3, 2, 1, 2],
    locale: {
      zh: { name: `滇金丝猴极致形态`, namePinyin: `diān jīn sī hóu jí zhì xíng tài`, wildPopulation: `约3000只`, tags: [`全雄群蛰伏者`, `候场中`, `5G信号`], quote: `我不是WIFI，我是5G，只是还没覆盖到你。`, personalityName: "5G", personalityDesc: `你现在可能还不在最闪光的位置，但你在充电。

你知道自己能做什么，也知道时机还没到。这不是自我安慰，这是一种很清醒的判断——你不是没有能量，你只是没有找到让这些能量完全释放的节点。等到那个节点出现的时候，周围的人会突然发现：哦，原来他一直是这个量级的。

你现在做的事，很多看起来像是在"陪跑"——但你陪跑的方式是带着极高密度的观察、学习和积蓄。你比大多数人更早想清楚了自己要什么，你只是在等一个合适的时机，让那些积蓄真正有地方落地。

WIFI负责把你们连在一起，5G负责让这个连接快十倍、稳十倍、覆盖范围宽十倍。你是升级版，只是信号塔还在建设中。建好了，大家都会知道的。` },
      en: { name: `Yunnan Snub-nosed Monkey (Extreme)`, wildPopulation: `~3,000 individuals`, tags: [`All-male troop sleeper`, `Waiting in the wings`, `5G signal`], quote: `I'm not WIFI — I'm 5G, just not covering you yet.`, personalityName: "5G", personalityDesc: `You may not be in the brightest spotlight yet — but you're charging.

You know what you can do and that timing isn't here. Not self-comfort — clear judgment. You're not low on energy; you haven't found the node to release it fully. When that node arrives, people suddenly realise you've been this calibre all along.

Much of what you do looks like "running alongside" — but with dense observation, learning, and storage. You figured out what you want earlier than most; you're waiting for the right moment to land it.

WIFI connects you; 5G makes that connection ten times faster, steadier, wider. You're the upgrade — the tower is still under construction. When it's built, everyone will know.` },
    },
  }
];

export const animalsMap = Object.fromEntries(
  animals.map((a) => [a.id, a]),
);

export const baseAnimals = animals.filter((a) => !a.isEgg);

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
  "滇金丝猴极致形态": "monkey_extreme"
};

export const animalVectors = {
  snow_leopard: [2, 3, 1, 1, 2, 3, 3],
  yunnan_snub_monkey: [2, 2, 3, 3, 2, 1, 2],
  dhole: [3, 3, 3, 3, 3, 3, 1],
  black_necked_crane: [3, 2, 2, 2, 2, 2, 3],
  red_panda: [2, 2, 1, 1, 1, 1, 2],
  asian_black_bear: [2, 1, 1, 1, 3, 3, 3],
  forest_musk_deer: [1, 1, 1, 1, 1, 2, 2],
  takin: [2, 3, 3, 1, 2, 3, 1]
};
