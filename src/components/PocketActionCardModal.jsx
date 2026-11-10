import React from 'react';
import { X, ShieldCheck, Printer, Download, Sparkles, Navigation, Clock, CheckCircle } from 'lucide-react';

export default function PocketActionCardModal({ isOpen, onClose, lot, building, alternativeLot, lang }) {
  if (!isOpen || !lot) return null;
  const isVi = lang === 'vi';

  const walking = lot.walkingInfo?.[building.id] || { walkMinutes: 4, distanceM: 270 };
  const altWalking = alternativeLot?.walkingInfo?.[building.id] || { walkMinutes: 5, distanceM: 350 };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-base text-white">
                {isVi ? 'Thẻ Kế Hoạch Bỏ Túi (Pocket Action Card)' : 'ポケット行動カード（携帯用）'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isVi ? 'Hiện thực hóa Giải pháp #10 trong bảng yêu cầu ITSS' : 'ITSS要件定義書 解決策⑩に基づく機能'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Card Body (Looks like a sleek laminated student card) */}
        <div className="my-5 p-5 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-sky-950/80 border-2 border-sky-500/40 shadow-xl space-y-4 relative overflow-hidden">
          {/* Watermark / Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500 text-slate-950">
            {isVi ? 'KẾ HOẠCH GIAO CA' : '登校プラン'}
          </div>

          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              {isVi ? 'Đích đến phòng học' : '目的地'}
            </div>
            <div className="text-lg font-black text-amber-300">
              {isVi ? building.name : building.nameJa}
            </div>
          </div>

          {/* Plan A & Plan B comparison */}
          <div className="space-y-2.5 text-xs">
            {/* Plan A */}
            <div className="p-3 rounded-xl bg-slate-800/90 border border-emerald-500/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {isVi ? 'Kế Hoạch A (Chính):' : 'プランA（優先）:'}
                </span>
                <span className="text-slate-300 font-bold">{walking.walkMinutes}p đi bộ ({walking.distanceM}m)</span>
              </div>
              <div className="text-sm font-bold text-white">
                {isVi ? lot.name : lot.nameJa}
              </div>
              <div className="text-[11px] text-slate-400">
                {isVi ? '→ Gửi xe xong đi thẳng sảnh chính, cầu thang bộ lên phòng.' : '→ 駐輪後メインエントランスから階段で教室へ。'}
              </div>
            </div>

            {/* Plan B (Contingency) */}
            <div className="p-3 rounded-xl bg-slate-800/70 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isVi ? 'Kế Hoạch B (Nếu bãi A đầy):' : 'プランB（満車時の代替）:'}
                </span>
                <span className="text-slate-400 font-medium">+{altWalking.walkMinutes - walking.walkMinutes}p đi bộ</span>
              </div>
              <div className="text-sm font-bold text-slate-200">
                {alternativeLot ? (isVi ? alternativeLot.name : alternativeLot.nameJa) : (isVi ? 'Nhà xe C (Cổng phụ KTX)' : '第3駐輪場C')}
              </div>
              <div className="text-[11px] text-slate-400">
                {isVi ? '→ Chuyển hướng ngay không chần chừ, vẫn kịp giờ điểm danh.' : '→ 迷わず迂回、遅刻せず定時出席可能。'}
              </div>
            </div>
          </div>

          {/* Milestone timeline */}
          <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-center text-xs">
            <div>
              <div className="text-[10px] text-slate-400">{isVi ? 'Vào cổng' : '校門通過'}</div>
              <div className="font-mono font-bold text-white">13:21</div>
            </div>
            <div className="text-slate-600">→</div>
            <div>
              <div className="text-[10px] text-slate-400">{isVi ? 'Gửi xe xong' : '駐輪完了'}</div>
              <div className="font-mono font-bold text-sky-400">13:23</div>
            </div>
            <div className="text-slate-600">→</div>
            <div>
              <div className="text-[10px] text-slate-400">{isVi ? 'Đến cửa phòng' : '教室到着'}</div>
              <div className="font-mono font-bold text-emerald-400">13:28</div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 text-[11px]">
            {isVi ? '💡 Giúp SV chuẩn bị sẵn tâm lý, không bị bỡ ngỡ.' : '💡 事前準備で心理的プレッシャーを完全解消'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-colors"
          >
            {isVi ? 'Đã Ghi Nhớ & Đóng' : '確認完了'}
          </button>
        </div>
      </div>
    </div>
  );
}

