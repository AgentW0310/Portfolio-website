import React, { useEffect, useRef, useState } from 'react'
import LineWaves from './LineWaves'
import ScrollReveal from './ScrollReveal'
import { buildExtraLocales, detectInitialLanguage, languageOptions, localeUi } from './locales'

const projectMedia = {
  forbidden: [
    ...['01.png','02.png','03.png','04.png','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg']
      .map((file) => `/assets/projects/forbidden-fruit/gallery/${file}`),
  ],
  lost: [
    ...['01.jpeg', '02.jpeg', '04.jpeg', '08.jpeg', '03.jpeg', '05.jpeg', '06.jpeg', '07.jpeg',
      '09.jpeg', '10.jpeg', '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg',
      '15.jpg', '16.jpg', '17.jpg', '18.jpg']
      .map((file) => `/assets/projects/am-i-lost/gallery/${file}`),
    '/assets/projects/am-i-lost/runway-01.JPG',
    '/assets/projects/am-i-lost/runway-02.JPG',
  ],
  dante: [
    ...['01.jpeg', '02.jpeg', '03.jpeg', '04.jpeg', '05.jpeg', '06.jpeg', '07.jpeg', '08.jpeg',
      '12.jpeg', '09.jpg', '10.jpg', '11.jpg', '13.jpg', '14.jpg', '15.jpeg']
      .map((file) => `/assets/projects/dantes-game/gallery/${file}`),
  ],
  peeping: [
    '/assets/projects/peeping/gallery/01.jpeg',
    '/assets/projects/peeping/gallery/02.jpeg',
    ...Array.from({ length: 5 }, (_, index) => `/assets/projects/peeping/gallery/${String(index + 3).padStart(2, '0')}.jpg`),
  ],
}

const commercialMedia = {
  dunhuang: Array.from({ length: 6 }, (_, index) => `/assets/commercial/dunhuang/${index + 1}.JPG`),
  cap: ['cover.png', 'front.png', 'right.png', 'detail.png'].map((file) => `/assets/commercial/cap/${file}`),
  ring: ['01.png', '02.png'].map((file) => `/assets/commercial/star-ring/${file}`),
  cat: ['/assets/commercial/black-cat/cover.jpg'],
  hunger: [
    '/assets/commercial/of-hunger-gray/EN3_c73a1336-fbdd-4dde-a571-0451af475a90.webp',
    '/assets/commercial/of-hunger-gray/EN_2d3d56fa-4721-4116-8fa1-5c0ca3db35af.webp',
    '/assets/commercial/of-hunger-gray/EN2_8c853915-379b-46c2-b93a-8193cc2fdad2.webp',
    '/assets/commercial/of-hunger-gray/1_9ef7b55f-0a47-4795-bc80-ae950f171969.webp',
    '/assets/commercial/of-hunger-gray/2_12fab2c0-af22-43a0-85d8-eb4ee206f534.webp',
    '/assets/commercial/of-hunger-tiger/EN3_ec15a601-0e78-4c60-a474-c34266d45a97.webp',
    '/assets/commercial/of-hunger-tiger/EN_ebd0a7cc-0ca0-4432-9e7f-eb078b041599.webp',
    '/assets/commercial/of-hunger-tiger/EN2_dbdc14c6-9eda-47d0-80c7-35f4b3576bd1.webp',
    '/assets/commercial/of-hunger-tiger/1_40b6c954-93a8-4d65-8d64-369af3866852.webp',
    '/assets/commercial/of-hunger-tiger/2_112cc149-11d9-49d4-8de5-8f9ec07f7aeb.webp',
  ],
}

const commercialShowcaseCovers = {
  dunhuang: '/assets/commercial/dunhuang/1.JPG',
  cap: '/assets/commercial/cap/front.png',
  ring: '/assets/commercial/star-ring/01.png',
  cat: '/assets/commercial/black-cat/cover.jpg',
  hunger: '/assets/commercial/of-hunger-gray/EN_2d3d56fa-4721-4116-8fa1-5c0ca3db35af.webp',
}

