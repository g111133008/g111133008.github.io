/* DISCV4 Phase 2 Report Configuration
   報告採用組裝式架構：不同 type 只決定要組裝哪些 section。
   report.html 不再寫 if(student/teacher/personal)。
*/
const DISCV4_REPORT_CONFIG = {
  student: {
    label: '學生版',
    theme: 'student',
    sections: ['commonPackage','studentPackage']
  },
  teacher: {
    label: '教師版',
    theme: 'teacher',
    sections: ['commonPackage','teacherPackage']
  },
  personal: {
    label: '個人版',
    theme: 'personal',
    sections: ['commonPackage','personalPackage']
  }
};
function getReportConfig(mode){
  return DISCV4_REPORT_CONFIG[normalizeMode(mode)] || DISCV4_REPORT_CONFIG.student;
}
