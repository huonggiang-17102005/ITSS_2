import React from 'react';
import { X, ArrowRight, ArrowDown, CheckCircle2, AlertTriangle, Eye, Sparkles } from 'lucide-react';

export default function FlowDiagramModal({ isOpen, onClose, currentScreen, onSelectScreen, lang }) {
  if (!isOpen) return null;
  const isVi = lang === 'vi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                {isVi ? 'Sơ Đồ Chuyển Màn Hình (Ảnh 1)' : '画面遷移図（画像1準拠）'}
              </span>
              <span className="text-xs text-slate-400">
                {isVi ? 'Nhấn vào ô để chuyển màn hình tương ứng' : 'クリックして画面へ直接移動できます'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              {isVi ? 'Luồng Điều Hướng Trải Nghiệm Sinh Viên' : 'ユーザーフロー・画面遷移構造'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagram Canvas */}
        <div className="py-6 px-2 flex flex-col items-center">
          {/* Start node */}
          <div className="flex flex-col items-center">
            <div className="px-5 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm font-semibold text-slate-200 shadow">
              {isVi ? 'Bắt đầu phỏng vấn / Mở ứng dụng' : '開始・インタビュー開始'}
            </div>
            <ArrowDown className="w-5 h-5 text-slate-500 my-1 animate-bounce" />
          </div>

          {/* S01 */}
          <div className="w-full max-w-md">
            <div
              onClick={() => { onSelectScreen('S01'); onClose(); }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                currentScreen === 'S01'
                  ? 'bg-sky-950/80 border-sky-400 ring-4 ring-sky-500/20 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800/80 border-sky-700/60 hover:border-sky-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-sky-500 text-slate-950">
                  S01
                </span>
                {currentScreen === 'S01' && (
                  <span className="text-xs text-sky-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                    {isVi ? 'Đang ở màn hình này' : '現在の画面'}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-white mt-1">
                {isVi ? 'S01 · Tổng quan bãi xe' : 'S01 · 駐輪場空き状況一覧'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {isVi ? 'Hiển thị danh sách & bản đồ, trạng thái trống/đầy' : '駐輪場一覧・空き状況リアルタイム表示'}
              </p>
            </div>
          </div>

          {/* Decision branch */}
          <div className="flex flex-col items-center my-3">
            <span className="text-xs font-medium text-slate-400 italic">
              {isVi ? '↓ Chọn bãi định gửi' : '↓ 目的の駐輪場を選択'}
            </span>
            <div className="my-2 px-4 py-2 rounded-lg bg-amber-950/50 border border-amber-600/60 text-amber-200 text-xs font-bold flex items-center gap-1.5 shadow">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              {isVi ? 'Tình trạng bãi? (Kiểm tra thực tế)' : '駐輪場の混雑状況は？'}
            </div>
          </div>

          {/* Fork: S02 vs S03 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
            {/* Left branch: Còn chỗ -> S02 */}
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40 mb-2">
                {isVi ? 'Còn chỗ (Xanh / Vàng)' : '空きあり (緑 / 黄)'}
              </div>
              <div
                onClick={() => { onSelectScreen('S02'); onClose(); }}
                className={`w-full p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  currentScreen === 'S02'
                    ? 'bg-sky-950/80 border-sky-400 ring-4 ring-sky-500/20 shadow-lg shadow-sky-500/20'
                    : 'bg-slate-800/80 border-sky-700/60 hover:border-sky-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-sky-500 text-slate-950">
                    S02
                  </span>
                  {currentScreen === 'S02' && (
                    <span className="text-xs text-sky-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                      {isVi ? 'Đang ở màn hình này' : '現在の画面'}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-white mt-1">
                  {isVi ? 'S02 · Chi tiết & đi bộ' : 'S02 · 駐輪場詳細・教室ルート'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isVi ? 'Thời gian di chuyển + Lộ trình tối ưu từng bước đến phòng' : '徒歩所要時間・各教室への最短ルート案内'}
                </p>

                {/* Sub-actions in S02 */}
                <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex flex-col gap-1">
                  <div>• {isVi ? 'Đổi ý / xem khác → Về S01' : '変更 / 他を見る → S01へ'}</div>
                  <div>• {isVi ? 'Báo cáo 1 chạm → Sang S04' : '1タップ報告 → S04へ'}</div>
                  <div>• {isVi ? 'Xác nhận chọn bãi → Đến lớp đúng giờ' : '確定 → 授業に間に合う'}</div>
                </div>
              </div>
            </div>

            {/* Right branch: Hết chỗ -> S03 */}
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/40 mb-2">
                {isVi ? 'Hết chỗ (Đỏ)' : '満車 (赤)'}
              </div>
              <div
                onClick={() => { onSelectScreen('S03'); onClose(); }}
                className={`w-full p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  currentScreen === 'S03'
                    ? 'bg-rose-950/80 border-rose-400 ring-4 ring-rose-500/20 shadow-lg shadow-rose-500/20'
                    : 'bg-slate-800/80 border-rose-800/60 hover:border-rose-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-rose-500 text-white">
                    S03
                  </span>
                  {currentScreen === 'S03' && (
                    <span className="text-xs text-rose-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                      {isVi ? 'Đang ở màn hình này' : '現在の画面'}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-white mt-1">
                  {isVi ? 'S03 · Bãi xe thay thế' : 'S03 · 代替駐輪場・迂回案内'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isVi ? 'Đề xuất bãi dự phòng tối ưu gần phòng học, tránh xếp hàng' : '満車時の代替候補・教室直行ルート迂回'}
                </p>

                {/* Sub-actions in S03 */}
                <div className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex flex-col gap-1">
                  <div>• {isVi ? 'Chọn bãi gợi ý → Sang S02' : '代替案を選択 → S02へ'}</div>
                  <div>• {isVi ? 'Xem toàn bộ bản đồ → Về S01' : '全マップを確認 → S01へ'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* S04 & Destination Goal */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            {/* S04 */}
            <div className="flex flex-col items-center">
              <div className="text-xs text-slate-400 mb-1">
                {isVi ? '↓ Báo cáo nhanh' : '↓ クイック投稿'}
              </div>
              <div
                onClick={() => { onSelectScreen('S04'); onClose(); }}
                className={`w-full p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  currentScreen === 'S04'
                    ? 'bg-emerald-950/80 border-emerald-400 ring-4 ring-emerald-500/20 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800/80 border-emerald-700/60 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                    S04
                  </span>
                  {currentScreen === 'S04' && (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      {isVi ? 'Đang ở màn hình này' : '現在の画面'}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base text-white mt-1">
                  {isVi ? 'S04 · Báo cáo 1 chạm' : 'S04 · 1タップ状況シェア'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isVi ? 'Sinh viên chia sẻ nhanh: Còn chỗ, Đầy, Xếp hàng đông' : '学生によるリアルタイム空き状況シェア・更新'}
                </p>
                <div className="mt-2 text-[11px] text-emerald-400 font-medium">
                  {isVi ? '↩ Sau khi chọn 1 chạm → Tự động quay về S02' : '↩ 1タップ完了後 → 自動でS02へ復帰'}
                </div>
              </div>
            </div>

            {/* Final Target */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-xs text-slate-400 mb-1">
                {isVi ? '↓ Xác nhận chọn bãi' : '↓ 駐輪完了・確定'}
              </div>
              <div className="w-full p-5 rounded-xl border-2 border-amber-500/80 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/40 shadow-xl text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-amber-300">
                  {isVi ? 'Đến lớp đúng giờ' : '時間通りに教室到着'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  {isVi ? 'Vấn đề được giải quyết! Thoải mái, không còn lo âu muộn học' : '課題解決！焦り・不安ゼロで授業に臨める'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{isVi ? 'Căn cứ theo yêu cầu thiết kế hệ thống ITSS (Ảnh 1, 2, 3)' : 'ITSS要件定義書（画像1・2・3）に基づく完全実装'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            {isVi ? 'Đóng sơ đồ' : '閉じる'}
          </button>
        </div>
      </div>
    </div>
  );
}

