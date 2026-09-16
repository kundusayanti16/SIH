import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { AVAILABLE_GRADES, AVAILABLE_SECTIONS, SUBJECT_OPTIONS } from '../data/mockData';
import { X, PlusCircle, Sparkles, BookOpen, Layers, Clock, MapPin, AlignLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CreateClassModal({ isOpen, onClose }) {
  const { currentUser, createClassroom, enterClassroom } = useSchool();

  const [grade, setGrade] = useState(currentUser?.gradeAssigned?.split(',')[0]?.trim() || "Class 6");
  const [section, setSection] = useState("A");
  const [subject, setSubject] = useState(currentUser?.subject || "General Science");
  const [customTitle, setCustomTitle] = useState("");
  const [room, setRoom] = useState("Room 204, Academic Block");
  const [schedule, setSchedule] = useState("Mon, Wed, Fri • 09:00 AM - 10:00 AM");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = customTitle.trim() || `${grade} - ${subject} (${section ? 'Sec ' + section : 'General'})`;

    const newClass = createClassroom({
      title,
      grade,
      section,
      subject,
      room,
      schedule,
      description: description || `Welcome to ${title}. All course curriculum, live lectures, assignments, and study materials will be shared here.`
    });

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    onClose();
    if (newClass?.id) {
      enterClassroom(newClass.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-[#E2E8DE] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#24332C]">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#5F9F7A]/15 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8DE]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#E7F2EB] text-[#397257] border border-[#CFE4D7]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#24332C]">Create New Classroom</h2>
              <p className="text-xs text-[#718078]">Classroom will be automatically accessible to targeted grade students</p>
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
          
          {/* Target Grade and Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#5F9F7A]" />
                Target Grade / Class *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs font-semibold focus:outline-none focus:border-[#5F9F7A] focus:ring-1 focus:ring-[#5F9F7A]"
                required
              >
                {AVAILABLE_GRADES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 flex items-center gap-1.5">
                Section
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs font-semibold focus:outline-none focus:border-[#5F9F7A] focus:ring-1 focus:ring-[#5F9F7A]"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="All">All Sections (A + B + C)</option>
              </select>
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#5F9F7A]" />
              Subject *
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs font-semibold focus:outline-none focus:border-[#5F9F7A] focus:ring-1 focus:ring-[#5F9F7A]"
              required
            >
              {SUBJECT_OPTIONS.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Custom Classroom Title */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#5F9F7A]" />
              Classroom Display Title (Optional)
            </label>
            <input
              type="text"
              placeholder={`e.g. ${grade} - ${subject} Mastery`}
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs placeholder:text-[#718078] focus:outline-none focus:border-[#5F9F7A] focus:ring-1 focus:ring-[#5F9F7A]"
            />
          </div>

          {/* Room & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#5F9F7A]" />
                Physical Room / Lab
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs focus:outline-none focus:border-[#5F9F7A]"
                placeholder="e.g. Science Lab 201"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#5F9F7A]" />
                Lecture Timings
              </label>
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs focus:outline-none focus:border-[#5F9F7A]"
                placeholder="e.g. Mon, Wed • 09:00 AM"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#718078] mb-1.5 flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-[#5F9F7A]" />
              Syllabus Summary & Welcome Message
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will students learn in this classroom?"
              className="w-full p-2.5 rounded-xl bg-[#F6F8F3] border border-[#E2E8DE] text-[#24332C] text-xs placeholder:text-[#718078] focus:outline-none focus:border-[#5F9F7A] resize-none"
            />
          </div>

          {/* Note */}
          <div className="p-3 rounded-xl bg-[#E7F2EB] border border-[#CFE4D7] text-[11px] text-[#397257]">
            ⚡ <strong>Instant Broadcast:</strong> Once created, this classroom will be published for <strong>{grade}</strong> students. Students of {grade} will be able to see this subject & teacher and click "Join".
          </div>

          {/* Actions */}
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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5F9F7A] to-[#397257] hover:from-[#4D8A67] hover:to-[#2D5B45] text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Publish Classroom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
