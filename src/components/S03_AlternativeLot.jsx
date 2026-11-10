import React from 'react';
import { 
  AlertTriangle, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Map, 
  Footprints, 
  Clock, 
  TrendingDown, 
  ShieldAlert,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function S03_AlternativeLot({ 
  failedLot, 
  alternativeLots, 
  selectedBuilding, 
  onSelectAlternative, 
  onBackToOverview, 
  lang 
}) {
  const isVi = lang === 'vi';

  // Recommend best alternative (usually lot-c or lot with most spots and closest walk)
  const bestAlternative = alternativeLots.find(l => l.isRecommendedAlternative) || alternativeLots[0];
  const otherAlternatives = alternativeLots.filter(l => l.id !== bestAlternative?.id);

  const walkingBest = bestAlternative?.walkingInfo?.[selectedBuilding.id] || {
    walkMinutes: 4,
    distanceM: 270
  };

  const walkingFailed = failedLot?.walkingInfo?.[selectedBuilding.id] || {
    walkMinutes: 2,
    distanceM: 140
  };

  const timeSaved = Math.max(5, (failedLot?.avgWaitTimeMin || 9) - (bestAlternative?.avgWaitTimeMin || 1));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Back to Map Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToOverview}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all"
        >
          <Map className="w-4 h-4 text-sky-400" />
          <span>{isVi ? '← Xem toàn bộ bản đồ (Về S01)' : '← 全体マップを確認（S01へ戻る）'}</span>
        </button>

        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
          {isVi ? 'Điều Hướng Tránh Ùn Tắc Giao Ca' : '迂回・渋滞回避ガイダンス'}
        </span>
      </div>

      {/* Screen Title & Flow Banner */}
      <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/60 border border-rose-800/50 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white">
            S03
          </span>
          <span className="text-xs font-bold text-rose-300 uppercase tracking-wide">
            {isVi ? 'Bãi xe thay thế & hướng dẫn chuyển hướng' : '代替駐輪場・迂回案内'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 animate-bounce" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {failedLot ? (isVi ? `${failedLot.name} ĐÃ HẾT CHỖ!` : `${failedLot.nameJa} は満車です！`) : 'BÃI ĐÃ CHỌN HIỆN HẾT CHỖ'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {isVi 
                ? 'Hàng đợi đang kẹt dài. Hệ thống tự động đề xuất phương án bãi dự phòng tối ưu nhất để bạn không bị trễ giờ học!'
                : '入口で待機列が発生しています。遅刻を防ぐため、目的地（教室）に一番近い代替駐輪場をご案内します。'}
            </p>
          </div>

          {/* Time Saved Badge */}
          <div className="bg-emerald-950/70 border border-emerald-500/50 p-3 rounded-xl shrink-0 flex items-center gap-3">
            <Zap className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-emerald-300 font-bold uppercase">
                {isVi ? 'Thời gian tiết kiệm dự tính:' : '見込み短縮時間:'}
              </div>
              <div className="text-lg font-black text-white">
                ~{timeSaved} {isVi ? 'phút' : '分'} <span className="text-xs font-medium text-emerald-300">{isVi ? '(Kịp điểm danh)' : '(出席に間に合う)'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Comparison: Problem Lot vs Recommended Alternative (Giải pháp trong Ảnh 2 & 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Failed Lot Status */}
        <div className="bg-slate-900/80 border border-rose-900/60 rounded-2xl p-4 space-y-3 opacity-90">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              {isVi ? 'BÃI ĐANG QUÁ TẢI (KHUYÊN TRÁNH)' : '混雑中の駐輪場（非推奨）'}
            </span>
            <span className="text-[11px] font-black bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded">
              {failedLot?.code || 'PA-01'}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-200">
            {isVi ? failedLot?.name : failedLot?.nameJa}
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
              <span>{isVi ? 'Chỗ trống:' : '空き台数:'}</span>
              <span className="font-bold text-rose-400">{isVi ? '0 chỗ (Kín 100%)' : '0台 (満車)'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
              <span>{isVi ? 'Thời gian kẹt xếp hàng:' : '入場待機時間:'}</span>
              <span className="font-bold text-rose-400">~{failedLot?.avgWaitTimeMin || 9} {isVi ? 'phút' : '分'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
              <span>{isVi ? 'Hậu quả nguy cơ:' : 'リスク:'}</span>
              <span className="font-bold text-rose-400">{isVi ? 'Trễ điểm danh, tâm lý nôn nóng' : '遅刻・焦り・ストレス'}</span>
            </div>
          </div>
        </div>

        {/* #1 Recommended Alternative */}
        {bestAlternative && (
          <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/40 border-2 border-emerald-500/70 rounded-2xl p-4 space-y-3 shadow-xl relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
                {isVi ? 'ĐỀ XUẤT THAY THẾ TỐI ƯU NHẤT (#1)' : '最善の代替プラン（No.1）'}
              </span>
              <span className="text-[11px] font-black bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                {bestAlternative.code}
              </span>
            </div>

            <h3 className="text-base font-bold text-white">
              {isVi ? bestAlternative.name : bestAlternative.nameJa}
            </h3>

            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80">
                <span>{isVi ? 'Chỗ trống sẵn sàng:' : '即利用可能な空き:'}</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {bestAlternative.availableSpots} {isVi ? 'chỗ trống' : '台'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80">
                <span>{isVi ? 'Đi bộ đến phòng học:' : '教室まで徒歩:'}</span>
                <span className="font-bold text-white">
                  {walkingBest.walkMinutes} {isVi ? 'phút' : '分'} ({walkingBest.distanceM}m)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80">
                <span>{isVi ? 'Lợi thế vượt trội:' : 'メリット:'}</span>
                <span className="font-bold text-emerald-300">
                  {isVi ? 'Vào gửi ngay, đi bộ thong thả râm mát' : '即駐車可・落ち着いて登校'}
                </span>
              </div>
            </div>

            {/* Decision Action: Chọn bãi gợi ý -> Chuyển sang S02 (Exact flowchart rule) */}
            <button
              onClick={() => onSelectAlternative(bestAlternative)}
              className="w-full py-3 px-4 rounded-xl font-black text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] mt-2"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>
                {isVi ? 'CHỌN BÃI GỢI Ý NÀY & XEM LỘ TRÌNH (S02) →' : 'この代替案を選択してルート表示（S02）→'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Additional Alternative Lots */}
      {otherAlternatives.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isVi ? 'Các phương án dự phòng khác' : 'その他の代替駐輪場候補'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherAlternatives.map((alt) => {
              const walking = alt.walkingInfo?.[selectedBuilding.id] || { walkMinutes: 6, distanceM: 450 };

              return (
                <div
                  key={alt.id}
                  onClick={() => onSelectAlternative(alt)}
                  className="bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-xl p-3.5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {isVi ? alt.name : alt.nameJa}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                      <span className="text-emerald-400 font-semibold">{alt.availableSpots} chỗ trống</span>
                      <span>•</span>
                      <span>Đi bộ {walking.walkMinutes}p ({walking.distanceM}m)</span>
                    </div>
                  </div>

                  <button className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="pt-2 text-center">
        <button
          onClick={onBackToOverview}
          className="text-xs text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4"
        >
          {isVi ? 'Hoặc quay lại xem toàn bộ bản đồ tổng quan bãi xe (S01)' : 'または駐輪場一覧マップへ戻る（S01）'}
        </button>
      </div>
    </div>
  );
}

