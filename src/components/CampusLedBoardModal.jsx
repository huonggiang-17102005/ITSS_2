import React from 'react';
import { X, Tv, Sparkles, Navigation, ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CampusLedBoardModal({ isOpen, onClose, parkingLots, lang }) {
  if (!isOpen) return null;
  const isVi = lang === 'vi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-6 shadow-2xl text-slate-100">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Tv className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">
                  {isVi ? 'Bảng Đèn LED Điện Tử Cổng Trường (Mô Phỏng)' : '正門・交差点LED電子電光掲示板（シミュレーター）'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-zinc-950">
                  {isVi ? 'GIẢI PHÁP 12 & 32' : '解決策⑫・㉜'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {isVi ? 'Lắp đặt tại cổng chính & các ngã rẽ để sinh viên vừa vào trường là thấy ngay' : '校門・主要交差点に設置され、入構時に一目で空きを確認可能'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LED Matrix Screen Simulation */}
        <div className="my-5 p-5 bg-black rounded-2xl border-4 border-zinc-800 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] font-mono space-y-3">
          {/* Signboard Header */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-900 text-amber-400 text-xs tracking-widest font-black uppercase">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span>CAMPUS PARKING GUIDANCE SYSTEM</span>
            </div>
            <span>LIVE 13:24</span>
          </div>

          {/* LED rows for each parking lot */}
          <div className="space-y-2">
            {parkingLots.map((lot, idx) => {
              const isFull = lot.status === 'red';
              const isYellow = lot.status === 'yellow';

              return (
                <div 
                  key={lot.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-900 transition-colors"
                >
                  {/* Lot Name & Direction Arrow */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-zinc-400">
                      #{idx + 1}
                    </span>
                    <span className="text-sm font-black text-zinc-100">
                      {lot.shortName}
                    </span>
                  </div>

                  {/* LED Indicator: Spots count & Status */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={`text-base font-black tracking-wider ${
                        isFull ? 'text-red-500 animate-pulse' : isYellow ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {isFull ? (isVi ? 'HẾT CHỖ [0]' : '満車 [0]') : `${lot.availableSpots} CHỖ`}
                      </span>
                    </div>

                    {/* Digital Direction Arrow */}
                    <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center font-black text-sm">
                      {idx === 0 ? (
                        <ArrowLeft className="w-4 h-4 text-red-400" />
                      ) : idx === 1 ? (
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scrolling ticker at bottom of LED sign */}
          <div className="pt-2 border-t border-zinc-900 text-[11px] text-amber-300/90 flex items-center justify-between overflow-hidden">
            <span>[KHUYẾN CÁO]: BÃI A QUÁ TẢI ➔ RẼ PHẢI QUA NHÀ XE C HOẶC D ĐỂ KỊP GIỜ HỌC!</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{isVi ? 'Mô phỏng giải pháp phần cứng kết nối đồng bộ với ứng dụng web' : 'Webアプリと完全同期する学内ハードウェア設備構想'}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors"
          >
            {isVi ? 'Đóng' : '閉じる'}
          </button>
        </div>
      </div>
    </div>
  );
}

