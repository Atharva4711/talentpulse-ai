import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Play, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  HelpCircle, 
  AlertTriangle, 
  ChevronLeft,
  Cpu,
  Layers
} from 'lucide-react';
import { TECHNICAL_QUESTIONS, CODING_CHALLENGE } from '../data/mockData';

export default function TechnicalAssessmentView({ 
  isDark,
  activeDrive, 
  currentTenant,
  candidateState, 
  setCandidateState, 
  onProceedToInterview,
  onBackToAts 
}) {
  const [activeTab, setActiveTab] = useState('mcq'); // 'mcq' or 'coding'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [code, setCode] = useState(CODING_CHALLENGE.starterCode);
  const [testResults, setTestResults] = useState(null);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [techScore, setTechScore] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOptionSelect = (qId, optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleRunCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      try {
        let passedCount = 0;
        const results = CODING_CHALLENGE.testCases.map((tc, idx) => {
          let actual;
          try {
            const runner = new Function('nums', 'target', `
              ${code}
              return twoSum(nums, target);
            `);
            actual = runner([...tc.input.nums], tc.input.target);
          } catch (err) {
            actual = err.message;
          }

          const isPass = Array.isArray(actual) &&
            actual.length === tc.expected.length &&
            actual.slice().sort().every((v, i) => v === tc.expected.slice().sort()[i]);

          if (isPass) passedCount++;

          return {
            id: idx + 1,
            input: `nums = [${tc.input.nums}], target = ${tc.input.target}`,
            expected: `[${tc.expected}]`,
            actual: Array.isArray(actual) ? `[${actual}]` : String(actual),
            passed: isPass
          };
        });

        const allPassed = passedCount === CODING_CHALLENGE.testCases.length;
        setTestResults({
          allPassed,
          passedCount,
          total: CODING_CHALLENGE.testCases.length,
          details: results,
          latency: '0.38ms'
        });
      } catch (e) {
        setTestResults({
          allPassed: false,
          passedCount: 0,
          total: CODING_CHALLENGE.testCases.length,
          error: e.message
        });
      }
      setIsRunningCode(false);
    }, 400);
  };

  const handleSubmitAssessment = () => {
    let mcqCorrect = 0;
    TECHNICAL_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        mcqCorrect++;
      }
    });

    const mcqPercent = Math.round((mcqCorrect / TECHNICAL_QUESTIONS.length) * 100);
    const codePercent = testResults?.allPassed ? 100 : testResults?.passedCount ? (testResults.passedCount / testResults.total) * 100 : 0;
    const finalScore = Math.max(0, Math.round((mcqPercent * 0.4 + codePercent * 0.6) - (tabSwitches * 5)));

    setTechScore(finalScore);
    setIsSubmitted(true);

    setCandidateState(prev => ({
      ...prev,
      techResult: {
        passed: finalScore >= 60,
        score: finalScore,
        mcqScore: mcqPercent,
        codePassed: testResults?.allPassed || false,
        tabSwitches,
        timestamp: new Date().toISOString()
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <button
            onClick={onBackToAts}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to ATS Scanner
          </button>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Technical Skill Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Proctored Code Runner & Technical Fundamentals for <strong className="text-slate-900 dark:text-white">{activeDrive.title || activeDrive.role}</strong> at {currentTenant?.name || 'Client Organization'}
          </p>
        </div>

        {/* Live Proctoring & Timer Telemetry Bar */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
            timeLeft < 180 
              ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900' 
              : isDark
              ? 'bg-slate-900 text-slate-200 border-slate-700'
              : 'bg-white text-slate-800 border-slate-200 shadow-xs'
          }`}>
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
            tabSwitches > 0 
              ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900' 
              : isDark
              ? 'bg-slate-900 text-emerald-400 border-slate-700'
              : 'bg-white text-emerald-700 border-slate-200 shadow-xs'
          }`}>
            <ShieldAlert className="w-4 h-4" />
            <span>{tabSwitches === 0 ? 'Proctoring: Clear' : `Tab Switches: ${tabSwitches}`}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDark ? 'glass-panel-dark' : 'glass-panel-light'
      } space-y-6`}>
        
        {/* Navigation Tabs */}
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('mcq')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'mcq'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Section A: Core CS Fundamentals (4 Questions)</span>
          </button>

          <button
            onClick={() => setActiveTab('coding')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'coding'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Section B: Algorithmic Code Runner (Two Sum)</span>
          </button>
        </div>

        {/* Section A: MCQ Questions */}
        {activeTab === 'mcq' && (
          <div className="space-y-6 animate-in fade-in">
            {TECHNICAL_QUESTIONS.map((q, idx) => (
              <div 
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-800/40 border-slate-700/80' : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {q.topic}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Question {idx + 1} of 4</span>
                </div>

                <h3 className="text-sm font-bold leading-relaxed mb-4">{q.question}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionSelect(q.id, optIdx)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section B: Algorithmic Coding Challenge */}
        {activeTab === 'coding' && (
          <div className="space-y-4 animate-in fade-in">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold">{CODING_CHALLENGE.title}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {CODING_CHALLENGE.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {CODING_CHALLENGE.description}
              </p>
            </div>

            {/* Code Editor */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
              <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">solution.js</span>
                </div>
                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-xs"
                >
                  <Play className="w-3 h-3" />
                  <span>{isRunningCode ? 'Executing...' : 'Run Test Cases'}</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={9}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 outline-none leading-relaxed resize-none"
              />
            </div>

            {/* Test Results */}
            {testResults && (
              <div className={`p-4 rounded-2xl border ${
                testResults.allPassed
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800'
                  : 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    {testResults.allPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span>
                      {testResults.allPassed ? 'All Test Cases Passed!' : `Passed ${testResults.passedCount}/${testResults.total} Test Cases`}
                    </span>
                  </span>
                  <span className="text-[11px] font-mono opacity-80">Latency: {testResults.latency}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {testResults.details?.map(tc => (
                    <div key={tc.id} className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="font-mono font-bold">Case {tc.id}: {tc.passed ? '✓ Passed' : '✗ Failed'}</div>
                      <div className="text-[10px] text-slate-500">{tc.input}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit & Proceed */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {isSubmitted ? (
              <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Assessment Score: {techScore}%
              </span>
            ) : (
              <span>Complete Section A & B before final submission.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAssessment}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
              >
                Submit Technical Round
              </button>
            ) : (
              <button
                onClick={onProceedToInterview}
                disabled={techScore < 60}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  techScore >= 60
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Phase 3: Multimodal AI HR Interview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
