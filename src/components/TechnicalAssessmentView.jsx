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
  ChevronLeft
} from 'lucide-react';
import { TECHNICAL_QUESTIONS, CODING_CHALLENGE } from '../data/mockData';

export default function TechnicalAssessmentView({ 
  activeDrive, 
  candidateState, 
  setCandidateState, 
  onProceedToInterview,
  onBackToAts 
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [code, setCode] = useState(CODING_CHALLENGE.starterCode);
  const [testResults, setTestResults] = useState(null);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [techScore, setTechScore] = useState(0);

  // Proctoring: Tab switch monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Timer countdown
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
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleRunTestCases = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      try {
        const runner = new Function(`${code}; return twoSum;`);
        const candidateFn = runner();

        const results = CODING_CHALLENGE.testCases.map((tc, idx) => {
          const startTime = performance.now();
          const userResult = candidateFn([...tc.nums], tc.target);
          const execTime = (performance.now() - startTime).toFixed(2);

          const isMatch = Array.isArray(userResult) && 
            userResult.length === 2 &&
            tc.expected.includes(userResult[0]) &&
            tc.expected.includes(userResult[1]);

          return {
            id: idx + 1,
            input: tc.input,
            expected: JSON.stringify(tc.expected),
            actual: JSON.stringify(userResult),
            passed: isMatch,
            execTime
          };
        });

        const passedCount = results.filter(r => r.passed).length;
        setTestResults({
          cases: results,
          allPassed: passedCount === results.length,
          passedCount,
          total: results.length
        });
      } catch (err) {
        setTestResults({
          error: err.message,
          allPassed: false,
          cases: []
        });
      }
      setIsRunningCode(false);
    }, 300);
  };

  const handleFinalSubmit = () => {
    let mcqScore = 0;
    TECHNICAL_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        mcqScore += 25;
      }
    });

    const codingScore = testResults?.allPassed ? 100 : (testResults?.passedCount ? (testResults.passedCount / testResults.total) * 100 : 75);
    const proctorPenalty = Math.min(20, tabSwitches * 5);
    const finalScore = Math.max(20, Math.min(100, Math.round((mcqScore * 0.5 + codingScore * 0.5) - proctorPenalty)));
    
    setTechScore(finalScore);
    setIsSubmitted(true);

    const passed = finalScore >= (activeDrive.minTechScore || 65);
    setCandidateState(prev => ({
      ...prev,
      techResult: {
        score: finalScore,
        mcqScore,
        codingScore,
        tabSwitches,
        passed,
        completed: true
      }
    }));
  };

  const isEligibleToProceed = isSubmitted && (techScore >= (activeDrive.minTechScore || 65));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl light-card border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToAts}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to ATS Scanner
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Phase 2: MNC Technical Assessment Round
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {activeDrive.company} Technical Challenge
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Section 1: Computer Science Fundamentals | Section 2: Algorithmic Code Execution
          </p>
        </div>

        {/* Live Timer & Proctoring Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200">
            <Clock className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span className="font-mono text-sm font-bold text-slate-900">{formatTime(timeLeft)}</span>
          </div>

          <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold ${
            tabSwitches === 0
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : tabSwitches <= 2
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <ShieldAlert className="w-4 h-4" />
            <span>Proctoring: {tabSwitches} Tab Switches</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Section 1 (MCQ) & Section 2 (Code Runner) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Section 1 (Core CS Questions) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" /> Section 1: CS Fundamentals
              </h2>
              <span className="text-xs text-slate-500 font-semibold">4 Questions</span>
            </div>

            <div className="space-y-5">
              {TECHNICAL_QUESTIONS.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-600">Q{idx + 1}. {q.category}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-medium">
                        {q.difficulty}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                      {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userChoice === optIdx;
                        let optionStyle = 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300';

                        if (isSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          } else if (isSelected) {
                            optionStyle = 'border-red-400 bg-red-50 text-red-900';
                          }
                        } else if (isSelected) {
                          optionStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-2xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleOptionSelect(q.id, optIdx)}
                            disabled={isSubmitted}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIdx === q.correctAnswer && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isSelected && optIdx !== q.correctAnswer && (
                              <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-[11px] text-slate-700 leading-relaxed">
                        <strong className="text-indigo-900">Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Section 2 (Interactive Code Challenge) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" /> Section 2: Algorithmic Challenge
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                {CODING_CHALLENGE.difficulty}
              </span>
            </div>

            {/* Problem Description */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-xs font-bold text-slate-900">{CODING_CHALLENGE.title}</div>
              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                {CODING_CHALLENGE.description}
              </p>
            </div>

            {/* In-Browser Code Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium">JavaScript (In-Browser Virtual Sandbox):</span>
                <button
                  onClick={handleRunTestCases}
                  disabled={isRunningCode || isSubmitted}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunningCode ? 'Evaluating...' : 'Run Test Cases'}</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isSubmitted}
                rows={11}
                className="w-full bg-slate-900 font-mono text-xs text-emerald-400 p-4 rounded-xl border border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed resize-none shadow-inner"
                spellCheck="false"
              />
            </div>

            {/* Test Results Console */}
            {testResults && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {testResults.allPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                    Test Results: {testResults.passedCount} / {testResults.total} Test Cases Passed
                  </span>
                  {testResults.allPassed && (
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded uppercase">
                      Optimal O(N) Complexity
                    </span>
                  )}
                </div>

                {testResults.error ? (
                  <div className="text-xs font-mono text-red-700 p-2 rounded bg-red-50 border border-red-200">
                    Syntax / Runtime Error: {testResults.error}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {testResults.cases.map(tc => (
                      <div key={tc.id} className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono shadow-2xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-500 font-semibold">Test Case {tc.id}</span>
                          <span className={tc.passed ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                            {tc.passed ? 'PASS' : 'FAIL'} ({tc.execTime}ms)
                          </span>
                        </div>
                        <div className="text-slate-700 truncate">Expected: {tc.expected}</div>
                        <div className="text-slate-500 truncate">Actual: {tc.actual}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Assessment Button */}
            {!isSubmitted ? (
              <button
                id="submit-technical-round-btn"
                onClick={handleFinalSubmit}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Technical Assessment & Grade</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Final Technical Assessment Score</div>
                    <div className="text-2xl font-black text-slate-900 mt-0.5">{techScore}%</div>
                  </div>
                  <div>
                    {isEligibleToProceed ? (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Passed Technical Cutoff (≥ {activeDrive.minTechScore}%)
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300">
                        Below Technical Cutoff ({activeDrive.minTechScore}%)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  id="proceed-to-interview-btn"
                  onClick={onProceedToInterview}
                  disabled={!isEligibleToProceed}
                  className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isEligibleToProceed
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <span>Proceed to Phase 3: Live Multimodal AI HR Interview</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
