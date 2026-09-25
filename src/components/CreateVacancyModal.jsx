import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  DollarSign,
  MapPin,
  Sparkles,
  Sliders
} from 'lucide-react';

export default function CreateVacancyModal({
  isOpen,
  onClose,
  isDark,
  currentTenant,
  onSaveOpening
}) {
  if (!isOpen) return null;

  const isCollege = currentTenant?.id === 'college_polytechnic';

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState(
    isCollege ? 'Department of Information Technology' : 'Core Product Engineering'
  );
  const [type, setType] = useState(
    isCollege ? 'Full-Time / Institutional Faculty' : 'Full-Time Corporate Hire'
  );
  const [salary, setSalary] = useState(
    isCollege ? '₹50,000 - 70,000 / month' : '₹9.0 - 14.0 LPA'
  );
  const [location, setLocation] = useState(
    isCollege ? 'Main Campus, Academic Block' : 'Tech Park / Hybrid'
  );
  const [description, setDescription] = useState('');
  const [hardSkillsInput, setHardSkillsInput] = useState('');
  const [hardSkills, setHardSkills] = useState(
    isCollege ? ['JavaScript', 'Python', 'Database Management'] : ['React', 'Node.js', 'PostgreSQL', 'Docker']
  );
  const [softSkillsInput, setSoftSkillsInput] = useState('');
  const [softSkills, setSoftSkills] = useState(
    isCollege ? ['Pedagogy', 'Student Mentorship', 'Classroom Delivery'] : ['Problem Solving', 'Team Collaboration', 'Agile Mindset']
  );
  const [minAtsScore, setMinAtsScore] = useState(65);
  const [minTechScore, setMinTechScore] = useState(65);
  const [error, setError] = useState('');

  const handleAddHardSkill = () => {
    const trimmed = hardSkillsInput.trim();
    if (trimmed && !hardSkills.includes(trimmed)) {
      setHardSkills([...hardSkills, trimmed]);
      setHardSkillsInput('');
    }
  };

  const handleRemoveHardSkill = (s) => {
    setHardSkills(hardSkills.filter(item => item !== s));
  };

  const handleAddSoftSkill = () => {
    const trimmed = softSkillsInput.trim();
    if (trimmed && !softSkills.includes(trimmed)) {
      setSoftSkills([...softSkills, trimmed]);
      setSoftSkillsInput('');
    }
  };

  const handleRemoveSoftSkill = (s) => {
    setSoftSkills(softSkills.filter(item => item !== s));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Position title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a brief job description.');
      return;
    }
    if (hardSkills.length === 0) {
      setError('Please add at least one required technical skill.');
      return;
    }

    const newOpening = {
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      department: department.trim(),
      type: type.trim(),
      salary: salary.trim(),
      location: location.trim(),
      description: description.trim(),
      requiredHardSkills: hardSkills,
      requiredSoftSkills: softSkills,
      minAtsScore: Number(minAtsScore),
      minTechScore: Number(minTechScore),
      interviewStages: ['ATS Resume Screening', 'Technical Competency Round', 'Multimodal HR & Behavioral Round']
    };

    onSaveOpening(newOpening);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl max-h-[90vh] rounded-3xl p-6 sm:p-8 shadow-2xl relative border overflow-hidden transition-all flex flex-col ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Create & Publish Employment Vacancy</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {currentTenant?.hrRoleLabel || 'HR Recruiter'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Posting for <strong className="text-slate-800 dark:text-slate-200">{currentTenant?.name}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="py-5 space-y-5 overflow-y-auto pr-1 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Position Title & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Position Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isCollege ? 'e.g. Assistant Professor in AI' : 'e.g. Cloud DevOps Engineer'}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600 focus:bg-white'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Department / Division *</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Department of Computer Engineering"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600 focus:bg-white'
                }`}
              />
            </div>
          </div>

          {/* Type, Salary, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Employment Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none cursor-pointer ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                {isCollege ? (
                  <>
                    <option value="Full-Time / Institutional Faculty">Full-Time Faculty</option>
                    <option value="Full-Time Technical Staff">Technical Staff</option>
                    <option value="Adjunct / Visiting Faculty">Visiting Faculty</option>
                    <option value="Laboratory Support Staff">Laboratory Support</option>
                  </>
                ) : (
                  <>
                    <option value="Full-Time Corporate Hire">Full-Time Corporate</option>
                    <option value="Contract / Specialist">Contract / Specialist</option>
                    <option value="Remote / Hybrid SDE">Remote SDE</option>
                  </>
                )}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Salary / Pay Scale</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder={isCollege ? '₹55,000 - 75,000 / mo' : '₹12 - 18 LPA'}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Campus / Tech Park"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Role Description & Responsibilities *</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline primary duties, coursework or project requirements, and team scope..."
              className={`w-full p-3 rounded-xl border text-xs outline-none resize-none ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Hard Skills Tag Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Required Technical Skills (ATS Keywords)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hardSkillsInput}
                onChange={(e) => setHardSkillsInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddHardSkill(); } }}
                placeholder="Type a skill and press Enter (e.g. C++, Java, AWS)"
                className={`flex-1 px-3.5 py-2 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={handleAddHardSkill}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {hardSkills.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                >
                  {s}
                  <button type="button" onClick={() => handleRemoveHardSkill(s)} className="hover:text-red-500 cursor-pointer">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Cutoffs Configuration Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">ATS Minimum Cutoff:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black">{minAtsScore}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={minAtsScore}
                onChange={(e) => setMinAtsScore(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">Technical Test Cutoff:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">{minTechScore}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={minTechScore}
                onChange={(e) => setMinTechScore(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-400 font-medium">
              Vacancy will be published immediately to applicant portal.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              >
                Publish Vacancy
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
