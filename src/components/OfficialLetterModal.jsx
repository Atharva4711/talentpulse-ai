import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Award, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  Calendar, 
  FileText,
  ShieldCheck,
  Stamp
} from 'lucide-react';

export default function OfficialLetterModal({
  isOpen,
  onClose,
  isDark,
  candidate,
  currentTenant
}) {
  if (!isOpen || !candidate) return null;

  const isCollege = currentTenant?.id === 'college_polytechnic';
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const refNumber = isCollege 
    ? `GPI/HR-REC/2026/APPT-${candidate.rollNo?.replace(/[^0-9]/g, '') || '042'}`
    : `APEX/CORP-HR/2026/OFFER-${candidate.rollNo?.replace(/[^0-9]/g, '') || '101'}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-3xl max-h-[92vh] rounded-3xl p-6 sm:p-8 shadow-2xl relative border overflow-hidden transition-all flex flex-col ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Controls Header (Hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${
              isCollege ? 'bg-gradient-to-tr from-indigo-600 to-violet-600' : 'bg-gradient-to-tr from-purple-600 to-pink-600'
            }`}>
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                {isCollege ? 'Institutional Appointment Order' : 'Corporate Employment Offer Letter'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Selection Letter for <strong className="text-slate-900 dark:text-white">{candidate.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Printable Document Paper Sheet */}
        <div className="py-6 overflow-y-auto pr-1 flex-1 print:p-0 print:overflow-visible">
          <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-300 shadow-md font-serif text-xs leading-relaxed space-y-6 relative print:border-none print:shadow-none print:p-0">
            
            {/* Top Institutional Crest / Letterhead */}
            <div className="text-center pb-6 border-b-2 border-slate-900 space-y-1">
              <div className="flex items-center justify-center gap-2 mb-2 font-sans">
                {isCollege ? (
                  <div className="w-12 h-12 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-bold text-xl shadow">
                    GPI
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-bold text-xl shadow">
                    APX
                  </div>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide font-sans text-slate-900">
                {currentTenant?.name || 'Recruitment Board'}
              </h1>
              <p className="text-[11px] font-sans text-slate-600 font-semibold uppercase tracking-wider">
                {currentTenant?.division || 'Human Resources & Establishment Division'}
              </p>
              <p className="text-[10px] font-sans text-slate-500">
                Main Campus, Technology Corridor • Recognized & Licensed Under TalentPulse AI Platform
              </p>
            </div>

            {/* Reference & Dispatch Meta */}
            <div className="flex justify-between items-center text-[11px] font-sans border-b border-slate-200 pb-3 text-slate-600">
              <div>
                <strong>Dispatch Ref:</strong> <span className="font-mono text-slate-900">{refNumber}</span>
              </div>
              <div>
                <strong>Issue Date:</strong> <span>{currentDate}</span>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-1 font-sans text-xs">
              <div className="text-slate-500 font-semibold uppercase text-[10px]">Confidential / Formal Communication To:</div>
              <div className="text-sm font-black text-slate-900">{candidate.name}</div>
              <div className="text-slate-600 font-mono text-[11px]">Application Roll No: {candidate.rollNo}</div>
              <div className="text-slate-600">{candidate.email}</div>
            </div>

            {/* Subject */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-sans font-bold text-xs text-slate-900">
              {isCollege ? (
                <span>Subject: Formal Order of Appointment for the Position of <u>{candidate.driveApplied}</u></span>
              ) : (
                <span>Subject: Letter of Employment Offer for the Position of <u>{candidate.driveApplied}</u></span>
              )}
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-3 text-justify text-slate-800 text-[12px] leading-relaxed">
              <p>
                Dear <strong>{candidate.name}</strong>,
              </p>
              
              {isCollege ? (
                <>
                  <p>
                    Following the rigorous evaluation conducted through the <strong>TalentPulse Institutional Assessment System</strong> comprising automated ATS resume screening (<strong>{candidate.atsScore}%</strong>), subject-matter technical examination (<strong>{candidate.technicalScore}%</strong>), and the Multimodal Viva Voce & HR Pedagogical Review (<strong>{candidate.interviewScore}%</strong>), the Academic Recruitment Cell of <strong>{currentTenant?.name}</strong> is pleased to issue this formal <strong>Order of Appointment</strong> for the post of <strong>{candidate.driveApplied}</strong>.
                  </p>
                  <p>
                    <strong>1. Scale of Pay & Emoluments:</strong> You shall be positioned in Academic Pay Level 9A (₹56,100 - ₹82,400 per month) along with institutional Dearness Allowance and HRA as applicable.
                  </p>
                  <p>
                    <strong>2. Terms of Probation:</strong> You will be on statutory institutional probation for a period of twelve (12) months from your date of reporting. Satisfactory completion of probation will lead to permanent faculty confirmation.
                  </p>
                  <p>
                    <strong>3. Reporting Instructions:</strong> You are advised to report to the Office of the Registrar with original academic credentials, diploma engineering transcripts, and government photo identification within 15 working days.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    We are thrilled to offer you the position of <strong>{candidate.driveApplied}</strong> with <strong>{currentTenant?.name}</strong>. Your stellar performance across our ATS technical screening (<strong>{candidate.atsScore}%</strong>) and algorithmic code challenges confirms you will be an invaluable asset to our core engineering teams.
                  </p>
                  <p>
                    <strong>1. Compensation Package:</strong> Your total Annual Cost to Company (CTC) will be <strong>₹12,00,000 per annum</strong>, comprising Fixed Base (₹9,50,000), Annual Performance Bonus (₹1,50,000), and comprehensive corporate healthcare benefits.
                  </p>
                  <p>
                    <strong>2. Work Model & Location:</strong> This role follows our hybrid collaboration policy (3 days at our Technology Campus / 2 days remote).
                  </p>
                  <p>
                    <strong>3. Joining Timeline:</strong> Your official onboarding and induction sprint will commence on <strong>15th July 2026</strong>.
                  </p>
                </>
              )}
            </div>

            {/* Signatures & Official Institutional Stamp */}
            <div className="pt-8 border-t border-slate-200 flex items-end justify-between font-sans">
              <div className="space-y-1">
                <div className="w-24 h-8 border-b border-slate-900 border-dashed mb-1" />
                <div className="font-bold text-xs text-slate-900">
                  {isCollege ? 'Prof. V. K. Deshmukh' : 'Karan Singhania'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isCollege ? 'Dean & Head of Recruitment Cell' : 'VP of Engineering & Talent Acquisition'}
                </div>
                <div className="text-[9px] text-slate-400 font-mono">Digitally Verified via OmniRoute Gateway</div>
              </div>

              {/* Official Seal Badge */}
              <div className="w-24 h-24 rounded-full border-2 border-indigo-900/60 p-1 flex flex-col items-center justify-center text-center text-indigo-950 font-bold text-[8px] uppercase tracking-tighter rotate-[-6deg] bg-indigo-50/50">
                <div className="w-full h-full rounded-full border border-dashed border-indigo-900/60 flex flex-col items-center justify-center p-1">
                  <ShieldCheck className="w-4 h-4 text-indigo-800 mb-0.5" />
                  <span>{isCollege ? 'GPI ESTABLISHED' : 'APEX CORP'}</span>
                  <span className="font-black text-[9px]">OFFICIAL</span>
                  <span>VERIFIED 2026</span>
                </div>
              </div>

              <div className="space-y-1 text-right">
                <div className="w-24 h-8 border-b border-slate-900 border-dashed mb-1 ml-auto" />
                <div className="font-bold text-xs text-slate-900">
                  {isCollege ? 'Registrar, Government Polytechnic' : 'Director of Human Resources'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {currentTenant?.name}
                </div>
                <div className="text-[9px] text-slate-400 font-mono">Status: Formally Dispatched</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
