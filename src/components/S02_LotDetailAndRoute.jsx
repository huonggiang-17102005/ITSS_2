import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Footprints, 
  Clock, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  Navigation, 
  Building, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  Flame,
  Volume2
} from 'lucide-react';

export default function S02_LotDetailAndRoute({ 
  lot, 
  selectedBuilding, 
  onBackToOverview, 
  onGoToReport, 
  onConfirmArrival, 
  lang 
}) {
  const isVi = lang === 'vi';
  const [completedSteps, setCompletedSteps] = useState([0]);

  if (!lot) return null;

  const walking = lot.walkingInfo?.[selectedBuilding.id] || {
    walkMinutes: 4,
    distanceM: 270,
    parkingTimeMin: 2,
    steps: [
      'Rời cổng nhà xe, rẽ phải theo đường nội bộ.',
      'Đi bộ 100m vào sảnh chính tòa nhà.',
      'Lên cầu thang bộ hoặc thang máy lên tầng phòng học.',
      'Đi dọc hành lang đến cửa phòng học.'
    ],
    stepsJa: [
      '駐輪場を出て、学内通路を右折します。',
      '100m直進して講義棟の正面エントランスへ。',
      '階段またはエレベーターで目的階へ移動。',
      '廊下を進み教室前へ到着。'
    ]
  };

  const stepsList = isVi ? walking.steps : (walking.stepsJa || walking.steps);
  const totalTripMinutes = (lot.avgWaitTimeMin || 2) + walking.walkMinutes;

  // Toggle step completion for fun student interactivity
  const toggleStep = (idx) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter(i => i !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBackToOverview}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isVi ? '← Đổi ý / Xem bãi khác (Về S01)' : '← 変更・他の駐輪場を見る（S01へ）'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToReport}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 px-3.5 py-2 rounded-xl transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>{isVi ? '📢 Báo cáo 1 chạm (Sang S04)' : '📢 1タップ状況シェア（S04へ）'}</span>
          </button>
        </div>
      </div>

      {/* Screen Title & Flow Banner */}
      <div className="bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/70 border border-sky-700/50 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-500 text-slate-950">
            S02
          </span>
          <span className="text-xs font-bold text-sky-300 uppercase tracking-wide">
            {isVi ? 'Chi tiết & lộ trình đi bộ tối ưu' : '駐輪場詳細・最短教室ルート案内'}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {isVi ? lot.name : lot.nameJa}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1 text-sky-400 font-semibold">
                <Navigation className="w-3.5 h-3.5" />
                {isVi ? 'Điểm đến:' : '目的地:'}
              </span>
              <span className="font-bold text-amber-300">{isVi ? selectedBuilding.name : selectedBuilding.nameJa}</span>
            </div>
          </div>

          {/* Calming Time Budget Pill (Thách thức 2: Giúp SV thong thả, không lo muộn) */}
          <div className="bg-emerald-950/60 border border-emerald-500/40 p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">
                {isVi ? 'Dự kiến đến cửa phòng:' : '教室到着予想時刻:'}
              </div>
              <div className="text-lg font-black text-white">
                13:28 <span className="text-xs font-normal text-emerald-300">{isVi ? '(Kịp trước 2 phút ✅)' : '(2分前到着・余裕あり)'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Breakdown Cards (Ước tính thời gian chi tiết theo yêu cầu 課題②) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Step A: Parking Time */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <div className="text-xs text-slate-400">{isVi ? 'Gửi & tìm chỗ đỗ' : '駐輪・駐車時間'}</div>
            <div className="text-sm font-bold text-white">
              ~{lot.avgWaitTimeMin || 1} {isVi ? 'phút (Thông thoáng)' : '分 (スムーズ)'}
            </div>
          </div>
        </div>

        {/* Step B: Walking Time */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <div className="text-xs text-slate-400">{isVi ? 'Đi bộ tối ưu' : '徒歩所要時間'}</div>
            <div className="text-sm font-bold text-white">
              ~{walking.walkMinutes} {isVi ? 'phút' : '分'} ({walking.distanceM}m)
            </div>
          </div>
        </div>

        {/* Step C: Total & Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <div className="text-xs text-slate-400">{isVi ? 'Tâm lý di chuyển' : '移動ストレス度'}</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVi ? 'Thong thả, tự tin' : '落ち着いて移動可能'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Optimal Walking Route (Lộ trình đi bộ tối ưu đến tận cửa phòng học - 課題②) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-base text-white">
              {isVi ? 'Chỉ dẫn đi bộ từng bước đến tận cửa phòng học' : '教室前までの最短ステップナビ'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {isVi ? 'Đánh dấu để theo dõi tiến độ đi' : '進捗チェック可能'}
          </span>
        </div>

        {/* Step List */}
        <div className="space-y-3">
          {stepsList.map((step, idx) => {
            const isDone = completedSteps.includes(idx);

            return (
              <div
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone 
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:border-sky-500'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                  isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                }`}>
                  {isDone ? '✓' : idx + 1}
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${isDone ? 'line-through opacity-80' : 'font-medium'}`}>
                    {step}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpful Tips during 10-min transition */}
        <div className="bg-slate-800/40 border-l-4 border-sky-500 p-3 rounded-r-xl text-xs text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            {isVi 
              ? 'Mẹo: Giờ giao ca thang máy thường quá tải. Lộ trình trên ưu tiên thang bộ tầng thấp giúp bạn tiết kiệm thêm 3 phút chờ thang máy!'
              : 'ヒント：交代時間のEV混雑を回避するため、低層階は階段利用を推奨ルートとしています（待ち時間3分短縮）。'}
          </span>
        </div>
      </div>

      {/* Confirmation Hero Action (Exact Image 1 flowchart: Xác nhận chọn bãi -> Đến lớp đúng giờ) */}
      <div className="pt-2">
        <button
          onClick={onConfirmArrival}
          className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-slate-950 shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <CheckCircle2 className="w-6 h-6 text-slate-950" />
          <span>
            {isVi 
              ? 'XÁC NHẬN CHỌN BÃI & HOÀN TẤT ĐẾN LỚP (ĐẾN LỚP ĐÚNG GIỜ) →' 
              : '駐輪を完了して教室へ向かう（定時到着・問題解決）→'}
          </span>
        </button>
        <p className="text-center text-xs text-slate-400 mt-2">
          {isVi ? 'Bấm để đánh dấu bạn đã chọn bãi an toàn và giải quyết triệt để vấn đề kẹt xe' : 'クリックで到着完了画面・課題解決レポートを表示します'}
        </p>
      </div>
    </div>
  );
}

