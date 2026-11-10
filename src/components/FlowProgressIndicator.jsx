import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, GitBranch } from 'lucide-react';

export default function FlowProgressIndicator({ 
  currentScreen, 
  onSelectScreen, 
  hasChosenAlternative,
  isVi 
}) {
  const steps = [
    { id: 'S01', label: 'S01: Tổng quan bãi xe', labelJa: 'S01: 空き状況一覧' },
    { 
      id: hasChosenAlternative ? 'S03' : 'S02', 
      label: hasChosenAlternative ? 'S03: Bãi xe thay thế' : 'S02: Chi tiết & đi bộ', 
      labelJa: hasChosenAlternative ? 'S03: 代替駐輪場' : 'S02: 詳細・ルート' 
    },
    { id: 'S04', label: 'S04: Báo cáo 1 chạm', labelJa: 'S04: 1タップ状況シェア' },
    { id: 'SUCCESS', label: 'Đến lớp đúng giờ', labelJa: '定時到着・解決' }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center justify-between text-xs mb-2 px-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isVi ? 'Tiến trình theo sơ đồ chuyển màn hình (Ảnh 1):' : '画面遷移進行度（画像1）:'}</span>
        </div>
        <span className="text-[11px] text-slate-400">
          {isVi ? 'Nhấp vào để đổi màn hình nhanh' : 'タップで直接遷移'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((st, idx) => {
          const isActive = currentScreen === st.id;
          const isDone = 
            (currentScreen === 'S02' && st.id === 'S01') ||
            (currentScreen === 'S03' && st.id === 'S01') ||
            (currentScreen === 'S04' && (st.id === 'S01' || st.id === 'S02')) ||
            (currentScreen === 'SUCCESS');

          return (
            <button
              key={st.id}
              onClick={() => {
                if (st.id !== 'SUCCESS') onSelectScreen(st.id);
              }}
              className={`py-2 px-2.5 rounded-xl text-left border transition-all flex items-center justify-between gap-1.5 ${
                isActive
                  ? 'bg-sky-950 border-sky-400 ring-2 ring-sky-500/30 text-white font-extrabold shadow-md'
                  : isDone
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 font-semibold hover:border-slate-600'
                  : 'bg-slate-900/40 border-slate-800/60 text-slate-400'
              }`}
            >
              <div className="truncate">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  {idx + 1}. {st.id}
                </div>
                <div className="text-xs truncate">
                  {isVi ? st.label.split(':')[1] || st.label : st.labelJa.split(':')[1] || st.labelJa}
                </div>
              </div>

              {isActive ? (
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping shrink-0"></span>
              ) : isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

