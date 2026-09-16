import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Layers, PlusCircle, Clock, Video, ArrowRight, Star, Users, Trash2 } from 'lucide-react';

export default function TeacherClassManager({ onOpenCreateClass }) {
  const { teacherMyClassrooms, enterClassroom, toggleLiveClass } = useSchool();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] text-xs font-bold uppercase mb-2">
            <Layers className="w-3.5 h-3.5" /> Classroom Command Center
          </div>
          <h1 className="text-2xl font-extrabold text-[#24332C] tracking-tight">
            All Managed Classrooms
          </h1>
          <p className="text-xs text-[#718078]">Classrooms created and instructed by you across all grades</p>
        </div>

        <button
          onClick={onOpenCreateClass}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Another Classroom</span>
        </button>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teacherMyClassrooms.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-[#E2E8DE] hover:border-[#5F9F7A] transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#397257] to-[#5F9F7A] text-white relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/25 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                  {c.grade} • Sec {c.section}
                </span>
                {c.isClassTeacherClass && (
                  <span className="text-[10px] font-bold bg-[#F4C95D] text-[#24332C] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-[#24332C]" /> Class Teacher Subject
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-base tracking-tight leading-snug line-clamp-1">
                {c.title}
              </h3>
              <p className="text-[11px] text-white/80 mt-0.5">{c.room}</p>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#718078] line-clamp-2 leading-relaxed">
                  {c.description}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-[#718078]">
                  <Clock className="w-3.5 h-3.5 text-[#5F9F7A]" />
                  <span className="text-[11px]">{c.schedule}</span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E2E8DE] flex items-center justify-between text-xs text-[#718078]">
                  <span>Code: <code className="font-mono text-[#397257] font-bold bg-[#E7F2EB] px-1.5 py-0.5 rounded border border-[#CFE4D7]">{c.code}</code></span>
                  <span>{c.enrolledStudentIds?.length || 0} Students</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-[#E2E8DE] flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleLiveClass(c.id, `${c.subject} - Live Session`)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    c.liveSession?.isActive
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#24332C] border border-[#E2E8DE]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{c.liveSession?.isActive ? 'Live Now' : 'Start Live'}</span>
                </button>

                <button
                  onClick={() => enterClassroom(c.id)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#5F9F7A] hover:bg-[#4D8A67] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Open Space</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
