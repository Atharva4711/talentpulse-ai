// Industry-Grade ATS Resume Scanner Engine
// Parses resume text against target Job Descriptions using industry heuristic algorithms

export function scanResume({ resumeText = '', jobDrive }) {
  if (!resumeText || !resumeText.trim()) {
    return {
      atsScore: 0,
      hardSkillsMatch: 0,
      softSkillsMatch: 0,
      quantificationScore: 0,
      formattingScore: 0,
      foundHardSkills: [],
      missingHardSkills: jobDrive?.requiredHardSkills || [],
      foundSoftSkills: [],
      missingSoftSkills: jobDrive?.requiredSoftSkills || [],
      redFlags: ['Resume content is empty. Please upload or paste a valid resume.'],
      recommendations: ['Upload a complete resume with education, technical skills, and projects.'],
      contactInfo: { email: null, phone: null, linkedin: null, github: null },
      metricsFound: []
    };
  }

  const text = resumeText;
  const lowerText = text.toLowerCase();

  // 1. Contact Information Detection
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+91[-.\s]?\d{10}|\b\d{10}\b/);
  const linkedinMatch = lowerText.includes('linkedin.com');
  const githubMatch = lowerText.includes('github.com');
  const portfolioMatch = lowerText.includes('.dev') || lowerText.includes('.tech') || lowerText.includes('portfolio') || lowerText.includes('http');

  const contactInfo = {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch,
    github: githubMatch,
    portfolio: portfolioMatch
  };

  // 2. Section Header Completeness Check
  const essentialSections = [
    { name: 'Education', patterns: ['education', 'academics', 'degree', 'b.tech', 'bachelor'] },
    { name: 'Technical Skills', patterns: ['skills', 'technologies', 'technical expertise', 'programming'] },
    { name: 'Projects / Experience', patterns: ['experience', 'projects', 'internship', 'work history'] },
    { name: 'Certifications', patterns: ['certification', 'achievements', 'awards', 'certifications'] }
  ];

  let sectionsFound = 0;
  const detectedSections = [];
  essentialSections.forEach(sec => {
    const found = sec.patterns.some(p => lowerText.includes(p));
    if (found) {
      sectionsFound++;
      detectedSections.push(sec.name);
    }
  });

  // 3. Hard Skills Matching
  const requiredHard = jobDrive?.requiredHardSkills || [];
  const foundHardSkills = [];
  const missingHardSkills = [];

  requiredHard.forEach(skill => {
    const normalized = skill.toLowerCase();
    // Handle punctuation or exact word boundary
    const regex = new RegExp(`(^|[^a-zA-Z0-9+])${escapeRegex(normalized)}([^a-zA-Z0-9+]|$)`, 'i');
    if (regex.test(lowerText) || lowerText.includes(normalized)) {
      foundHardSkills.push(skill);
    } else {
      missingHardSkills.push(skill);
    }
  });

  const hardSkillsMatch = requiredHard.length > 0 
    ? Math.round((foundHardSkills.length / requiredHard.length) * 100) 
    : 80;

  // 4. Soft Skills Matching
  const requiredSoft = jobDrive?.requiredSoftSkills || [];
  const foundSoftSkills = [];
  const missingSoftSkills = [];

  requiredSoft.forEach(skill => {
    const normalized = skill.toLowerCase();
    if (lowerText.includes(normalized)) {
      foundSoftSkills.push(skill);
    } else {
      missingSoftSkills.push(skill);
    }
  });

  const softSkillsMatch = requiredSoft.length > 0
    ? Math.round((foundSoftSkills.length / requiredSoft.length) * 100)
    : 75;

  // 5. Action-Oriented Quantification Check (Metrics / Numbers in bullets)
  // Industry ATS heavily grades measurable metrics (e.g., 'reduced by 40%', 'handled 500k queries', 'team of 8')
  const metricRegex = /\b(\d+%\b|\d+x\b|\d{1,3}(?:,\d{3})*\+?\b|\$\d+|\₹\d+)/gi;
  const rawMetricMatches = text.match(metricRegex) || [];
  const uniqueMetrics = [...new Set(rawMetricMatches.map(m => m.trim()))];
  
  let quantificationScore = 0;
  if (uniqueMetrics.length >= 6) quantificationScore = 100;
  else if (uniqueMetrics.length >= 4) quantificationScore = 85;
  else if (uniqueMetrics.length >= 2) quantificationScore = 65;
  else if (uniqueMetrics.length >= 1) quantificationScore = 40;
  else quantificationScore = 20;

  // 6. Formatting & Red Flags Detection
  const redFlags = [];
  const recommendations = [];

  if (!contactInfo.email) {
    redFlags.push('Missing direct email address in contact header.');
    recommendations.push('Include a professional email address (e.g. name@college.edu or name@gmail.com).');
  }
  if (!contactInfo.phone) {
    redFlags.push('Missing phone contact number.');
    recommendations.push('Provide a valid 10-digit phone number with country code (+91).');
  }
  if (!contactInfo.github && !contactInfo.portfolio) {
    redFlags.push('No GitHub or Portfolio link detected (Recommended for technical roles).');
    recommendations.push('Add an active GitHub profile showcasing repository commits and live project URLs.');
  }
  if (sectionsFound < 3) {
    redFlags.push(`Incomplete structure: Only detected ${sectionsFound} of 4 standard resume sections.`);
    recommendations.push('Organize content into explicit standard headings: EDUCATION, TECHNICAL SKILLS, PROJECTS, and ACHIEVEMENTS.');
  }
  if (quantificationScore < 50) {
    redFlags.push('Weak impact quantification: Bullets lack measurable statistics or percentages.');
    recommendations.push('Quantify your project outcomes (e.g. "Optimized API latency by 35%" or "Managed 1,000+ records").');
  }
  if (missingHardSkills.length > 0) {
    recommendations.push(`Targeted Missing Keywords to add for ${jobDrive?.title || jobDrive?.role || 'this position'}: ${missingHardSkills.slice(0, 4).join(', ')}.`);
  }

  // 7. Overall Weighted ATS Score Calculation
  // 40% Hard Skills + 15% Soft Skills + 20% Quantification + 15% Section Completeness + 10% Contact Completeness - Penalties
  const sectionScore = (sectionsFound / essentialSections.length) * 100;
  let contactScore = 0;
  if (contactInfo.email) contactScore += 30;
  if (contactInfo.phone) contactScore += 30;
  if (contactInfo.github || contactInfo.linkedin) contactScore += 40;

  let rawAts = (
    (hardSkillsMatch * 0.40) +
    (softSkillsMatch * 0.15) +
    (quantificationScore * 0.20) +
    (sectionScore * 0.15) +
    (contactScore * 0.10)
  );

  // Apply red flag penalties
  const penalty = Math.min(25, redFlags.length * 6);
  const finalAtsScore = Math.max(15, Math.min(99, Math.round(rawAts - penalty)));

  return {
    atsScore: finalAtsScore,
    hardSkillsMatch,
    softSkillsMatch,
    quantificationScore,
    sectionScore: Math.round(sectionScore),
    contactScore,
    contactInfo,
    sectionsFound: detectedSections,
    foundHardSkills,
    missingHardSkills,
    foundSoftSkills,
    missingSoftSkills,
    metricsFound: uniqueMetrics,
    redFlags,
    recommendations,
    passedCutoff: finalAtsScore >= (jobDrive?.minAtsScore || 65)
  };
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
