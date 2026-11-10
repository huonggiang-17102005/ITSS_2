import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initial seed data based on ITSS images
const SEED_DATA = {
  buildings: [
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
  ],
  parkingLots: [
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
          ]
        },
        'b-c7': { walkMinutes: 7, distanceM: 510, parkingTimeMin: 9 },
        'b-d3': { walkMinutes: 8, distanceM: 580, parkingTimeMin: 9 }
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
        'b-b1': { walkMinutes: 5, distanceM: 350, parkingTimeMin: 1 },
        'b-c7': { walkMinutes: 3, distanceM: 190, parkingTimeMin: 1 },
        'b-d3': { walkMinutes: 6, distanceM: 400, parkingTimeMin: 1 }
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
          ]
        },
        'b-b1': { walkMinutes: 3, distanceM: 210, parkingTimeMin: 3 },
        'b-c7': { walkMinutes: 6, distanceM: 430, parkingTimeMin: 3 },
        'b-d3': { walkMinutes: 1, distanceM: 80, parkingTimeMin: 3 }
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
          ]
        },
        'b-b1': { walkMinutes: 7, distanceM: 520, parkingTimeMin: 1 },
        'b-c7': { walkMinutes: 4, distanceM: 260, parkingTimeMin: 1 },
        'b-d3': { walkMinutes: 7, distanceM: 490, parkingTimeMin: 1 }
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
          ]
        },
        'b-b1': { walkMinutes: 4, distanceM: 290, parkingTimeMin: 1 },
        'b-c7': { walkMinutes: 9, distanceM: 650, parkingTimeMin: 1 },
        'b-d3': { walkMinutes: 6, distanceM: 440, parkingTimeMin: 1 }
      }
    }
  ],
  reports: [
    {
      id: 'rep-1',
      lotId: 'lot-a',
      author: 'Tuấn Minh (K65 - IT)',
      timeAgo: '2 phút trước',
      status: 'red',
      text: 'Nhà xe A đang kẹt cứng lối vào, bảo vệ đang yêu cầu chuyển sang Nhà xe C hoặc D!',
      textJa: 'A駐輪場の入口が完全に詰まっています。警備員がCやDへ迂回するよう指示しています！',
      createdAt: Date.now() - 2 * 60 * 1000,
      expiresAt: Date.now() + 8 * 60 * 1000, // 10 mins lifetime
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
      createdAt: Date.now() - 4 * 60 * 1000,
      expiresAt: Date.now() + 6 * 60 * 1000,
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
      createdAt: Date.now() - 7 * 60 * 1000,
      expiresAt: Date.now() + 3 * 60 * 1000,
      upvotes: 8
    }
  ]
};

// In-memory store
let db = null;

export function initDB() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(content);
    } catch (e) {
      console.warn('Failed to parse db.json, using seed data:', e);
      db = JSON.parse(JSON.stringify(SEED_DATA));
      saveDB();
    }
  } else {
    db = JSON.parse(JSON.stringify(SEED_DATA));
    saveDB();
  }

  return db;
}

export function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save DB file:', err);
  }
}

export function getDB() {
  if (!db) initDB();
  return db;
}

// Check & purge expired reports periodically (10 minutes lifetime)
export function purgeExpiredReports() {
  if (!db) return;
  const now = Date.now();
  const beforeCount = db.reports.length;
  db.reports = db.reports.filter(r => r.expiresAt > now);
  if (db.reports.length !== beforeCount) {
    saveDB();
  }
}
