import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { X, KeyRound, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JoinClassModal({ isOpen, onClose }) {
  const { currentUser, joinByCode, studentGradeClassrooms } = useSchool();
  const [classCode, setClassCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!classCode.trim()) return;

    const success = joinByCode(classCode.trim());
    if (success) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
      onClose();
      setClassCode('');
    }
  };

  // Find unjoined classrooms in student's grade
  const unjoinedInGrade = studentGradeClassrooms.filter(
    c => !c.enrolledStudentIds?.includes(currentUser.id) && !currentUser.enrolledClassIds?.includes(c.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-[#E2E8DE] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#24332C]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8DE]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#24332C]">Join Classroom with Code</h2>
              <p className="text-xs text-[#718078]">Ask your teacher for the 6-character class code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#718078] hover:text-[#24332C] hover:bg-[#F6F8F3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 block">
              Enter Classroom Code:
            </label>
            <input
              type="text"
              placeholder="e.g. SCI6A-901 or MTH6A-402"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] font-mono text-sm tracking-wider uppercase placeholder:normal-case placeholder:font-sans placeholder:text-[#718078] focus:outline-none focus:border-[#5F9F7A] focus:ring-1 focus:ring-[#5F9F7A]"
              required
              autoFocus
            />
          </div>

          {/* Quick suggestions for user's grade */}
          {unjoinedInGrade.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE]">
              <span className="text-[11px] font-bold text-[#718078] uppercase tracking-wider block mb-2">
                Available Codes for {currentUser.grade}:
              </span>
              <div className="space-y-1.5">
                {unjoinedInGrade.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setClassCode(c.code)}
                    className="w-full text-left p-2 rounded-lg bg-white hover:bg-[#E7F2EB] border border-[#E2E8DE] flex items-center justify-between transition-colors text-xs shadow-sm"
                  >
                    <div>
                      <span className="font-semibold text-[#24332C]">{c.subject}</span>
                      <span className="text-[10px] text-[#718078] ml-2">by {c.teacherName}</span>
                    </div>
                    <code className="text-[#397257] font-mono font-bold bg-[#E7F2EB] px-2 py-0.5 rounded border border-[#CFE4D7] text-[11px]">
                      {c.code}
                    </code>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8DE]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#718078] text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#3AA6A0] to-[#5F9F7A] hover:from-[#2C8782] hover:to-[#4D8A67] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span>Join Class</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
