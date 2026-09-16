import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ClipboardList, PlusCircle, CheckCircle2, Clock, Star, Award, Users } from 'lucide-react';

export default function TeacherGrading({ onOpenCreateAsg }) {
  const { teacherMyClassrooms, createAssignment } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState(teacherMyClassrooms[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(25);
  const [dueDate, setDueDate] = useState('Next Week Friday');
  const [desc, setDesc] = useState('');

  const currentClass = teacherMyClassrooms.find(c => c.id === selectedClassId) || teacherMyClassrooms[0];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !selectedClassId) return;
    createAssignment(selectedClassId, {
      title: title.trim(),
      points: Number(points),
      dueDate,
      description: desc.trim()
    });
    setTitle('');
    setDesc('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7] text-xs font-bold uppercase mb-2">
            <ClipboardList className="w-3.5 h-3.5" /> Academic Assessment Studio
          </div>
          <h1 className="text-2xl font-extrabold text-[#24332C] tracking-tight">
            Assignments & Gradebook
          </h1>
          <p className="text-xs text-[#718078]">Create problem sets and review student submissions</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Assignment</span>
        </button>
      </div>

      {/* Classroom Filter Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-[#718078] uppercase mr-2">Select Class:</span>
        {teacherMyClassrooms.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedClassId(c.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedClassId === c.id
                ? 'bg-[#5F9F7A] text-white shadow-sm'
                : 'bg-white border border-[#E2E8DE] text-[#718078] hover:text-[#24332C]'
            }`}
          >
            {c.title} ({c.grade})
          </button>
        ))}
      </div>

      {/* Selected Classroom Assignments List */}
      {currentClass && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#24332C]">
              Assignments for {currentClass.title}
            </h2>
            <span className="text-xs text-[#397257] font-semibold">
              {currentClass.assignments?.length || 0} Total Tasks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentClass.assignments && currentClass.assignments.length > 0 ? (
              currentClass.assignments.map((asg) => (
                <div key={asg.id} className="bg-white rounded-2xl p-5 border border-[#E2E8DE] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#5F9F7A] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]">
                        {asg.points} Points
                      </span>
                      <span className="text-[11px] text-[#976C09] font-semibold flex items-center gap-1 bg-[#FEF8E8] px-2 py-0.5 rounded-full border border-[#F8DC8E]">
                        <Clock className="w-3.5 h-3.5" /> Due: {asg.dueDate}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#24332C] mb-1">{asg.title}</h3>
                    <p className="text-xs text-[#718078] leading-relaxed">{asg.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8DE] flex items-center justify-between text-xs">
                    <span className="text-[#397257] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#5F9F7A]" />
                      {asg.submissionsCount || 0} Turned In
                    </span>
                    <button
                      onClick={() => alert(`Reviewing submissions for ${asg.title}...`)}
                      className="px-3 py-1.5 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#24332C] border border-[#E2E8DE] font-semibold transition-colors"
                    >
                      Review Submissions
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 text-center py-12 bg-white rounded-2xl p-8 border border-[#E2E8DE] text-xs text-[#718078] shadow-sm">
                No assignments created yet for this classroom. Click "+ Create Assignment" to publish homework!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E2E8DE] rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#24332C]">
            <h3 className="text-base font-bold text-[#24332C] mb-4">Create Assignment</h3>
            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#24332C] block mb-1">Target Classroom *</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] font-semibold focus:border-[#5F9F7A] outline-none"
                >
                  {teacherMyClassrooms.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.grade})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#24332C] block mb-1">Assignment Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Lab Experiment Report"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#24332C] block mb-1">Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#24332C] block mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] focus:border-[#5F9F7A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#24332C] block mb-1">Description / Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Details for students..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] placeholder:text-[#718078] focus:border-[#5F9F7A] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8DE]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#F6F8F3] hover:bg-[#E7F2EB] text-[#718078] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white font-bold shadow-sm"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