function galleryLayout(projectId, index) {
  const layouts = {
    'forbidden-fruit': ['wide', 'wide', 'wide', 'wide', 'wide', 'portrait', 'wide', 'wide', 'wide'],
    flow: ['wide', 'wide', 'wide', 'wide', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait', 'wide', 'wide', 'wide', 'wide', 'portrait', 'portrait'],
    'dantes-game': ['cinema', 'cinema', 'cinema', 'cinema', 'cinema', 'cinema', 'cinema', 'cinema', 'wide', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait', 'portrait'],
    peeping: ['portrait', 'wide', 'wide', 'wide', 'wide', 'wide', 'wide'],
  }
  return layouts[projectId]?.[index] || 'wide'
}

const copy = {
  en: {
    nav: ['About', 'Selected Work', 'Commercial Works'],
    contact: 'Contact',
    eyebrow: 'Jewelry · Fashion Artefacts · Contemporary Art',
    heroTitle: ['OBJECTS', 'BECOME', 'IDENTITY'],
    heroSub: 'Zhuangwei Liu creates wearable objects that examine desire, identity and the social systems surrounding the body.',
    scroll: 'Scroll to discover',
    aboutLabel: '01 — Profile',
    aboutTitle: 'Between the intimacy of jewelry and the scale of performance.',
    aboutBody:
      'I make jewelry, accessories and objects, but I usually begin with something less visible: a restrained emotion, a social distance, or a question that stays longer than expected. Making gives these quiet observations a body. It allows me to hold them at a distance, examine them, and return them to the world in another form.',
    aboutSecond:
      'I grew up and studied design in China, then continued my practice in London. I am drawn to work that does not explain itself too quickly—objects that remain precise yet slightly unresolved, intimate yet conscious of the systems around them. Between independent practice and commercial development, I look for a balance between sensitivity, structure and the reality of production.',
    based: 'London · Available for design, art and commercial collaborations',
    experience: 'Selected experience',
    autobiographyTitle: 'Building a Self Through Contradictions',
    autobiography: [
      'I have never considered myself a designer in the conventional sense. Design is one of the ways through which I understand the world, but it is not my only language. My curiosity regularly crosses the borders of my profession and enters fields that may initially appear unrelated: music, languages, manga, physical training, nutrition, and the quiet observation of people and social behaviour. They do not form a neat or linear path, yet together they shape how I perceive, learn and create.',
      'I have never received formal training in music theory, but through repeated listening I can deconstruct the melody, rhythm, instrumentation and arrangement of a pop song, then reconstruct it with a high degree of fidelity. To me, this is more than an auditory skill. It is an instinct for tracing structure—recognising order within complex information and rebuilding it piece by piece. The same instinct appears in my design practice: I tend to notice relationships that are difficult to articulate, then search for the materials, forms and visual language through which they might become tangible.',
      'My relationship with languages developed through a similarly unconventional process. Without systematic courses, I learned largely through music, moving images and sustained attention to context. Over time, I became able to understand most everyday Cantonese content and to communicate at a basic level in Japanese. What interests me is not vocabulary alone, but the emotional rhythm and mode of thought carried by a language. Entering another language feels like temporarily borrowing another sense.',
      'I also work as a manga artist. Manga has taught me to think about the relationship between image, time and narrative: how an action is divided, how an emotion can remain inside a silent panel, and how an absent moment may be completed by the viewer. My study of physical training and nutrition allows me to understand the body at another scale—as a living system that tires, adapts, resists and rebuilds itself. This understanding shapes how I approach jewelry and wearable objects: not as decoration placed upon a body, but as forms that negotiate weight, movement, touch and psychological boundaries.',
      'There are obvious contrasts between these identities, but I have never felt the need to compress them into a perfectly coherent label. I understand myself instead as someone who continuously learns, disassembles and reconstructs. A wide range of interests can mean taking the longer route, but it also prevents me from being confined by the habits of a single discipline. I move between sensitivity and structure, imagination and production, private experience and public context.',
      'My life has not followed an orderly or predictable route. I have lived through circumstances that, given a choice, most people might not willingly choose. I do not want suffering to explain me, nor do I wish to turn it into a narrative for display. Those experiences belong to me, but they do not define me. I am grateful instead for the sensitivity, resilience and judgement they left behind. They taught me to continue working inside uncertainty, to construct my own order when no ready-made answer exists, and to remain curious enough to keep learning and creating.',
      'What distinguishes my practice is not simply the number of apparently unrelated things I can do. It is my belief that connections exist between different forms of knowledge before they become visible. My work takes shape within those connections: between sound and form, language and identity, body and object, and private experience and the wider realities that surround it.',
    ],
    exp: [
      ['BeJustHuG / BJHG', 'Product & Accessory Designer', '2025 — 2026'],
      ['Independent Practice', 'Designer & Artist', '2024 — Present'],
      ['UAL — London College of Fashion', 'MA Fashion Artefact', '2022 — 2026'],
      ['Beijing Institute of Fashion Technology', 'BA Product Design — Jewelry', '2017 — 2021'],
    ],
    projectsLabel: '02 — Selected work',
    projectsTitle: 'Objects that test the borders between the body and society.',
    view: 'View case',
    projectIntro: 'Four selected projects from the supplied portfolio. Research has been distilled into a concise premise; the visual focus remains on the resolved work and final photography.',
    projects: [
      {
        id: 'forbidden-fruit',
        no: '01',
        title: 'Forbidden Fruit',
        subtitle: 'Desire Beneath Prohibition',
        type: 'Wearable Object · Jewelry',
        year: '2021',
        cover: '/assets/projects/forbidden-fruit/cover.png',
        statement:
          'Forbidden Fruit examines the tension created when systems of protection become systems of prohibition. Taking the apple as a symbol of knowledge, temptation and transgression, the project turns curiosity into a polished object that can be approached, handled and worn.',
        details: [
          'The project began with the absence of a cultural-content rating system in China. Films, games and other cultural products containing adult elements may face a one-size-fits-all response: they are not approved for import, or may be blocked altogether, rather than being made available to different audiences through classification. This led me to consider how protection can become prohibition—and how prohibition can make the unseen more magnetic. I became interested in the psychological state of moving repeatedly toward something one has been told not to touch.',
          'The apple connects knowledge, temptation, corruption and sin. Through collage, painting and physical experiments—including the suspended tension between balloons and sharp points—I translated that contradiction into jewelry. Smooth surfaces invite contact while compressed structures hold the body at the threshold between attraction and restraint.',
        ],
        focus: 'Prohibition · Curiosity · Tension',
        media: projectMedia.forbidden,
      },
      {
        id: 'flow',
        no: '02',
        title: 'Flow',
        subtitle: 'Bodies in Constant Transit',
        type: 'Jewelry Collection · Body Objects',
        year: '2020',
        cover: '/assets/projects/am-i-lost/cover.jpeg',
        statement:
          'Flow responds to the continuous movement of people during China’s Spring Festival travel rush. Migration maps are read alongside the body’s vascular system, translating routes, circulation and pressure into jewelry that spreads across the neck, chest, arms and hands.',
        details: [
          'The Spring Festival travel rush is not only a seasonal spectacle; it reflects the long-term distance between where people live, work and belong. Urban–rural development has made repeated migration historically inevitable, leaving millions of people moving between two or more places along routes that seem to have no final end.',
          'Migration data from Beijing and Shenzhen forms central, radial networks that resemble a heart pumping blood through the body. I compared these maps with vessels in the heart, lungs, shoulders, arms, wrists and fingers, then developed an organic vocabulary of branching and circulation. Each wearer becomes both an individual body and one moving cell within a larger social system.',
        ],
        focus: 'Migration · Circulation · Body',
        media: projectMedia.lost,
      },
      {
        id: 'dantes-game',
        no: '03',
        title: 'Dante’s Game',
        subtitle: 'Who Defines the Perfect Body?',
        type: 'Participatory Performance · Wearable System',
        year: '2021',
        cover: '/assets/projects/dantes-game/face.jpeg',
        statement:
          'Dante’s Game questions who authors the standards by which bodies are judged. Participants altered images according to their own ideals; these interventions became lightweight wearable forms and the rules of a live chasing game about comparison, control and bodily exchange.',
        details: [
          'A questionnaire explored dissatisfaction with facial features and body shape, the influence of other people’s evaluations, and whether beauty is a personal judgement or an inherited social rule. Rather than treating the answers as statistics alone, I built an imagined world governed by Dante—a rule-maker who turns aesthetic judgement into a playable system.',
          'Four participants edited photographs of my face and body according to their own standards. I extracted the altered forms, rebuilt them as lightweight resin objects for the head, shoulders, waist, hips and feet, and returned them to the participants through a four-stage game. Scoring, body exchange and a live chasing round expose how quickly preference becomes hierarchy, discipline and control.',
        ],
        videoId: 'lQP3Si30ioM',
        focus: 'Beauty Standards · Participation · Performance',
        media: projectMedia.dante,
      },
      {
        id: 'peeping',
        no: '04',
        title: 'Peeping',
        subtitle: 'The Distance Between Looking and Being Seen',
        type: 'Interactive Wearable · Kinetic Object',
        year: '2021',
        cover: '/assets/projects/peeping/cover.jpg',
        statement:
          'Peeping reflects on privacy and the desire to look into other people’s lives in the age of mass data. A proximity sensor activates a servo-driven folded structure, turning the act of approaching into an uneasy exchange between observer, object and observed body.',
        details: [
          'The project begins with the urge to enter another person’s inner world—and the way that urge can become a desire for control. In an environment shaped by mass data, privacy is increasingly accessible and compromise becomes ordinary. Peeping turns this invisible condition into a physical encounter.',
          'A distance sensor reads the approach of another body. The signal activates a servo, which pulls fishing line through a folded paper structure and causes the wearable form to open, contract and react. The observer’s movement therefore becomes part of the work: looking is no longer passive, and proximity produces a visible response from the body being watched.',
        ],
        focus: 'Privacy · Surveillance · Interaction',
        media: projectMedia.peeping,
      },
    ],
    archiveLabel: 'Selected objects & recognition',
    archiveTitle: 'Further work',
    archive: [
      ['Jump & Dance', 'Olympic creative object', 'Runner-up — 2020 Tokyo Olympics Chinese Zodiac Creative Exhibition', '/assets/projects/other/jump-and-dance.png'],
      ['The Lipsticks', 'Product concept', 'A modular cosmetic object developed through industrial design language', '/assets/projects/other/lipsticks.jpg'],
      ['Silver Bullet', 'Product concept', 'A cosmetic object balancing mechanical precision and ritual', '/assets/projects/other/silver-bullet.jpg'],
    ],
    commercialLabel: '03 — Commercial work',
    commercialTitle: ['DESIGN', 'BECOMES', 'REALITY'],
    commercialIntro: 'Selected commissioned and brand-led work across accessories, jewelry, gifting and wearable technology.',
    commercial: {
      dunhuang: {
        title: 'BJHG × Dunhuang Museum',
        subtitle: 'Rituals Reimagined',
        year: '2025',
        type: 'New Year Gift Set · Product & Visual Development',
        body: 'A festive gift set that brings Dunhuang’s visual memory into a contemporary game ritual. The project moves from graphic language and object development to packaging, sampling and the final photographic world.',
      },
      cap: {
        title: 'Wear for Fun',
        subtitle: 'An Attitude in Motion',
        year: '2025',
        type: 'Accessory Design · Product Development',
        body: 'A structured trucker cap developed through proportion, embroidery placement, washed colour and production detailing.',
      },
      ring: {
        title: 'BJ Star Ring',
        subtitle: 'A Symbol in Orbit',
        year: '2025',
        type: 'Jewelry Design · 3D Development',
        body: 'A sculptural ring built around a compressed star form, balancing fluid surfaces with a compact graphic silhouette.',
      },
      cat: {
        title: 'Black Cat Earrings',
        subtitle: 'A Character in Motion',
        year: '2025',
        type: 'Jewelry Design · Product Development',
        body: 'A playful two-part earring that turns the black cat into a precise, wearable character with movement and contrast.',
      },
      hunger: {
        title: 'Of Hunger AI Earphones',
        subtitle: 'Stone, Sound and Body',
        year: '2024',
        type: 'Supply-chain Coordination · Form Refinement · Production Development',
        body: 'For the Grey Zircon and Tiger’s Eye editions, my role centred on translating an existing design direction into a more resolved product—coordinating suppliers, refining form and fit, and supporting the path from sample to production.',
      },
    },
    practiceLabel: '03 — Practice',
    practiceTitle: 'A hybrid practice, grounded in making.',
    strengths: [
      ['01', 'Concept & Research', 'Turning cultural observation and social questions into focused, original design propositions.'],
      ['02', 'Material & Making', 'Metal craft, stone setting, model making and mixed-material testing with attention to tactility and finish.'],
      ['03', '3D Development', 'Rhino, Shapr3D and KeyShot—from sketch and prototype to resolved form and production communication.'],
      ['04', 'Visual Narrative', 'Building a coherent world around an object through styling, photography, performance and spatial display.'],
    ],
    endSmall: 'For commissions, collaborations and opportunities',
    endTitle: ['LET’S CREATE', 'A NEW', 'LANGUAGE.'],
    email: 'lzw0310lk@gmail.com',
    instagram: 'cheungway_lau',
    copyright: '© 2026 ZHUANGWEI LIU. ALL RIGHTS RESERVED.',
  },
  zh: {
    nav: ['关于我', '精选项目', '商业作品'],
    contact: '联系我',
    eyebrow: '珠宝 · 时尚物件 · 当代艺术',
    heroTitle: ['物件', '成为', '身份'],
    heroSub: '刘庄威以可穿戴物件为媒介，探触欲望、身份与身体周围悄然运作的社会秩序。',
    scroll: '向下探索',
    aboutLabel: '01 — 个人简介',
    aboutTitle: '游走于珠宝的亲密尺度与表演的公共场域之间。',
    aboutBody:
      '我创作珠宝、配饰与物件，但起点往往不是某种具体形态，而是被压低的情绪、人与人之间的距离，或一个迟迟没有答案的问题。制作让这些不易言说的感受有了可以触碰的形体；我借此与它们保持距离，重新审视，再以另一种方式带回现实。',
    aboutSecond:
      '我在中国成长并接受设计教育，之后来到伦敦继续创作。我偏爱那些不急于给出解释的作品：形态精确，却保留未被封闭的余地；尺度亲密，同时意识到身体之外仍有秩序在运作。在独立创作与商业开发之间，我寻找感受力、结构和生产现实能够共存的位置。',
    based: '伦敦 · 开放设计、艺术与品牌合作',
    experience: '经历节选',
    autobiographyTitle: '在反差之间建立自我',
    autobiography: [
      '我从不把自己视为传统意义上的设计师。设计是我理解世界的方式之一，却不是唯一的语言。我的好奇心经常越过专业边界，延伸到音乐、语言、漫画、身体训练、营养，以及对人和社会的细微观察。它们没有构成一条笔直而整齐的路，却共同塑造了我感知、学习和创造事物的方式。',
      '我没有接受过系统的乐理训练，但可以凭借反复聆听，将一首流行歌曲中的旋律、节奏、音色与编排逐层拆解，并完成高度接近原作的扒带。对我而言，这不仅是一种听觉能力，更像是对结构的本能追踪——从复杂的信息中辨认秩序，再将它重新搭建起来。这种能力也延伸到了我的设计实践：我习惯先观察那些不易被说出的关系，再寻找适合它们的材料、形态和表达方式。',
      '我与语言的关系也沿着一条非典型的路径发展。没有系统课程，我主要通过音乐、影像和对语境的长期留意来学习。久而久之，我能够理解大部分日常粤语内容，也可以用日语进行简单交流。吸引我的不只是词汇，还有一种语言承载的情绪节奏与思考方式。每走进一种新的语言，都像是暂时借用了另一种感官。',
      '与此同时，我也进行漫画创作。漫画让我思考画面、时间与叙事之间的关系：一个动作如何被切分，一种情绪如何停留在沉默的格子里，一个没有被画出的瞬间又如何由观看者自行补全。健身训练与饮食研究则让我从另一种尺度理解身体。我持续学习训练结构、恢复机制和营养搭配，并将它们落实于自己的日常实践。身体对我而言并非抽象的载体，而是一套会疲劳、适应、抵抗和重建的真实系统。这也影响了我对珠宝与可穿戴物件的理解——它们不是被放置在身体表面的装饰，而是会与重量、动作、触觉和心理边界发生关系的存在。',
      '这些身份之间存在明显的反差，但我从未试图将它们整理成一个过分工整的标签。我更愿意把自己理解为一个持续学习、拆解与重组的人。广泛的兴趣有时意味着绕远路，却也让我不容易被单一专业的惯性限制。我可以在感性与结构、幻想与生产、个人经验与公共语境之间不断转换。',
      '我的人生没有沿着一条按部就班的路线展开。我经历过一些多数人若有选择，大概不会愿意承受的事情。但我不希望用苦难解释自己，也不打算把它们变成供人观看的叙事。它们属于我，却不定义我。我更愿意感谢那些经历留下的敏感、韧性与判断力——它们让我能够在不确定中继续工作，在没有现成答案时建立自己的秩序，也让我至今仍愿意学习、保持好奇并继续创造。',
      '对我而言，重要的从来不是掌握了多少看似无关的技能，而是始终相信：不同知识之间，在被看见以前就已经存在连接。我的实践正发生在这些连接之中——声音与形态、语言与身份、身体与物件，以及个人经验与更广阔的现实之间。',
    ],
    exp: [
      ['BeJustHuG / BJHG', '产品与配饰设计师', '2025 — 2026'],
      ['独立实践', '设计师 / 艺术家', '2024 — 至今'],
      ['伦敦艺术大学——伦敦时装学院', 'MA Fashion Artefact / 时尚手工艺品', '2022 — 2026'],
      ['北京服装学院', '产品设计（珠宝）本科', '2017 — 2021'],
    ],
    projectsLabel: '02 — 精选项目',
    projectsTitle: '测试身体与社会之间边界的物件。',
    view: '进入项目',
    projectIntro: '以下四个项目来自本次提供的完整作品集。网站将调研压缩为清晰的创作命题，把视觉重心留给最终作品与成品摄影。',
    projects: [
      {
        id: 'forbidden-fruit',
        no: '01',
        title: 'Forbidden Fruit',
        subtitle: '禁令之下的欲望',
        type: '可穿戴物件 · 珠宝',
        year: '2021',
        cover: '/assets/projects/forbidden-fruit/cover.png',
        statement:
          '《Forbidden Fruit》讨论保护如何逐渐变成禁令，以及禁令又如何反过来放大欲望。苹果在这里象征知识、诱惑与越界，这组矛盾最终被凝结为一件可以靠近、触碰和佩戴的物件。',
        details: [
          '项目源于我对中国尚未建立文化产品分级制度的思考。电影、游戏等作品一旦包含部分成人元素，往往面对的不是按受众年龄进行分类，而是“一刀切”式的不予引进，甚至封锁相关内容。这样的处理方式促使我重新审视保护与禁止之间的边界：当内容以保护之名从视野中消失，禁令本身反而可能放大人们对未知事物的好奇。我试图捕捉人在边界附近反复试探时，吸引、迟疑与紧张同时发生的心理状态。',
          '苹果同时指向知识、诱惑、堕落与罪。通过拼贴、绘画，以及气球与尖锐物逐渐靠近的张力实验，我将这种矛盾转译为珠宝：光滑表面邀请触碰，受到挤压的结构却让身体停留在靠近与克制之间。',
        ],
        focus: '禁令 · 欲望 · 越界',
        media: projectMedia.forbidden,
      },
      {
        id: 'flow',
        no: '02',
        title: 'Flow',
        subtitle: '持续迁徙的身体',
        type: '珠宝系列 · 身体物件',
        year: '2020',
        cover: '/assets/projects/am-i-lost/cover.jpeg',
        statement:
          '《Flow》从春运期间持续发生的人口迁徙出发，将迁徙数据与人体血管系统并置。路线、循环与压力被转化为沿颈部、胸腔和四肢延伸的珠宝形态。',
        details: [
          '春运并不只是一场季节性的流动奇观，它映射着人们居住、工作与归属之间长期存在的距离。城乡发展差距使迁徙成为一种历史性的必然，数以亿计的人在两个或更多地点之间往返，仿佛始终处于一条没有终点的路线之中。',
          '以北京与深圳为例，人口迁入迁出的数据形成从中心向外放射的网络，如同心脏将血液泵向身体各处。我将这些迁徙图谱与心脏、肺部、肩部、手臂、手腕和手指的血管走势并置，发展出分支、循环与蔓延的有机语言。佩戴者既是独立的身体，也成为庞大社会循环中持续移动的一个细胞。',
        ],
        focus: '迁徙 · 循环 · 身体地景',
        media: projectMedia.lost,
      },
      {
        id: 'dantes-game',
        no: '03',
        title: 'Dante’s Game',
        subtitle: '谁在定义完美身体？',
        type: '参与式表演 · 可穿戴系统',
        year: '2021',
        cover: '/assets/projects/dantes-game/face.jpeg',
        statement:
          '《Dante’s Game》追问：我们用来观看和评判身体的标准究竟由谁决定？参与者按照各自的审美修改图像，这些修改随后被制作成轻质穿戴物，并进入一场围绕比较、规训与身体交换展开的参与式游戏。',
        details: [
          '前期问卷围绕人们对五官与身体的不满、他人评价带来的影响，以及审美究竟源于个人判断还是既定社会规则展开。我没有把答案仅仅视作统计结果，而是构建了一个由规则制定者 Dante 支配的想象世界，让审美判断成为一套可以被参与和执行的制度。',
          '四位参与者依照自己的标准修改我的面部与身体照片。我提取被改变的形态，将其制作成分布于头部、肩部、腰部、臀部和脚部的轻质树脂穿戴物，再通过四阶段游戏归还给参与者。计分、身体交换与追逐规则揭示了个人偏好如何迅速转化为等级、规训与控制。',
        ],
        videoId: 'lQP3Si30ioM',
        focus: '观看 · 规训 · 参与式表演',
        media: projectMedia.dante,
      },
      {
        id: 'peeping',
        no: '04',
        title: 'Peeping',
        subtitle: '观看与被观看的距离',
        type: '互动穿戴 · 动态物件',
        year: '2021',
        cover: '/assets/projects/peeping/cover.jpg',
        statement:
          '《Peeping》关注数据时代的隐私边界，以及人们窥探他者生活的冲动。距离传感器驱动折叠结构，让“靠近”本身成为观察者、物件与被观看身体之间一次令人不安的互动。',
        details: [
          '项目始于人试图进入他者内心的欲望，以及这种欲望如何逐渐演变为控制。在海量数据塑造的环境中，隐私变得越来越容易被接近，妥协也成为日常。《Peeping》将这种不可见的状态转化为一次真实的身体遭遇。',
          '距离传感器读取另一个身体的靠近，并驱动舵机旋转；鱼线随之拉动折纸结构，使穿戴物展开、收缩并作出反应。观察者的移动因此成为作品的一部分：观看不再是被动行为，每一次靠近都会在被观看的身体上留下可见回应。',
        ],
        focus: '隐私 · 凝视 · 感应',
        media: projectMedia.peeping,
      },
    ],
    archiveLabel: '其他作品与荣誉',
    archiveTitle: '其他物件',
    archive: [
      ['跃动', '奥运主题创意物件', '2020 东京奥运·生肖奥运创意展生肖兔主题二等奖', '/assets/projects/other/jump-and-dance.png'],
      ['The Lipsticks', '产品概念', '以模块化结构重构彩妆物件的开启、组合与使用方式', '/assets/projects/other/lipsticks.jpg'],
      ['Silver Bullet', '产品概念', '在精密结构与日常仪式之间展开的彩妆物件', '/assets/projects/other/silver-bullet.jpg'],
    ],
    commercialLabel: '03 — 商业作品',
    commercialTitle: ['设计', '成为', '现实'],
    commercialIntro: '涵盖配饰、珠宝、礼赠与穿戴科技的品牌项目与产品实践。',
    commercial: {
      dunhuang: {
        title: 'BJHG × 敦煌博物馆',
        subtitle: '重构节日仪式',
        year: '2025',
        type: '新年礼盒 · 产品与视觉开发',
        body: '以当代游戏仪式重新组织敦煌的视觉记忆。项目贯穿图形语言、物件开发、包装、打样与最终影像，让文化线索进入可触碰、可使用的节日场景。',
      },
      cap: {
        title: 'Wear for Fun',
        subtitle: '流动中的态度',
        year: '2025',
        type: '配饰设计 · 产品开发',
        body: '从帽型比例、刺绣位置、洗水色调到生产细节，完成一款带有复古运动气息的结构化卡车帽。',
      },
      ring: {
        title: 'BJ Star Ring',
        subtitle: '轨道中的符号',
        year: '2025',
        type: '珠宝设计 · 三维开发',
        body: '将星形压缩为流动而紧凑的雕塑体，在柔软表面与鲜明轮廓之间取得平衡。',
      },
      cat: {
        title: 'Black Cat Earrings',
        subtitle: '动作中的角色',
        year: '2025',
        type: '珠宝设计 · 产品开发',
        body: '以两段式结构将黑猫转化为带有动作与反差的可佩戴角色，轻巧、克制而保留幽默。',
      },
      hunger: {
        title: 'Of Hunger AI Earphones',
        subtitle: '石、声音与身体',
        year: '2024',
        type: '供应链协同 · 形态优化 · 生产推进',
        body: '在灰锆石与虎眼石两个版本中，我负责承接既有设计方向，推进供应商沟通、形态与佩戴关系优化，并协助产品从样品逐步走向可生产状态。',
      },
    },
    practiceLabel: '03 — 创作实践',
    practiceTitle: '以制作与实验为根基的跨领域实践。',
    strengths: [
      ['01', '概念与研究', '将文化观察与社会议题转化为聚焦、原创且可延展的设计命题。'],
      ['02', '材料与制作', '掌握金工、镶嵌、模型制作与混合材料实验，重视触觉、重量和表面细节。'],
      ['03', '三维开发', '使用 Rhino、Shapr3D 与 KeyShot，从草图、原型推进至完整形态与生产沟通。'],
      ['04', '视觉叙事', '通过造型、摄影、表演与空间展示，为物件建立连贯的视觉世界。'],
    ],
    endSmall: '委托创作 · 品牌合作 · 工作机会',
    endTitle: ['让新的', '语言', '发生。'],
    email: 'lzw0310lk@gmail.com',
    instagram: 'cheungway_lau',
    copyright: '© 2026 ZHUANGWEI LIU. 版权所有。',
  },
}

Object.assign(copy, buildExtraLocales(copy.en))

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function App() {
  const [lang, setLang] = useState(detectInitialLanguage)
  const [scrolled, setScrolled] = useState(false)
  const [showcaseIndex, setShowcaseIndex] = useState(0)
  const [showcasePosition, setShowcasePosition] = useState(0)
  const [commercialIndex, setCommercialIndex] = useState(0)
  const [commercialPosition, setCommercialPosition] = useState(0)
  const [activeCommercial, setActiveCommercial] = useState('hunger')
  const [route, setRoute] = useState(() => window.location.hash)
  const [autoAnimating, setAutoAnimating] = useState(false)
  const showcaseRef = useRef(null)
  const autoPauseUntil = useRef(0)
  const autoAnimationTimer = useRef(null)
  const wheelSnapTimer = useRef(null)
  const commercialWheelSnapTimer = useRef(null)
  const dragState = useRef({ type: null, startX: 0, startPosition: 0, currentPosition: 0, moved: false })
  const t = copy[lang]
  const ui = localeUi[lang]
  const projectRoute = route.match(/^#\/project\/([^/]+)$/)
  const commercialRoute = route.match(/^#\/commercial(?:\/([^/]+))?$/)
  const isCommercial = Boolean(commercialRoute)
  const commercialTarget = commercialRoute?.[1]
  const activeProjectId = projectRoute?.[1]
  const activeProjectIndex = t.projects.findIndex((project) => project.id === activeProjectId)
  const activeProject = activeProjectIndex >= 0 ? t.projects[activeProjectIndex] : null
  const heroProject = t.projects[0]
  const showcaseProjects = t.projects.slice(1)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.lang = ui.htmlLang
    try {
      window.localStorage.setItem('portfolio-language', lang)
    } catch {
      // Keep the selected language for this session if storage is unavailable.
    }
  }, [lang, ui.htmlLang])

  useEffect(() => {
    if (activeProject) document.title = `${activeProject.title} — Zhuangwei Liu`
    else if (isCommercial) document.title = `${ui.commercialTitle} — Zhuangwei Liu`
    else document.title = `Zhuangwei Liu — ${ui.professionalTitle}`
  }, [activeProject, isCommercial, ui])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const commercialKeys = ['dunhuang', 'cap', 'ring', 'cat']

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!isCommercial || !commercialTarget) return
    const timer = window.setTimeout(() => {
      document.getElementById(`commercial-${commercialTarget}`)?.scrollIntoView({ behavior: 'auto' })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [isCommercial, commercialTarget])

  useEffect(() => {
    if (!isCommercial) return
    const sections = ['hunger', 'dunhuang', 'cap', 'ring', 'cat']
      .map((key) => document.getElementById(`commercial-${key}`))
      .filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveCommercial(visible.target.id.replace('commercial-', ''))
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .1, .3] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isCommercial])

  const pauseAutoplay = (duration = 10000) => {
    autoPauseUntil.current = Date.now() + duration
  }

  const goToShowcaseSlide = (index, animate = false) => {
    const nextIndex = Math.min(showcaseProjects.length, Math.max(0, index))
    if (animate) {
      clearTimeout(autoAnimationTimer.current)
      setAutoAnimating(true)
      autoAnimationTimer.current = setTimeout(() => setAutoAnimating(false), 1000)
    }
    setShowcaseIndex(nextIndex)
    setShowcasePosition(nextIndex)
  }

  const openHome = (target) => {
    if (window.location.hash) history.pushState(null, '', window.location.pathname)
    setRoute('')
    requestAnimationFrame(() => {
      if (typeof target === 'number') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        goToShowcaseSlide(target, true)
      }
      else if (target) document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo(0, 0)
    })
  }

  const openProject = (projectId) => {
    pauseAutoplay()
    window.location.hash = `/project/${projectId}`
  }

  const openCommercial = (projectId) => {
    const nextHash = projectId ? `#/commercial/${projectId}` : '#/commercial'
    if (window.location.hash === nextHash && projectId) {
      document.getElementById(`commercial-${projectId}`)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.location.hash = nextHash.slice(1)
  }

  useEffect(() => {
    if (activeProject || isCommercial) return
    const onUserIntent = () => pauseAutoplay()
    window.addEventListener('wheel', onUserIntent, { passive: true })
    window.addEventListener('touchstart', onUserIntent, { passive: true })
    window.addEventListener('pointerdown', onUserIntent, { passive: true })
    const interval = setInterval(() => {
      if (
        Date.now() < autoPauseUntil.current ||
        document.hidden ||
        !showcaseRef.current ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) return
      const rect = showcaseRef.current.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return
      const nextIndex = (showcaseIndex + 1) % (showcaseProjects.length + 1)
      goToShowcaseSlide(nextIndex, true)
    }, 6000)
    return () => {
      clearInterval(interval)
      clearTimeout(autoAnimationTimer.current)
      window.removeEventListener('wheel', onUserIntent)
      window.removeEventListener('touchstart', onUserIntent)
      window.removeEventListener('pointerdown', onUserIntent)
    }
  }, [activeProject, isCommercial, showcaseIndex, showcaseProjects.length])

  const handleShowcaseWheel = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 1) return
    event.preventDefault()
    pauseAutoplay()
    clearTimeout(autoAnimationTimer.current)
    setAutoAnimating(false)
    setShowcasePosition((current) => {
      const next = current + event.deltaX / Math.max(700, window.innerWidth)
      const lower = Math.max(0, showcaseIndex - 1)
      const upper = Math.min(showcaseProjects.length, showcaseIndex + 1)
      return Math.min(upper, Math.max(lower, next))
    })
    clearTimeout(wheelSnapTimer.current)
    wheelSnapTimer.current = setTimeout(() => {
      setShowcasePosition((current) => {
        const target = Math.min(showcaseProjects.length, Math.max(0, Math.round(current)))
        setShowcaseIndex(target)
        setAutoAnimating(true)
        clearTimeout(autoAnimationTimer.current)
        autoAnimationTimer.current = setTimeout(() => setAutoAnimating(false), 700)
        return target
      })
    }, 110)
  }

  const goToCommercialSlide = (index) => {
    const target = Math.min(commercialKeys.length, Math.max(0, index))
    setCommercialIndex(target)
    setCommercialPosition(target)
  }

  const handleCommercialWheel = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 1) return
    event.preventDefault()
    setCommercialPosition((current) => {
      const next = current + event.deltaX / Math.max(700, window.innerWidth)
      return Math.min(
        Math.min(commercialKeys.length, commercialIndex + 1),
        Math.max(Math.max(0, commercialIndex - 1), next),
      )
    })
    clearTimeout(commercialWheelSnapTimer.current)
    commercialWheelSnapTimer.current = setTimeout(() => {
      setCommercialPosition((current) => {
        const target = Math.min(commercialKeys.length, Math.max(0, Math.round(current)))
        setCommercialIndex(target)
        return target
      })
    }, 110)
  }

  const startDrag = (type, event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (event.target.closest('button')) return
    pauseAutoplay()
    dragState.current = {
      type,
      startX: event.clientX,
      startPosition: type === 'projects' ? showcasePosition : commercialPosition,
      currentPosition: type === 'projects' ? showcasePosition : commercialPosition,
      moved: false,
    }
  }

  const moveDrag = (type, event) => {
    if (dragState.current.type !== type) return
    const delta = (dragState.current.startX - event.clientX) / window.innerWidth
    if (Math.abs(delta) > .015) dragState.current.moved = true
    const max = type === 'projects' ? showcaseProjects.length : commercialKeys.length
    const position = Math.min(max, Math.max(0, dragState.current.startPosition + delta))
    dragState.current.currentPosition = position
    if (type === 'projects') {
      clearTimeout(autoAnimationTimer.current)
      setAutoAnimating(false)
      setShowcasePosition(position)
    } else setCommercialPosition(position)
  }

  const endDrag = (type) => {
    if (dragState.current.type !== type) return
    const position = dragState.current.currentPosition
    if (type === 'projects') goToShowcaseSlide(Math.round(position), true)
    else goToCommercialSlide(Math.round(position))
    dragState.current.type = null
    window.setTimeout(() => { dragState.current.moved = false }, 0)
  }

  const previousProject = activeProject ? t.projects[(activeProjectIndex - 1 + t.projects.length) % t.projects.length] : null
  const nextProject = activeProject ? t.projects[(activeProjectIndex + 1) % t.projects.length] : null

  return (
    <main className={`${lang !== 'en' ? 'cjk' : ''} lang-${lang} ${activeProject ? 'project-page' : isCommercial ? 'commercial-page' : 'home-page'}`}>
      <LineWaves />
      <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <button className="wordmark" onClick={() => openHome()} aria-label={ui.backHome}>
          ZL<span>®</span>
        </button>
        <nav className="nav__links" aria-label={ui.mainNavigation}>
          <button onClick={() => openHome('about')}>{t.nav[0]}</button>
          <button onClick={() => openHome(1)}>{t.nav[1]}</button>
          <button onClick={() => openHome('commercial-showcase')}>{t.nav[2]}</button>
        </nav>
        <div className="nav__actions">
          <div className="lang" aria-label={ui.language}>
            {languageOptions.map((option) => (
              <button
                className={lang === option.key ? 'active' : ''}
                key={option.key}
                onClick={() => setLang(option.key)}
                title={option.name}
                aria-label={option.name}
                aria-pressed={lang === option.key}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button className="contact-pill" onClick={() => activeProject || isCommercial ? openHome('contact') : jump('contact')}>
            {t.contact}<Arrow />
          </button>
        </div>
      </header>

      {activeProject ? (
        <>
          <section className="project-detail">
            <div className="case-study shell">
              <button className="back-link" onClick={() => openHome(activeProjectIndex + 1)}>← {ui.backProjects}</button>
              <div className="case-study__meta">
                <span>{activeProject.no} / 04</span>
                <span>{activeProject.type}</span>
                <span>{activeProject.year}</span>
              </div>
              <div className="case-study__intro">
                <div className="case-heading">
                  <ScrollReveal
                    as="h1"
                    lang={lang}
                    baseRotation={1.5}
                    blurStrength={6}
                    containerClassName="case-title-reveal"
                  >
                    {activeProject.title}
                  </ScrollReveal>
                  <p>{activeProject.subtitle}</p>
                </div>
                <div>
                  <ScrollReveal
                    as="p"
                    lang={lang}
                    baseOpacity={0.18}
                    baseRotation={0.8}
                    blurStrength={3}
                    containerClassName="case-copy-reveal"
                    wordAnimationEnd="bottom 72%"
                  >
                    {activeProject.statement}
                  </ScrollReveal>
                  <span>{activeProject.focus}</span>
                </div>
              </div>
              <div className="case-study__text">
                {activeProject.details?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {activeProject.videoId && (
                <section className="case-video" aria-label={`${activeProject.title} performance video`}>
                  <div className="case-video__head">
                    <span>{ui.gameDocumentation}</span>
                    <a href={`https://youtu.be/${activeProject.videoId}`} target="_blank" rel="noreferrer">
                      YouTube <Arrow />
                    </a>
                  </div>
                  <div className="case-video__frame">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeProject.videoId}?rel=0&modestbranding=1`}
                      title={`${activeProject.title} game documentation`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </section>
              )}
              <div className={`case-gallery ${activeProject.id === 'flow' ? 'case-gallery--flow' : ''}`}>
                {activeProject.media.map((image, index) => (
                  <figure className={`gallery-item gallery-item--${galleryLayout(activeProject.id, index)}`} key={image}>
                    <img
                      src={image}
                      alt={`${activeProject.title} final photography ${index + 1}`}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      decoding="async"
                    />
                  </figure>
                ))}
              </div>
            </div>
            <nav className="project-detail__next shell" aria-label="Project navigation">
              <button onClick={() => openProject(previousProject.id)}>
                <small>{ui.previousProject}</small>
                <strong>← {previousProject.title}</strong>
              </button>
              <button onClick={() => openProject(nextProject.id)}>
                <small>{ui.nextProject}</small>
                <strong>{nextProject.title} →</strong>
              </button>
            </nav>
          </section>
          <footer className="project-footer shell">
            <span>{t.copyright}</span>
            <a href={`mailto:${t.email}`}>{t.email}<Arrow /></a>
          </footer>
        </>
      ) : isCommercial ? (
        <>
          <section className="commercial-page__hero shell">
            <button className="back-link" onClick={() => openHome()}>← {ui.backHome}</button>
            <div className="section-label">{t.commercialLabel}</div>
            <div className="commercial-page__heading">
              <ScrollReveal as="h1" lang={lang} baseRotation={1.4} blurStrength={5}>
                {t.commercialTitle.join(' ')}
              </ScrollReveal>
              <p>{t.commercialIntro}</p>
            </div>
          </section>

          <nav className="commercial-index shell" aria-label={ui.commercialIndex}>
            {[
              ['hunger', 'Of Hunger'],
              ['dunhuang', 'Dunhuang'],
              ['cap', 'Wear for Fun'],
              ['ring', 'BJ Star Ring'],
              ['cat', 'Black Cat'],
            ].map(([key, label], index) => (
              <a
                className={activeCommercial === key ? 'active' : ''}
                key={key}
                href={`#/commercial/${key}`}
              >
                <span>0{index + 1}</span>{label}
              </a>
            ))}
          </nav>

          <section className="commercial-cases shell">
            <article className="commercial-case commercial-case--hunger" id="commercial-hunger">
              <div className="commercial-case__intro">
                <span>01 / WEARABLE TECHNOLOGY</span>
                <ScrollReveal as="h2" lang={lang} baseRotation={1} blurStrength={4}>
                  {t.commercial.hunger.title}
                </ScrollReveal>
                <small>{t.commercial.hunger.type} · {t.commercial.hunger.year}</small>
                <p>{t.commercial.hunger.body}</p>
              </div>
              <div className="hunger-editorial">
                <div className="hunger-editorial__heroes">
                  <figure><img src={commercialMedia.hunger[1]} alt="Of Hunger Grey Zircon campaign with logo" loading="lazy" /></figure>
                  <figure><img src={commercialMedia.hunger[6]} alt="Of Hunger Tiger’s Eye campaign with logo" loading="lazy" /></figure>
                </div>
                <div className="hunger-editorial__pairs">
                  {[[0, 5], [2, 7], [3, 8], [4, 9]].map((pair, index) => (
                    <div className="hunger-editorial__pair" key={pair.join('-')}>
                      <span>0{index + 1} / GREY ZIRCON — TIGER’S EYE</span>
                      <figure><img src={commercialMedia.hunger[pair[0]]} alt={`Grey Zircon comparison ${index + 1}`} loading="lazy" /></figure>
                      <figure><img src={commercialMedia.hunger[pair[1]]} alt={`Tiger’s Eye comparison ${index + 1}`} loading="lazy" /></figure>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="commercial-case" id="commercial-dunhuang">
              <div className="commercial-case__intro">
                <span>02 / BRAND COLLABORATION</span>
                <ScrollReveal as="h2" lang={lang} baseRotation={1} blurStrength={4}>
                  {t.commercial.dunhuang.title}
                </ScrollReveal>
                <small>{t.commercial.dunhuang.type} · {t.commercial.dunhuang.year}</small>
                <p>{t.commercial.dunhuang.body}</p>
              </div>
              <div className="commercial-gallery commercial-gallery--dunhuang">
                {commercialMedia.dunhuang.map((image, index) => (
                  <figure key={image} className={index === 0 || index === 5 ? 'commercial-gallery__wide' : ''}>
                    <img src={image} alt={`${t.commercial.dunhuang.title} ${index + 1}`} loading="lazy" />
                  </figure>
                ))}
              </div>
            </article>

            {[
              ['cap', '03 / ACCESSORY', commercialMedia.cap],
              ['ring', '04 / JEWELRY', commercialMedia.ring],
              ['cat', '05 / JEWELRY', commercialMedia.cat],
            ].map(([key, number, media]) => {
              const item = t.commercial[key]
              return (
                <article className={`commercial-case commercial-case--${key}`} id={`commercial-${key}`} key={key}>
                  <div className="commercial-case__intro">
                    <span>{number}</span>
                    <ScrollReveal as="h2" lang={lang} baseRotation={.8} blurStrength={3}>
                      {item.title}
                    </ScrollReveal>
                    <small>{item.type} · {item.year}</small>
                    <p>{item.body}</p>
                  </div>
                  <div className={`commercial-gallery commercial-gallery--${key}`}>
                    {media.map((image, index) => (
                      <figure key={image}>
                        <img src={image} alt={`${item.title} ${index + 1}`} loading="lazy" />
                      </figure>
                    ))}
                  </div>
                </article>
              )
            })}

          </section>

          <footer className="commercial-footer shell" id="commercial-contact">
            <p>{t.endSmall}</p>
            <a href={`mailto:${t.email}`}>{t.email}<Arrow /></a>
            <span>{t.copyright}</span>
          </footer>
        </>
      ) : (
      <>
      <section
        className="showcase-scroll"
        id="top"
        ref={showcaseRef}
        onWheel={handleShowcaseWheel}
        onClick={(event) => {
          if (event.target.closest('button')) return
          event.preventDefault()
          if (dragState.current.moved) return
          pauseAutoplay()
          const project = showcaseIndex === 0 ? heroProject : showcaseProjects[showcaseIndex - 1]
          if (project) window.location.hash = `/project/${project.id}`
        }}
        onPointerDown={(event) => startDrag('projects', event)}
        onPointerMove={(event) => moveDrag('projects', event)}
        onPointerUp={() => endDrag('projects')}
        onPointerCancel={() => endDrag('projects')}
      >
        <div className="showcase-scroll__sticky">
          <div
            className={`showcase-track ${autoAnimating ? 'is-animating' : ''}`}
            style={{
              width: `${(showcaseProjects.length + 1) * 100}vw`,
              transform: `translate3d(-${showcasePosition * 100}vw, 0, 0)`,
            }}
          >
            <a
              className="hero showcase-panel"
              href={`#/project/${heroProject.id}`}
              aria-label={`${t.view}: ${heroProject.title}`}
              draggable="false"
            >
              <video className="hero__video" autoPlay muted loop playsInline poster="/assets/hero-still.jpg">
                <source src="/assets/hero-film.mp4" type="video/mp4" />
              </video>
              <div className="hero__motion" />
              <div className="hero__veil" />
              <div className="hero__content shell">
                <p className="kicker">{heroProject.type} · {heroProject.year}</p>
                <h1>{heroProject.title}</h1>
                <p className="hero__project-subtitle">{heroProject.subtitle}</p>
              </div>
              <div className="hero__foot shell">
                <span>{t.scroll}</span>
                <span className="scroll-line" />
                <span>ZHUANGWEI LIU / 2026</span>
              </div>
            </a>

            {showcaseProjects.map((project) => (
              <a
                className={`project-slide project-slide--${project.id} showcase-panel`}
                key={project.no}
                href={`#/project/${project.id}`}
                aria-label={`${t.view}: ${project.title}`}
                draggable="false"
              >
                <div className="project-slide__frame">
                  <img src={project.cover} alt={`${project.title} final work`} decoding="async" />
                  <div className="project__shade" />
                  <div className="project__top">
                    <span>{project.no} / 04</span>
                    <span>{project.type} · {project.year}</span>
                  </div>
                  <div className="project__bottom">
                    <div className="project__title">
                      <h3>{project.title}</h3>
                      <p>{project.subtitle}</p>
                    </div>
                    <span className="project__link">{t.view}<Arrow /></span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <button
            className="showcase-arrow showcase-arrow--left"
            onClick={() => { pauseAutoplay(); goToShowcaseSlide(showcaseIndex - 1, true) }}
            disabled={showcaseIndex === 0}
            aria-label={ui.previousSlide}
          >←</button>
          <button
            className="showcase-arrow showcase-arrow--right"
            onClick={() => { pauseAutoplay(); goToShowcaseSlide(showcaseIndex + 1, true) }}
            disabled={showcaseIndex === showcaseProjects.length}
            aria-label={ui.nextSlide}
          >→</button>

          <div className="project-scroll__ui shell">
            <div className="project-scroll__count">
              <strong>{`0${showcaseIndex + 1}`}</strong>
              <span>/ 04</span>
            </div>
            <div className="project-scroll__dots" aria-label="Showcase slides">
              <button
                className={showcaseIndex === 0 ? 'active' : ''}
                onClick={() => { pauseAutoplay(); goToShowcaseSlide(0, true) }}
                aria-label={`Go to ${heroProject.title}`}
              ><i /></button>
              {showcaseProjects.map((project, index) => (
                <button
                  key={project.id}
                  className={showcaseIndex === index + 1 ? 'active' : ''}
                  onClick={() => { pauseAutoplay(); goToShowcaseSlide(index + 1, true) }}
                  aria-label={`Go to ${project.title}`}
                ><i /></button>
              ))}
            </div>
            <span className="project-scroll__hint">
              {ui.explore}
            </span>
          </div>
        </div>
      </section>

      <section
        className="commercial-showcase"
        id="commercial-showcase"
        onWheel={handleCommercialWheel}
        onClick={(event) => {
          if (event.target.closest('button')) return
          event.preventDefault()
          if (dragState.current.moved) return
          const key = commercialIndex === 0 ? 'hunger' : commercialKeys[commercialIndex - 1]
          window.location.hash = `/commercial/${key}`
        }}
        onPointerDown={(event) => startDrag('commercial', event)}
        onPointerMove={(event) => moveDrag('commercial', event)}
        onPointerUp={() => endDrag('commercial')}
        onPointerCancel={() => endDrag('commercial')}
      >
        <div
          className="commercial-showcase__track"
          style={{ transform: `translate3d(-${commercialPosition * 100}vw, 0, 0)` }}
        >
          <a
            className="commercial-intro showcase-panel"
            href="#/commercial/hunger"
            aria-label={`${ui.viewProject}: ${t.commercial.hunger.title}`}
            draggable="false"
          >
            <img
              className="commercial-intro__image"
              src="/assets/commercial/of-hunger-gray/EN3_c73a1336-fbdd-4dde-a571-0451af475a90.webp"
              alt="Of Hunger Grey Zircon earphones worn by model"
              decoding="async"
            />
            <div className="commercial-intro__veil" />
            <div className="shell commercial-intro__inner">
              <div className="section-label">{t.commercialLabel} · 01 / 05 · {t.commercial.hunger.year}</div>
              <div className="commercial-intro__title">
                <h2>{t.commercial.hunger.title}</h2>
                <p>{t.commercial.hunger.subtitle}</p>
              </div>
              <div className="commercial-intro__foot">
                <p>{t.commercialIntro}</p>
                <span className="commercial-intro__link">
                  {ui.viewHunger}<Arrow />
                </span>
              </div>
            </div>
          </a>

          {commercialKeys.map((key, index) => {
            const item = t.commercial[key]
            return (
              <a
                className={`commercial-slide commercial-slide--${key} showcase-panel`}
                key={key}
                href={`#/commercial/${key}`}
                draggable="false"
              >
                <div className="commercial-slide__frame">
                  <img src={commercialShowcaseCovers[key]} alt={item.title} loading="lazy" decoding="async" />
                  <div className="project__shade" />
                  <div className="project__top">
                    <span>0{index + 2} / 05</span>
                    <span>{item.type} · {item.year}</span>
                  </div>
                  <div className="project__bottom">
                    <div className="project__title">
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                    <span className="project__link">
                      {ui.viewCommercial}<Arrow />
                    </span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
        <button
          className="showcase-arrow showcase-arrow--left"
          onClick={() => goToCommercialSlide(commercialIndex - 1)}
          disabled={commercialIndex === 0}
          aria-label={ui.previousSlide}
        >←</button>
        <button
          className="showcase-arrow showcase-arrow--right"
          onClick={() => goToCommercialSlide(commercialIndex + 1)}
          disabled={commercialIndex === commercialKeys.length}
          aria-label={ui.nextSlide}
        >→</button>
        <div className="commercial-showcase__ui shell">
          <span>{commercialIndex === 0 ? '01 / 05' : `0${commercialIndex + 1} / 05`}</span>
          <div className="project-scroll__dots">
            {Array.from({ length: commercialKeys.length + 1 }, (_, index) => (
              <button
                key={index}
                className={commercialIndex === index ? 'active' : ''}
                onClick={() => goToCommercialSlide(index)}
                aria-label={`Go to commercial slide ${index + 1}`}
              ><i /></button>
            ))}
          </div>
        </div>
      </section>

      <section className="about shell section" id="about">
        <div className="section-label">{t.aboutLabel}</div>
        <div className="about__intro">
          <ScrollReveal
            as="h2"
            lang={lang}
            baseRotation={2}
            blurStrength={6}
            containerClassName="about-title-reveal"
          >
            {t.aboutTitle}
          </ScrollReveal>
          <div className="about__copy">
            <span className="availability"><i />{t.based}</span>
          </div>
        </div>

        <div className="profile-grid">
          <figure className="portrait">
            <img src="/assets/profile-zhuangwei.png" alt="Portrait of Zhuangwei Liu" loading="lazy" decoding="async" />
            <figcaption>ZHUANGWEI LIU / PORTRAIT</figcaption>
          </figure>
          <div className="profile-narrative">
            <div className="profile-statement">
              <p>{t.aboutBody}</p>
              <p>{t.aboutSecond}</p>
            </div>
            <div className="experience">
              <div className="experience__head">
                <span>{t.experience}</span>
                <span>CV / 01—04</span>
              </div>
              {t.exp.map((item, i) => (
                <div className="experience__row" key={item[0]}>
                  <span>0{i + 1}</span>
                  <strong>{item[0]}<small>{item[1]}</small></strong>
                  <time>{item[2]}</time>
                </div>
              ))}
            </div>
            <section className="autobiography">
              <div className="autobiography__label">
                <span>{ui.personalStatement}</span>
                <span>01—07</span>
              </div>
              <ScrollReveal as="h3" lang={lang} baseRotation={1} blurStrength={4}>
                {t.autobiographyTitle}
              </ScrollReveal>
              <div className="autobiography__body">
                {t.autobiography.map((paragraph, index) => (
                  <p key={paragraph}><sup>0{index + 1}</sup>{paragraph}</p>
                ))}
              </div>
            </section>
            <div className="profile-contact" id="contact">
              <div>
                <span>{t.endSmall}</span>
                <strong>{ui.getInTouch}</strong>
              </div>
              <div className="profile-contact__links">
                <a href={`mailto:${t.email}`}>{t.email}<Arrow /></a>
                <a href={`https://www.instagram.com/${t.instagram}/`} target="_blank" rel="noreferrer">
                  Instagram / @{t.instagram}<Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-footer">
          <span>{t.copyright}</span>
          <button onClick={() => jump('top')}>BACK TO TOP ↑</button>
        </div>
      </section>
      </>
      )}
    </main>
  )
}

export default App
