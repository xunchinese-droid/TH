import React, { useState, useRef } from 'react';
import {
  BookOpen,
  GraduationCap,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  Info,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface TabItem {
  id: string;
  category: 'lesson' | 'comprehensive';
  tabName: string;
  badge: string;
  fullTitle: string;
  description: string;
  questionCount: number;
  timeLimit?: string;
  fileName: string;
  color: string;
}

const TABS: TabItem[] = [
  {
    id: 'b18',
    category: 'lesson',
    tabName: 'Bài 18',
    badge: '23 câu',
    fullTitle: 'Bài Tập Ôn Tập HSK 4 - Bài 18',
    description: '科技与世界 (Khoa học công nghệ và thế giới) · Trần Văn Huân',
    questionCount: 23,
    fileName: 'B_i_T_p__n_T_p_HSK_4_-_B_i_18___Gi_o_Vi_n__Tr_n_V_n_Hu_n_fdeda67f.html',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'b19',
    category: 'lesson',
    tabName: 'Bài 19',
    badge: '23 câu',
    fullTitle: 'Bài Tập Ôn Tập HSK 4 - Bài 19',
    description: '生活的味道 (Hương vị cuộc sống) · Trần Văn Huân',
    questionCount: 23,
    fileName: 'B_i_T_p__n_T_p_HSK_4_-_B_i_19_5327159d.html',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'b20',
    category: 'lesson',
    tabName: 'Bài 20',
    badge: '23 câu',
    fullTitle: 'Bài Tập Ôn Tập HSK 4 - Bài 20',
    description: '路上的风景 (Phong cảnh trên đường) · Trần Văn Huân',
    questionCount: 23,
    fileName: 'B_i_T_p__n_T_p_HSK_4_-_B_i_20_ee9569a8.html',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'rev48',
    category: 'comprehensive',
    tabName: 'Tổng Hợp 48 câu',
    badge: '48 câu · 45p',
    fullTitle: 'Thầy Huân - Ôn Tập HSK 4 Bài 17-20 (Đề 48 câu)',
    description: '6 phần trắc nghiệm · Thang điểm 10 · Đạt từ 7 điểm mở đáp án',
    questionCount: 48,
    timeLimit: '45 phút',
    fileName: 'TH_Y_HU_N_-__N_T_P_HSK_4_B_I_17-20__2__475f3943.html',
    color: 'from-rose-600 to-red-700'
  },
  {
    id: 'rev51',
    category: 'comprehensive',
    tabName: 'Tổng Hợp 51 câu',
    badge: '51 câu · 45p',
    fullTitle: 'Thầy Huân - Ôn Tập HSK 4 Bài 17-20 (Đề 51 câu)',
    description: 'Đề nâng cao · Thêm dạng sắp xếp câu phức tạp · Pinyin hỗ trợ',
    questionCount: 51,
    timeLimit: '45 phút',
    fileName: 'TH_Y_HU_N_-__N_T_P_HSK_4_B_I_17-20__1__a2cfda2e.html',
    color: 'from-purple-600 to-pink-700'
  },
  {
    id: 'rev75',
    category: 'comprehensive',
    tabName: 'Tổng Hợp 75 câu (VIP)',
    badge: '75 câu · 45p',
    fullTitle: 'Thầy Huân - Ôn Tập HSK 4 Bài 17-20 (Đề 75 câu Đầy Đủ)',
    description: 'Đề tổng hợp toàn diện nhất · Đầy đủ bài đọc, dịch câu & ngữ pháp',
    questionCount: 75,
    timeLimit: '45 phút',
    fileName: 'TH_Y_HU_N_-__N_T_P_HSK_4_B_I_17-20_b3ad7095.html',
    color: 'from-red-600 to-rose-800'
  }
];

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>('b18');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const activeIndex = TABS.findIndex((t) => t.id === activeTabId);
  const currentTab = TABS[activeIndex] || TABS[0];

  const handlePrevTab = () => {
    if (activeIndex > 0) {
      setActiveTabId(TABS[activeIndex - 1].id);
    }
  };

  const handleNextTab = () => {
    if (activeIndex < TABS.length - 1) {
      setActiveTabId(TABS[activeIndex + 1].id);
    }
  };

  const handleReloadCurrentTab = () => {
    const iframe = iframeRefs.current[activeTabId];
    if (iframe) {
      // Reload iframe content
      iframe.src = iframe.src;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-900 text-slate-100 font-sans">
      {/* TOP NAVIGATION BAR */}
      <header className="relative z-20 flex-shrink-0 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        {/* Brand & Action Bar */}
        <div className="px-3 sm:px-5 py-2.5 flex items-center justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            {/* Logo Badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-900/30 text-white font-black text-lg tracking-wider">
                旬
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                    XUN <span className="text-red-500">HSK</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-800/60">
                    HSK 4
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
                  Hệ Thống Ôn Luyện Trắc Nghiệm · Thầy Huân
                </p>
              </div>
            </div>
          </div>

          {/* Quick tab category overview badge */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800 text-xs">
            <span className="text-slate-400">Đang học:</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {currentTab.fullTitle}
            </span>
          </div>

          {/* Utility Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Prev/Next Quick Controls */}
            <div className="hidden sm:flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={handlePrevTab}
                disabled={activeIndex === 0}
                title="Đề trước"
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 font-medium px-2">
                {activeIndex + 1}/{TABS.length}
              </span>
              <button
                onClick={handleNextTab}
                disabled={activeIndex === TABS.length - 1}
                title="Đề tiếp theo"
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Reload Current Quiz */}
            <button
              onClick={handleReloadCurrentTab}
              title="Tải lại / Làm lại bài hiện tại"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Làm lại</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition flex items-center gap-1 cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline">{isFullscreen ? 'Thu nhỏ' : 'Mở rộng'}</span>
            </button>

            {/* Info / Guide */}
            <button
              onClick={() => setShowInfoModal(true)}
              title="Hướng dẫn & Danh mục đề thi"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-red-300 hover:text-white text-xs font-medium transition flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Hướng dẫn</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Tab Strip - Desktop & Tablet */}
        <div className="px-2 sm:px-4 py-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 px-1">
            <BookOpen className="w-3 h-3 text-red-400" />
            <span className="hidden md:inline">Từng bài:</span>
          </div>

          {/* Lesson Tabs */}
          {TABS.filter((t) => t.category === 'lesson').map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer select-none ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/40 ring-1 ring-red-400'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
                }`}
              >
                <span>{tab.tabName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                    isActive ? 'bg-red-900/60 text-red-100' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}

          <div className="h-4 w-[1px] bg-slate-800 mx-1 flex-shrink-0" />

          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 px-1">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Tổng hợp:</span>
          </div>

          {/* Comprehensive Review Tabs */}
          {TABS.filter((t) => t.category === 'comprehensive').map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-900/40 ring-1 ring-red-400'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
                }`}
              >
                {tab.id === 'rev75' && (
                  <Sparkles className="w-3 h-3 text-amber-300 flex-shrink-0" />
                )}
                <span>{tab.tabName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                    isActive ? 'bg-red-950/60 text-red-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Dropdown Menu for Tab switching */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-3 py-2 bg-slate-900 border-t border-slate-800 flex flex-col gap-1.5 max-h-64 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase px-1">
              Chọn đề trắc nghiệm:
            </div>
            {TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-left transition ${
                    isActive
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{tab.tabName}</span>
                    <span className="text-[10px] opacity-75">({tab.badge})</span>
                  </div>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ACTIVE TAB INFO STRIP */}
      <div className="bg-slate-900/60 border-b border-slate-800/60 px-4 py-1.5 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-slate-200 truncate">{currentTab.fullTitle}</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-slate-400 truncate">{currentTab.description}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          {currentTab.timeLimit && (
            <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded text-[11px] border border-amber-900/50">
              <Clock className="w-3 h-3" />
              {currentTab.timeLimit}
            </span>
          )}
          <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
            {currentTab.questionCount} câu hỏi
          </span>
        </div>
      </div>

      {/* IFRAME WORKSPACE CONTAINERS
          Using display none/block keeps all tests alive in background without losing
          countdown timers, entered student name, or selected answers! */}
      <main className="flex-1 w-full h-full relative bg-slate-100 overflow-hidden">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTabId;
          const assetUrl = `/assets/aistudio/${tab.fileName}`;

          return (
            <div
              key={tab.id}
              className={`absolute inset-0 w-full h-full ${
                isActive ? 'block z-10' : 'hidden -z-10'
              }`}
            >
              <iframe
                ref={(el) => {
                  iframeRefs.current[tab.id] = el;
                }}
                src={assetUrl}
                title={tab.fullTitle}
                className="w-full h-full border-0 bg-white"
                allow="autoplay"
              />
            </div>
          );
        })}
      </main>

      {/* QUICK INFO & GUIDE MODAL */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
                  旬
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">XUN HSK · Cổng Ôn Tập HSK 4</h3>
                  <p className="text-xs text-slate-400">Giáo viên biên soạn: Trần Văn Huân</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <h4 className="font-semibold text-white flex items-center gap-2 mb-1.5">
                  <Layers className="w-4 h-4 text-red-400" />
                  Cấu trúc các tab bài tập trong XUN HSK:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 ml-5 list-disc">
                  <li>
                    <strong className="text-white">Bài 18, 19, 20:</strong> Ôn tập chuyên sâu từng bài theo giáo trình chuẩn HSK 4 (mỗi bài 23 câu trắc nghiệm gồm dịch câu Trung-Việt, Việt-Trung, điền từ, sắp xếp câu).
                  </li>
                  <li>
                    <strong className="text-white">Tổng hợp 48 câu, 51 câu & 75 câu:</strong> Bộ đề thi tổng hợp Bài 17-20 với cơ chế thi thử chuẩn:
                    <div className="mt-1 pl-2 text-slate-400 space-y-0.5">
                      • Tính giờ chuẩn 45 phút.<br />
                      • Hỗ trợ bật/tắt Pinyin trực tiếp.<br />
                      • Đạt từ 7.0 điểm trở lên mới hiển thị đáp án chi tiết và giải thích.<br />
                      • Có gợi ý từ vựng trọng tâm cho từng câu.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-950/30 border border-red-900/40 p-3.5 rounded-xl">
                <h4 className="font-semibold text-red-200 flex items-center gap-2 mb-1 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Tính năng chuyển Tab thông minh:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bạn có thể thoải mái chuyển đổi giữa các tab trên thanh điều hướng phía trên. Tiến độ làm bài, đồng hồ đếm ngược và câu trả lời đã chọn sẽ <strong>được giữ nguyên vẹn</strong>, không bị mất!
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-xs sm:text-sm transition cursor-pointer"
                >
                  Đã hiểu & Bắt đầu làm bài
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
