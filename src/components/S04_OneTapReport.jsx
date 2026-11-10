import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  MessageSquare,
  Flame,
  AlertCircle
} from 'lucide-react';
import { QUICK_REPORT_OPTIONS } from '../data/mockData';

export default function S04_OneTapReport({ 
  lot, 
  onSubmitReport, 
  onBackToS02, 
  lang 
}) {
  const isVi = lang === 'vi';
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customNote, setCustomNote] = useState('');
  const [authorName, setAuthorName] = useState('Sinh viên năng động');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTags = isVi ? [
    'Có bảo vệ điều phối',
    'Cổng phụ đang mở',
    'Lối vào thông thoáng',
    'Xe máy xếp gọn gàng',
    'Trời nắng, mái che mát',
    'Đang có xe chuẩn bị ra'
  ] : [
    '警備員による誘導あり',
    'サブゲート開放中',
    '入口スムーズ',
    '綺麗に整列駐車中',
    '日陰で快適',
    '出庫する車両あり'
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleOneTapSubmit = (option) => {
    setSelectedOption(option);
    setIsSubmitting(true);

    // Prepare report payload
    const reportData = {
      optionId: option.id,
      lotId: lot.id,
      status: option.id === 'green' ? 'green' : option.id === 'yellow' ? 'yellow' : 'red',
      statusText: isVi ? option.label : option.labelJa,
      tags: selectedTags,
      note: customNote,
      author: authorName || (isVi ? 'Sinh viên K65' : '匿名学生'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitReport(reportData);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Back Action (To S02) */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToS02}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isVi ? '← Trở về Lộ trình (Về S02)' : '← ルート詳細へ戻る（S02へ）'}</span>
        </button>

        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          {isVi ? 'Cộng Đồng Chia Sẻ Thông Tin' : 'コミュニティ共助システム'}
        </span>
      </div>

      {/* Screen Title & Flow Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/60 border border-emerald-700/50 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500 text-slate-950">
            S04
          </span>
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
            {isVi ? 'Báo cáo 1 chạm theo thời gian thực' : '1タップ状況シェア'}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white">
          {isVi ? `Chia Sẻ Nhanh Tình Trạng ${lot.name}` : `${lot.nameJa} の状況を1タップ共有`}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          {isVi 
            ? 'Bạn vừa gửi xe xong hoặc đang đứng tại đây? Hãy chạm 1 nút dưới đây để giúp các bạn sinh viên ca sau chủ động chọn bãi và không bị muộn học!' 
            : '駐輪を終えたばかりですか？1タップで最新状況を共有し、後から来る仲間の遅刻を防ぎましょう！'}
        </p>

        {/* 10-Minute Ephemeral Notice (Đặc tính trong tài liệu Ảnh 2 & 3) */}
        <div className="mt-3 flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-600/30 px-3 py-1.5 rounded-xl w-fit">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            {isVi 
              ? 'Thông tin tự hết hiệu lực sau 10 phút để luôn đảm bảo tính thời gian thực chính xác.' 
              : '情報は10分間で自動的に期限切れとなり、常に最新の正確性が保たれます。'}
          </span>
        </div>
      </div>

      {/* 4 Large 1-Tap Buttons (Trọng tâm tính năng Báo cáo 1 chạm) */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          {isVi ? '1. Chọn tình trạng thực tế bạn quan sát thấy (Chạm để gửi ngay):' : '1. 現在の混雑状況をタップ（1タップで送信完了）:'}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {QUICK_REPORT_OPTIONS.map((opt) => {
            const isOptSelected = selectedOption?.id === opt.id;

            return (
              <button
                key={opt.id}
                disabled={isSubmitting}
                onClick={() => handleOneTapSubmit(opt)}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group flex flex-col justify-between ${
                  opt.id === 'green'
                    ? 'bg-gradient-to-br from-emerald-950/50 to-slate-900 border-emerald-600/60 hover:border-emerald-400 hover:scale-[1.01]'
                    : opt.id === 'yellow'
                    ? 'bg-gradient-to-br from-amber-950/50 to-slate-900 border-amber-600/60 hover:border-amber-400 hover:scale-[1.01]'
                    : opt.id === 'red_full'
                    ? 'bg-gradient-to-br from-rose-950/50 to-slate-900 border-rose-600/60 hover:border-rose-400 hover:scale-[1.01]'
                    : 'bg-gradient-to-br from-red-950/60 to-slate-900 border-red-700/80 hover:border-red-500 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full ${
                      opt.id === 'green' ? 'bg-emerald-400' :
                      opt.id === 'yellow' ? 'bg-amber-400' :
                      opt.id === 'red_full' ? 'bg-rose-400' : 'bg-red-500'
                    }`}></span>
                    <span className="font-extrabold text-base text-white group-hover:text-sky-300">
                      {isVi ? opt.label : opt.labelJa}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {isVi ? '1 chạm' : '1タップ'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-1">
                  {isVi ? opt.subtext : opt.subtextJa}
                </p>

                {isOptSelected && (
                  <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center">
                    <span className="text-xs font-bold text-white bg-emerald-600 px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {isVi ? 'Đang gửi cập nhật...' : '送信中...'}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick contextual tags */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          {isVi ? '2. Nhãn bổ sung nhanh (Tùy chọn):' : '2. 補足タグ（任意）:'}
        </label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isTagActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-colors ${
                  isTagActive
                    ? 'bg-sky-600 text-white border-sky-400 shadow'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {tag} {isTagActive ? '✓' : '+'}
              </button>
            );
          })}
        </div>

        {/* Custom optional note */}
        <div className="pt-2">
          <input
            type="text"
            placeholder={isVi ? "Ghi chú thêm (vd: Dãy B2 còn 5 xe máy, vào cổng 2...)" : "追加コメント（例：奥のB2レーンに空きあり...）"}
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Return info according to Image 1 flowchart */}
      <div className="text-center text-xs text-slate-400">
        {isVi 
          ? '💡 Theo sơ đồ luồng: Sau khi bạn chọn 1 chạm, hệ thống sẽ tự động cập nhật số liệu và đưa bạn quay lại màn hình S02.' 
          : '💡 画面遷移図ルール：1タップ送信完了後、自動的にS02（ルート画面）へ復帰します。'}
      </div>
    </div>
  );
}

