export const CAMPUS_BUILDINGS = [
  {
    id: 'b-a2',
    name: 'Tòa A2 - Phòng 305 (Khoa CNTT)',
    nameJa: 'A2棟 305教室（情報工学科）',
    shortName: 'A2 - P.305',
    coordinates: { x: 48, y: 35 },
    category: 'Giảng đường chính'
  },
  {
    id: 'b-b1',
    name: 'Tòa B1 - Phòng 204 (Ngoại ngữ)',
    nameJa: 'B1棟 204教室（外国語棟）',
    shortName: 'B1 - P.204',
    coordinates: { x: 65, y: 50 },
    category: 'Giảng đường B'
  },
  {
    id: 'b-c7',
    name: 'Tòa C7 - Hội trường lớn',
    nameJa: 'C7棟 大講堂',
    shortName: 'C7 - Hội trường',
    coordinates: { x: 30, y: 60 },
    category: 'Hội trường'
  },
  {
    id: 'b-d3',
    name: 'Tòa D3 - Lab thực hành 402',
    nameJa: 'D3棟 402実習室',
    shortName: 'D3 - P.402',
    coordinates: { x: 55, y: 75 },
    category: 'Phòng thực hành'
  }
];

export const INITIAL_PARKING_LOTS = [
  {
    id: 'lot-a',
    code: 'PA-01',
    name: 'Nhà xe A (Khu Nhà Điều Hành / Giảng đường A2)',
    nameJa: '第1駐輪場 A（本部棟・A2棟前）',
    shortName: 'Nhà xe A',
    status: 'red', // red | yellow | green
    capacity: 150,
    availableSpots: 0,
    queueCount: 16,
    avgWaitTimeMin: 9,
    coordinates: { x: 42, y: 28 },
    type: 'Xe máy & Xe đạp điện',
    typeJa: 'バイク・電動自転車',
    coverType: 'Có mái che kiên cố',
    isOfficial: true,
    priceNote: 'Vé tháng SV / 2.000đ',
    lastUpdated: '1 phút trước',
    crowdLevelDescription: 'Đang ùn tắc nghiêm trọng giờ giao ca, hàng đợi dài ra tận lối đi chính.',
    crowdLevelDescriptionJa: '授業交代時間で激しい混雑中。入場待ちの列が通路まで続いています。',
    walkingInfo: {
      'b-a2': {
        walkMinutes: 2,
        distanceM: 140,
        parkingTimeMin: 9,
        steps: [
          'Ra khỏi cổng soát vé Nhà xe A, đi thẳng về hướng Tây 50m.',
          'Rẽ phải vào sảnh chính Tòa nhà A2.',
          'Đi cầu thang bộ số 1 (cạnh thang máy trung tâm) lên Tầng 3.',
          'Rẽ trái theo hành lang 20m, phòng 305 nằm ở phía bên phải.'
        ],
        stepsJa: [
          'A駐輪場の改札を出て、西方向へ50m直進します。',
          '右折してA2棟のメインエントランスに入ります。',
          '中央エレベーター横の階段1で3階へ上がります。',
          '廊下を左へ20m進むと、右手に305教室があります。'
        ]
      },
      'b-b1': {
        walkMinutes: 6,
        distanceM: 420,
        parkingTimeMin: 9,
        steps: [
          'Từ Nhà xe A rẽ trái qua khuôn viên vườn hoa trung tâm (200m).',
          'Đi qua cổng vòm nối sang Tòa B1.',
          'Lên cầu thang Đông tầng 2, phòng 204 ngay sảnh.'
        ],
        stepsJa: [
          'A駐輪場から左折し、中央花壇を通過（200m）。',
          'B1棟への連絡通路を通ります。',
          '東階段で2階へ上がると、正面が204教室です。'
        ]
      },
      'b-c7': {
        walkMinutes: 7,
        distanceM: 510,
        parkingTimeMin: 9,
        steps: [
          'Rẽ phải đi theo trục đường hoa bằng lăng 300m hướng về Tòa C7.',
          'Vào sảnh tầng 1 Hội trường lớn C7.'
        ],
        stepsJa: [
          '右折して並木道をC7棟方面へ300m直進。',
          'C7大講堂の1階エントランスに入ります。'
        ]
      },
      'b-d3': {
        walkMinutes: 8,
        distanceM: 580,
        parkingTimeMin: 9,
        steps: [
          'Đi dọc đường bao phía Bắc 400m tới khu thực nghiệm D3.',
          'Đi thang máy B lên tầng 4, rẽ phải đến phòng 402.'
        ],
        stepsJa: [
          '北側周回路を400m進みD3実験棟へ。',
          'エレベーターBで4階へ上がり、右手が402室です。'
        ]
      }
    }
  },
  {
    id: 'lot-c',
    code: 'PC-03',
    name: 'Nhà xe C (Cổng Phụ Ký Túc Xá - Đề xuất tối ưu)',
    nameJa: '第3駐輪場 C（寮側ゲート・おすすめ代替）',
    shortName: 'Nhà xe C (Gợi ý tối ưu)',
    status: 'green',
    capacity: 160,
    availableSpots: 64,
    queueCount: 0,
    avgWaitTimeMin: 1,
    coordinates: { x: 32, y: 45 },
    type: 'Mọi loại xe (Máy, Điện, Đạp)',
    typeJa: '全車種（バイク・自転車）',
    coverType: 'Có mái che râm mát',
    isOfficial: true,
    priceNote: 'Vé tháng SV / Quét mã QR',
    lastUpdated: 'Vừa xong',
    crowdLevelDescription: 'Rất thông thoáng, vào gửi xe ngay không cần chờ, có bảo vệ hỗ trợ xếp xe.',
    crowdLevelDescriptionJa: '空き多数・待ち時間なし。誘導員がスムーズに案内しています。',
    isRecommendedAlternative: true,
    timeSavedMin: 8,
    walkingInfo: {
      'b-a2': {
        walkMinutes: 4,
        distanceM: 270,
        parkingTimeMin: 1,
        steps: [
          'Rời Nhà xe C qua lối ra số 2 (hướng thẳng sang Tòa A2).',
          'Đi bộ theo vỉa hè rợp bóng cây 150m đến cửa Nam Tòa A2.',
          'Vào cửa Nam, đi cầu thang bộ phía Tây lên Tầng 3.',
          'Rẽ phải 15m là đến ngay cửa Phòng 305. Rất thong thả!'
        ],
        stepsJa: [
          'C駐輪場の第2出口（A2棟正面口）から出ます。',
          '並木道の歩道を150m直進してA2棟南口へ。',
          '南口から入り、西階段で3階へ上がります。',
          '右折して15mで305教室に到着。時間に余裕を持って着けます！'
        ]
      },
      'b-b1': {
        walkMinutes: 5,
        distanceM: 350,
        parkingTimeMin: 1,
        steps: [
          'Từ Nhà xe C đi thẳng qua sân bóng rổ sang Tòa B1 (200m).',
          'Lên cầu thang tầng 2 -> Phòng 204.'
        ],
        stepsJa: [
          'C駐輪場からバスケットコートを横切りB1棟へ（200m）。',
          '階段で2階へ上がり204室へ。'
        ]
      },
      'b-c7': {
        walkMinutes: 3,
        distanceM: 190,
        parkingTimeMin: 1,
        steps: [
          'Nhà xe C cách Hội trường C7 chỉ 190m đi bộ thẳng.',
          'Vào thẳng sảnh chính C7.'
        ],
        stepsJa: [
          'C駐輪場からC7講堂までわずか190mの直進ルート。',
          '正面玄関からそのまま入場できます。'
        ]
      },
      'b-d3': {
        walkMinutes: 6,
        distanceM: 400,
        parkingTimeMin: 1,
        steps: [
          'Đi bộ về phía Nam qua khu căn tin sinh viên sang Tòa D3.',
          'Thang máy trục chính lên Tầng 4.'
        ],
        stepsJa: [
          '学食エリアを抜けて南側のD3棟へ。',
          '中央エレベーターで4階へ。'
        ]
      }
    }
  },
  {
    id: 'lot-b',
    code: 'PB-02',
    name: 'Nhà xe B (Sau Giảng Đường D3 / Giữa Campus)',
    nameJa: '第2駐輪場 B（D3講義棟裏・キャンパス中央）',
    shortName: 'Nhà xe B',
    status: 'yellow',
    capacity: 120,
    availableSpots: 14,
    queueCount: 3,
    avgWaitTimeMin: 3,
    coordinates: { x: 62, y: 68 },
    type: 'Xe máy',
    typeJa: 'バイク専用',
    coverType: 'Có mái che một phần',
    isOfficial: true,
    priceNote: 'Vé tháng SV',
    lastUpdated: '3 phút trước',
    crowdLevelDescription: 'Bắt đầu đông, còn khoảng hơn chục chỗ ở dãy cuối, xếp hàng khoảng 2-3 xe.',
    crowdLevelDescriptionJa: '混雑気味。奥のレーンに10台程度の空きあり。待ち列2〜3台。',
    walkingInfo: {
      'b-a2': {
        walkMinutes: 5,
        distanceM: 360,
        parkingTimeMin: 3,
        steps: [
          'Rời Nhà xe B theo lối đi giữa D3 và thư viện.',
          'Băng qua quảng trường sao trung tâm đến Tòa A2.',
          'Lên cầu thang Đông tầng 3 tới phòng 305.'
        ],
        stepsJa: [
          'B駐輪場を出てD3と図書館の間の道を進みます。',
          '中央広場を横切ってA2棟へ。',
          '東階段で3階へ上がり305教室へ。'
        ]
      },
      'b-b1': {
        walkMinutes: 3,
        distanceM: 210,
        parkingTimeMin: 3,
        steps: [
          'Đi thẳng theo hành lang có mái che sang Tòa B1.',
          'Lên tầng 2 đến phòng 204.'
        ],
        stepsJa: [
          '屋根付き通路を直進してB1棟へ。',
          '2階へ上がり204室へ。'
        ]
      },
      'b-c7': {
        walkMinutes: 6,
        distanceM: 430,
        parkingTimeMin: 3,
        steps: ['Đi ngược về phía Tây Bắc qua sân bóng tới C7.'],
        stepsJa: ['グラウンドを横切り北西のC7へ進みます。']
      },
      'b-d3': {
        walkMinutes: 1,
        distanceM: 80,
        parkingTimeMin: 3,
        steps: ['Ngay sát chân tòa D3, bước vào sảnh và lên tầng 4.'],
        stepsJa: ['D3棟の真裏。エントランスからエレベーターで4階へ。']
      }
    }
  },
  {
    id: 'lot-d',
    code: 'PD-04',
    name: 'Nhà xe D (Khu Thể Thao / Sân Vận Động)',
    nameJa: '第4駐輪場 D（総合体育館・グラウンド前）',
    shortName: 'Nhà xe D',
    status: 'green',
    capacity: 200,
    availableSpots: 112,
    queueCount: 0,
    avgWaitTimeMin: 1,
    coordinates: { x: 20, y: 72 },
    type: 'Xe đạp, Xe điện, Xe máy',
    typeJa: '全車種対応（大型スペースあり）',
    coverType: 'Mái vòm rộng rãi',
    isOfficial: true,
    priceNote: 'Vé lượt 2.000đ / Vé tháng',
    lastUpdated: '4 phút trước',
    crowdLevelDescription: 'Rộng rãi mênh mông, hơn 100 chỗ trống, lối vào cực kỳ thông thoáng.',
    crowdLevelDescriptionJa: '広大なスペースで100台以上の空き。スムーズに入場可能。',
    timeSavedMin: 6,
    walkingInfo: {
      'b-a2': {
        walkMinutes: 6,
        distanceM: 450,
        parkingTimeMin: 1,
        steps: [
          'Rời Nhà xe D theo đại lộ Thể thao hướng về trung tâm.',
          'Rẽ trái vào cổng sau Tòa A2.',
          'Đi cầu thang phụ lên tầng 3 đến phòng 305.'
        ],
        stepsJa: [
          'D駐輪場からスポーツ通りを中央方面へ。',
          '左折してA2棟の裏口から入場。',
          '非常階段で3階へ上がり305教室へ。'
        ]
      },
      'b-b1': {
        walkMinutes: 7,
        distanceM: 520,
        parkingTimeMin: 1,
        steps: ['Băng qua sân vận động sang Tòa B1.'],
        stepsJa: ['スタジアム横を通ってB1棟へ。']
      },
      'b-c7': {
        walkMinutes: 4,
        distanceM: 260,
        parkingTimeMin: 1,
        steps: ['Đi bộ thẳng theo đường nội bộ Tây sang C7.'],
        stepsJa: ['西側連絡路を直進してC7へ。']
      },
      'b-d3': {
        walkMinutes: 7,
        distanceM: 490,
        parkingTimeMin: 1,
        steps: ['Đi qua khu ký túc xá về hướng Đông sang D3.'],
        stepsJa: ['寮エリアを抜けて東側のD3へ。']
      }
    }
  },
  {
    id: 'lot-e',
    code: 'PE-05',
    name: 'Bãi Xe Phụ Ngoại Viện (Cổng Vành Đai)',
    nameJa: '学外提携パーキング E（環状道路ゲート前）',
    shortName: 'Bãi Ngoại Viện E',
    status: 'green',
    capacity: 90,
    availableSpots: 48,
    queueCount: 0,
    avgWaitTimeMin: 1,
    coordinates: { x: 75, y: 25 },
    type: 'Xe máy',
    typeJa: 'バイク専用',
    coverType: 'Có mái che & camera giám sát',
    isOfficial: false,
    priceNote: 'Hỗ trợ sinh viên 3.000đ/lượt',
    lastUpdated: '6 phút trước',
    crowdLevelDescription: 'Bãi liên kết mở rộng trong giờ cao điểm, có nhân viên dắt xe tận nơi.',
    crowdLevelDescriptionJa: 'ピーク時開放の提携駐車場。スタッフの手押し誘導サポートあり。',
    timeSavedMin: 5,
    walkingInfo: {
      'b-a2': {
        walkMinutes: 5,
        distanceM: 380,
        parkingTimeMin: 1,
        steps: [
          'Vào cổng vành đai phía Đông trường.',
          'Đi bộ theo hàng cây thẳng tới Tòa A2.',
          'Lên tầng 3 vào phòng 305.'
        ],
        stepsJa: [
          '東側の環状ゲートから構内へ入場。',
          '並木道を進んでA2棟へ。',
          '3階へ上がり305室へ。'
        ]
      },
      'b-b1': {
        walkMinutes: 4,
        distanceM: 290,
        parkingTimeMin: 1,
        steps: ['Rẽ trái theo đường đông sang B1.'],
        stepsJa: ['左折して東通りからB1へ。']
      },
      'b-c7': {
        walkMinutes: 9,
        distanceM: 650,
        parkingTimeMin: 1,
        steps: ['Đi qua toàn bộ trục đường chính sang C7.'],
        stepsJa: ['メインストリートを横断してC7へ。']
      },
      'b-d3': {
        walkMinutes: 6,
        distanceM: 440,
        parkingTimeMin: 1,
        steps: ['Đi thẳng xuống hướng Nam tới D3.'],
        stepsJa: ['南方面へ直進してD3へ。']
      }
    }
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    lotId: 'lot-a',
    author: 'Tuấn Minh (K65 - IT)',
    timeAgo: '2 phút trước',
    status: 'red',
    text: 'Nhà xe A đang kẹt cứng lối vào, bảo vệ đang yêu cầu chuyển sang Nhà xe C hoặc D!',
    textJa: 'A駐輪場の入口が完全に詰まっています。警備員がCやDへ迂回するよう指示しています！',
    upvotes: 14
  },
  {
    id: 'rep-2',
    lotId: 'lot-c',
    author: 'Hương Giang (K66 - Ngoại ngữ)',
    timeAgo: '4 phút trước',
    status: 'green',
    text: 'Nhà xe C còn rất nhiều chỗ ở dãy C3-C4, đường đi bộ qua A2 chỉ mất 3-4 phút, khuyên các bạn nên qua đây!',
    textJa: 'C駐輪場はC3〜C4列にまだまだ空きがあります。A2棟まで徒歩3〜4分なのでこちらがおすすめ！',
    upvotes: 21
  },
  {
    id: 'rep-3',
    lotId: 'lot-b',
    author: 'Quang Huy (K64 - Cơ khí)',
    timeAgo: '7 phút trước',
    status: 'yellow',
    text: 'Nhà xe B sắp hết chỗ, lối vào đang có 3 xe đợi, chỉ còn vài chỗ cho xe số nhỏ.',
    textJa: 'B駐輪場はもうすぐ満車になりそう。3台待ち、小型車用のスペースが少しだけ。',
    upvotes: 8
  }
];

