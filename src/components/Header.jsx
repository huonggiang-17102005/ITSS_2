import React from 'react';
import { 
  Compass, 
  MapPin, 
  GitBranch, 
  Languages, 
  Clock, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { CAMPUS_BUILDINGS } from '../data/mockData';

export default function Header({ 
  currentScreen, 
  setCurrentScreen, 
  selectedBuilding, 
  setSelectedBuilding, 
  lang, 
  setLang, 
  onOpenFlowchart,
  remainingSeconds 
}) {
  const isVi = lang === 'vi';

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Transition countdown bar */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-sky-950 px-4 py-1.5 text-xs text-sky-200 border-b border-sky-800/50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-semibold text-amber-300">
            {isVi ? '10 PHÚT ĐỔI CA HỌC (13:20 - 13:30)' : '10分間の授業入れ替わり時間帯'}
          </span>
          <span className="hidden sm:inline text-slate-300">
            {isVi ? '| Giờ cao điểm bãi xe sinh viên' : '| 駐輪場ピーク時間帯'}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300">{isVi ? 'Vào học sau:' : '授業開始まで:'}</span>
          <span className="bg-slate-900/80 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30 text-xs">
            {formatTimer(remainingSeconds)}
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => setCurrentScreen('S01')}
          className="flex items-center gap-3 cursor-pointer group"
          title={isVi ? "Trở về Tổng quan" : "トップへ戻る"}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors">
                SmartPark Campus
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded">
                ITSS 2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {isVi ? 'Hệ thống điều hướng bãi xe & đi bộ đúng giờ' : '駐輪場案内・最短教室ルート案内'}
            </p>
          </div>
        </div>

        {/* Center: Selected Classroom Picker */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{isVi ? 'Điểm đến học tập (Tự động tính lộ trình):' : '目的地（教室自動計算）:'}</span>
            </label>
            <div className="relative">
              <select
                value={selectedBuilding.id}
                onChange={(e) => {
                  const b = CAMPUS_BUILDINGS.find(x => x.id === e.target.value);
                  if (b) setSelectedBuilding(b);
                }}
                className="w-full bg-slate-800/90 text-sm text-slate-100 pl-3 pr-8 py-1.5 rounded-lg border border-slate-700 hover:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors appearance-none cursor-pointer font-medium"
              >
                {CAMPUS_BUILDINGS.map(b => (
                  <option key={b.id} value={b.id}>
                    {isVi ? b.name : b.nameJa}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right tools: Flowchart viewer + Language switch */}
        <div className="flex items-center gap-2">
          {/* Flowchart button (Image 1) */}
          <button
            onClick={onOpenFlowchart}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all hover:scale-[1.02]"
            title={isVi ? "Xem sơ đồ luồng chuyển màn hình (Ảnh 1)" : "画面遷移図を確認（画像1）"}
          >
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">
              {isVi ? 'Sơ đồ luồng (Ảnh 1)' : '画面遷移図'}
            </span>
            <span className="sm:hidden">{isVi ? 'Luồng' : '遷移'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'ja' : 'vi')}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Đổi ngôn ngữ (VI / JA)"
          >
            <Languages className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold">{lang === 'vi' ? 'VI' : 'JA'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Destination selector bar */}
      <div className="md:hidden px-4 pb-2.5 pt-1 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
          <select
            value={selectedBuilding.id}
            onChange={(e) => {
              const b = CAMPUS_BUILDINGS.find(x => x.id === e.target.value);
              if (b) setSelectedBuilding(b);
            }}
            className="w-full bg-slate-800 text-xs text-slate-200 py-1.5 px-2 rounded-lg border border-slate-700"
          >
            {CAMPUS_BUILDINGS.map(b => (
              <option key={b.id} value={b.id}>
                {isVi ? b.name : b.nameJa}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

