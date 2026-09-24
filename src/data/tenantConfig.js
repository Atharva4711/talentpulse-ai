// Multi-Tenant Client Architecture Configuration
// TalentPulse AI is a Client-Specific, White-Label B2B Recruitment Software.

export const CLIENT_TENANTS = {
  college_polytechnic: {
    id: 'college_polytechnic',
    name: 'Government Polytechnic Pune',
    clientType: 'Educational Institution (College Placement Cell)',
    division: 'Department of Information Technology & Computer Engineering',
    tagline: 'Authorized Institutional Placement & Campus Drive Automation System',
    vendorBadge: 'Deployed by Atharva Tech Solutions (Service Provider)',
    licenseStatus: 'Enterprise Academic License (Valid 2026)',
    accentColor: 'indigo',
    stats: {
      enrolledStudents: 120,
      activeDrives: 4,
      offersSecured: 48,
      highestPackage: '₹28 LPA'
    },
    drivesHeader: 'Institutional Campus Placement Drives (Approved for College Batch 2026)',
    drivesNotice: 'Private Institutional Drives: Open exclusively to enrolled final year diploma candidates with TPO eligibility clearance.',
    tpoTitle: 'TPO Placement Command Center — Government Polytechnic IT Dept'
  },
  corporate_tcs: {
    id: 'corporate_tcs',
    name: 'Tata Consultancy Services (TCS Global)',
    clientType: 'Enterprise Corporate Client',
    division: 'Campus Talent Acquisition & Technical Assessment Division',
    tagline: 'Enterprise Candidate Screening, Algorithmic Benchmark & HR Studio',
    vendorBadge: 'Configured by Atharva Tech Solutions (Service Provider)',
    licenseStatus: 'Corporate Commercial License #TCS-2026-ENT',
    accentColor: 'blue',
    stats: {
      enrolledStudents: 450,
      activeDrives: 2,
      offersSecured: 135,
      highestPackage: '₹11.5 LPA'
    },
    drivesHeader: 'TCS National Qualifier & Campus Engineering Drives',
    drivesNotice: 'Corporate Client Portal: Configured specifically for TCS Digital & Prime engineering recruitment tracks.',
    tpoTitle: 'TCS Talent Acquisition Command Center — Campus Hiring 2026'
  }
};
