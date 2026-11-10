import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  Clock, 
  Smile, 
  ShieldCheck, 
  RotateCcw, 
  Heart,
  BookOpen
} from 'lucide-react';

export default function ArrivalSuccessModal({ 
  isOpen, 
  onReset, 
  lot, 
  building, 
  lang 
}) {
  if (!isOpen) return null;
  const isVi = lang === 'vi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* Celebration Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <CheckCircle2 className="w-12 h-12 text-slate-950 stroke-[2.5]" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest">
            {isVi ? 'Mục tiêu hoàn thành' : 'ゴール達成・課題解決'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isVi ? 'ĐẾN LỚP ĐÚNG GIỜ!' : '時間通りに教室へ到着！'}
          </h2>
          <p className="text-sm font-semibold text-emerald-400">
            {isVi ? 'Vấn đề được giải quyết trọn vẹn (Ảnh 1 & 2)' : '課題が完全に解決されました'}
          </p>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {isVi 
              ? `Bạn đã gửi xe tại ${lot?.name || 'Nhà xe'} và đến ${building?.name || 'phòng học'} kịp trước giờ điểm danh với tâm lý thong thả, thoải mái!`
              : `${lot?.nameJa || '駐輪場'} を利用し、余裕を持って ${building?.nameJa || '教室'} に到着しました！`}
          </p>
        </div>

        {/* Problem Solved Verification Matrix (Khớp với tài liệu ITSS ảnh 2 & 3) */}
        <div className="grid grid-cols-2 gap-3 text-left">
          {/* Solved 1 */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isVi ? 'Giải quyết Thách thức ①' : '課題①の解決達成'}</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {isVi 
                ? '✓ Đã xóa bỏ trạng thái lo lắng, vội vã nhờ nắm trước tình trạng trống/đầy và điều hướng tránh kẹt.'
                : '✓ 空き状況の可視化と迂回誘導により、満車による遅刻不安と焦りを解消。'}
            </p>
          </div>

          {/* Solved 2 */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <Smile className="w-4 h-4 shrink-0" />
              <span>{isVi ? 'Giải quyết Thách thức ②' : '課題②の解決達成'}</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {isVi 
                ? '✓ Đã xóa bỏ nôn nóng nhờ ước tính chuẩn xác thời gian và lộ trình đi bộ tối ưu từng bước.'
                : '✓ 移動時間の正確な予測と最短歩行ルートにより、心身に余裕を持って登校。'}
            </p>
          </div>
        </div>

        {/* Quick Result Stats */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center justify-around text-xs">
          <div>
            <div className="text-slate-400 text-[10px]">{isVi ? 'Thời gian tiết kiệm' : '短縮時間'}</div>
            <div className="text-base font-extrabold text-emerald-400">+8 phút</div>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div>
            <div className="text-slate-400 text-[10px]">{isVi ? 'Tình trạng điểm danh' : '出席状況'}</div>
            <div className="text-base font-extrabold text-white">{isVi ? 'Kịp giờ 100%' : '定時出席OK'}</div>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div>
            <div className="text-slate-400 text-[10px]">{isVi ? 'Tâm lý vào học' : '精神状態'}</div>
            <div className="text-base font-extrabold text-sky-400">{isVi ? 'Thư thái' : 'リラックス'}</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onReset}
            className="w-full py-3.5 px-6 rounded-2xl font-black text-sm bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>
              {isVi ? 'Bắt Đầu Lượt Mới / Về Màn Hình Tổng Quan (S01)' : 'もう一度試す / トップへ戻る（S01）'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