export const QUICK_REPORT_OPTIONS = [
  {
    id: 'green',
    label: 'Còn nhiều chỗ',
    labelJa: '空き多数 (余裕あり)',
    color: 'emerald',
    subtext: 'Nhiều chỗ trống, vào là có chỗ ngay',
    subtextJa: '待ち時間なしで駐輪可能'
  },
  {
    id: 'yellow',
    label: 'Còn ít chỗ / Bắt đầu đông',
    labelJa: '混雑気味 (空きわずか)',
    color: 'amber',
    subtext: 'Phải tìm dãy trong hoặc xếp hàng 2-3 xe',
    subtextJa: '奥の列を探す必要あり・小列あり'
  },
  {
    id: 'red_full',
    label: 'Đã hết chỗ (Đầy 100%)',
    labelJa: '満車 (進入不可)',
    color: 'rose',
    subtext: 'Bảo vệ chặn cổng hoặc không còn chỗ đỗ',
    subtextJa: '満車のため駐車スペースなし'
  },
  {
    id: 'red_jam',
    label: 'Đang ùn ứ / Xếp hàng dài',
    labelJa: '激しい渋滞・長蛇の列',
    color: 'red',
    subtext: 'Kẹt cứng lối vào, chờ trên 5-10 phút',
    subtextJa: '入口で5〜10分以上の待機時間'
  }
];

