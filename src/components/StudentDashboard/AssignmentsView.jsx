import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useLanguage } from '../../context/LanguageContext';
import { FileCheck, Clock, CheckCircle2, Award, Upload, ArrowRight } from 'lucide-react';

export default function AssignmentsView() {
  const { currentUser, studentEnrolledClassrooms, enterClassroom, submitAssignment } = useSchool();
  const { t, localizeSubject, localizeText } = useLanguage();
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'submitted'
  const [selectedAsg, setSelectedAsg] = useState(null);
  const [submitText, setSubmitText] = useState('');

  // Flatten all assignments across enrolled classrooms
  const allAssignments = studentEnrolledClassrooms.flatMap(c => {
    return (c.assignments || []).map(a => ({
      ...a,
      classId: c.id,
      classroomTitle: c.title,
      subject: c.subject,
      teacherName: c.teacherName
    }));
  });

  const filtered = allAssignments.filter(a => {
    if (filter === 'pending') return !a.submitted;
    if (filter === 'submitted') return a.submitted;
    return true;
  });

  const handleTurnIn = (e) => {
    e.preventDefault();
    if (!selectedAsg) return;
    submitAssignment(selectedAsg.classId, selectedAsg.id, submitText.trim() || "Attached homework submission.");
    setSelectedAsg(null);
    setSubmitText('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] text-xs font-bold uppercase mb-2">
            <FileCheck className="w-3.5 h-3.5" /> {t('sideAssignments') || 'Homework Tracker'}
          </div>
          <h1 className="text-2xl font-extrabold text-[#24332C] tracking-tight">
            {t('assignmentsTitle') || 'Assignments & Submissions'}
          </h1>
          <p className="text-xs text-[#718078]">{t('assignmentsSubtitle') || 'Manage all homework across your enrolled subjects'}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E2E8DE] shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filter === 'all' ? 'bg-[#5F9F7A] text-white shadow-sm' : 'text-[#718078] hover:text-[#24332C]'
            }`}
          >
            {t('tabAll') || 'All'} ({allAssignments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filter === 'pending' ? 'bg-[#5F9F7A] text-white shadow-sm' : 'text-[#718078] hover:text-[#24332C]'
            }`}
          >
            {t('tabPending') || 'Pending'} ({allAssignments.filter(a => !a.submitted).length})
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filter === 'submitted' ? 'bg-[#5F9F7A] text-white shadow-sm' : 'text-[#718078] hover:text-[#24332C]'
            }`}
          >
            {t('tabSubmitted') || 'Completed'} ({allAssignments.filter(a => a.submitted).length})
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((asg) => (
          <div
            key={asg.id}
            className="bg-white rounded-2xl p-5 border border-[#E2E8DE] flex flex-col justify-between space-y-4 hover:border-[#5F9F7A] transition-all shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]">
                  {localizeSubject(asg.subject)}
                </span>
                <span className="text-[11px] text-[#976C09] font-semibold flex items-center gap-1 bg-[#FEF8E8] px-2 py-0.5 rounded-full border border-[#F8DC8E]">
                  <Clock className="w-3.5 h-3.5" />
                  {t('dueBy') || 'Due'}: {localizeText(asg.dueDate)}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-[#24332C] mb-1">{localizeText(asg.title)}</h3>
              <p className="text-xs text-[#718078] leading-relaxed line-clamp-2">{localizeText(asg.description)}</p>
              
              <div className="mt-3 text-[11px] text-[#718078]">
                {t('teacherLabel') || 'Instructor'}: <strong className="text-[#24332C]">{asg.teacherName}</strong> • {asg.points} {t('pointsLabel') || 'Maximum Marks'}
              </div>
            </div>

            {/* Bottom actions */}
            <div className="pt-3 border-t border-[#E2E8DE] flex items-center justify-between">
              {asg.submitted ? (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-[#397257] font-bold bg-[#E7F2EB] px-3 py-1 rounded-full border border-[#CFE4D7]">
                    <CheckCircle2 className="w-4 h-4 text-[#5F9F7A]" />
                    <span>{t('statusSubmitted') || 'Turned In'}</span>
                  </span>
                  {asg.grade && (
                    <span className="text-xs font-bold text-[#3AA6A0] bg-[#EBF8F7] px-2.5 py-1 rounded-full border border-[#ACE3E0]">
                      {t('pointsLabel') || 'Score'}: {asg.grade}
                    </span>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setSelectedAsg(asg)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{t('btnSubmitWork') || 'Submit Solution'}</span>
                </button>
              )}

              <button
                onClick={() => enterClassroom(asg.classId)}
                className="text-xs text-[#718078] hover:text-[#24332C] flex items-center gap-1 font-semibold"
              >
                <span>{t('viewClassBtn') || 'View Class'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl p-8 border border-[#E2E8DE] shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-[#5F9F7A] mx-auto mb-2" />
          <h3 className="text-sm font-bold text-[#24332C]">{t('noAssignments') || 'No assignments in this filter'}</h3>
          <p className="text-xs text-[#718078] mt-1">{t('all')}: 0</p>
        </div>
      )}

      {/* Submit Modal */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E2E8DE] rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#24332C]">
            <h3 className="text-base font-bold text-[#24332C] mb-1">{t('btnSubmitWork') || 'Turn In'}: {selectedAsg.title}</h3>
            <p className="text-xs text-[#718078] mb-4">{localizeSubject(selectedAsg.subject)} • {selectedAsg.teacherName}</p>

            <form onSubmit={handleTurnIn} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#24332C] block mb-1">{t('btnSubmitWork') || 'Your Submission Note'}</label>
                <textarea
                  rows={3}
                  placeholder={t('writeCommentPlaceholder') || 'Type notes or solution remarks...'}
                  value={submitText}
                  onChange={(e) => setSubmitText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none resize-none"
                />
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-[#CFE4D7] bg-[#F6F8F3] text-center">
                <Upload className="w-5 h-5 text-[#5F9F7A] mx-auto mb-1" />
                <span className="text-[11px] text-[#24332C] block font-semibold">{t('attachmentsLabel') || 'Attached PDF / Notebook Photos'}</span>
                <span className="text-[10px] text-[#718078]">Homework_Solution.pdf (1.2 MB)</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8DE]">
                <button
                  type="button"
                  onClick={() => setSelectedAsg(null)}
                  className="px-4 py-2 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#718078] font-semibold"
                >
                  {t('cancel') || 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white font-bold shadow-sm"
                >
                  {t('btnSubmitWork') || 'Confirm Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
