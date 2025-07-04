import React, { useState } from "react";
import {
  UserCircle,
  Landmark,
  Shield,
  Smartphone,
  Phone,
  MapPin,
  Mail,
  Calendar,
  School,
  Edit,
  Save,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Reusable input row – defined OUTSIDE the parent so its identity     */
/* stays the same across re‑renders and focus is preserved.            */
/* ------------------------------------------------------------------ */
function Field({ icon, label, fieldName, value, isEditing, handleChange }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-[var(--border-color)]">
      <div className="mt-1 text-[var(--text-muted)]">{icon}</div>
      <div className="flex-1">
        <div className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </div>
        {isEditing ? (
          <input
            type="text"
            value={value ?? ""}               
            onChange={(e) => handleChange(fieldName, e.target.value)}
            className="w-full py-1 px-2 border border-[var(--border-color)] rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[var(--ring-color)] bg-transparent text-[var(--text-color)] placeholder:text-[var(--text-muted)]"
          />
        ) : (
          <div className="font-medium py-1 text-[var(--text-color)]">
            {value || "—"}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentDetailCard({ student }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ ...student });

  const handleChange = (field, value) =>
    setEditedStudent((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    console.log("Saving student data:", editedStudent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedStudent({ ...student });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[var(--card-bg)] text-[var(--text-color)] rounded-xl shadow-md overflow-hidden border border-[var(--border-color)]">
      {/* ---------- Header ---------- */}
      <div className="bg-[var(--bg)] px-6 py-4 border-b border-[var(--border-color)] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-[var(--bg)] border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
            <UserCircle className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-xl font-bold border border-[var(--border-color)] rounded px-2 py-1 mb-1 focus:outline-none focus:ring-1 focus:ring-[var(--ring-color)] bg-transparent text-[var(--text-color)] placeholder:text-[var(--text-muted)]"
              />
            ) : (
              <h1 className="text-xl font-bold p-1 text-[var(--text-color)]">
                {student.name}
              </h1>
            )}
            <div className="flex gap-2">
              <span className="bg-gray-600 border border-[var(--border-color)] text-white px-2 py-1 rounded text-xs font-medium">
                Roll No: {student.rollNo}
              </span>
              <span className="bg-gray-600 border border-[var(--border-color)] text-white px-2 py-1 rounded text-xs font-medium">
                Admission: {student.admissionNo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-[var(--border-color)]">
              Personal Information
            </h2>

            <Field
              icon={<UserCircle className="w-5 h-5" />}
              label="Full Name"
              fieldName="name"
              value={editedStudent.name}
              isEditing={isEditing}
              handleChange={handleChange}
            />
            <Field
              icon={<Landmark className="w-5 h-5" />}
              label="Roll Number"
              fieldName="rollNo"
              value={editedStudent.rollNo}
              isEditing={isEditing}
              handleChange={handleChange}
            />
            <Field
              icon={<Shield className="w-5 h-5" />}
              label="Admission Number"
              fieldName="admissionNo"
              value={editedStudent.admissionNo}
              isEditing={isEditing}
              handleChange={handleChange}
            />
            <Field
              icon={<Shield className="w-5 h-5" />}
              label="Student Type"
              fieldName="type"
              value={editedStudent.type}
              isEditing={isEditing}
              handleChange={handleChange}
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-[var(--border-color)]">
              Contact Information
            </h2>

            <Field
              icon={<Smartphone className="w-5 h-5" />}
              label="Phone"
              fieldName="phone"
              value={editedStudent.phone}
              isEditing={isEditing}
              handleChange={handleChange}
            />
            <Field
              icon={<Phone className="w-5 h-5" />}
              label="Parent's Phone"
              fieldName="parentPhone"
              value={editedStudent.parentPhone}
              isEditing={isEditing}
              handleChange={handleChange}
            />
            <Field
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              fieldName="email"
              value={editedStudent.email}
              isEditing={isEditing}
              handleChange={handleChange}
            />
            <Field
              icon={<MapPin className="w-5 h-5" />}
              label="Address"
              fieldName="address"
              value={editedStudent.address}
              isEditing={isEditing}
              handleChange={handleChange}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[var(--border-color)]">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--bg)] rounded-lg p-4 border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Date of Birth
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.dob ?? ""}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full py-1 px-2 border border-[var(--border-color)] rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[var(--ring-color)] bg-transparent text-[var(--text-color)] placeholder:text-[var(--text-muted)]"
                />
              ) : (
                <p className="font-medium text-[var(--text-color)]">
                  {student.dob || "Not specified"}
                </p>
              )}
            </div>

            <div className="bg-[var(--bg)] rounded-lg p-4 border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2">
                <School className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Class & Section
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.class ?? ""}
                  onChange={(e) => handleChange("class", e.target.value)}
                  className="w-full py-1 px-2 border border-[var(--border-color)] rounded mt-1 focus:outline-none focus:ring-1 focus:ring-[var(--ring-color)] bg-transparent text-[var(--text-color)] placeholder:text-[var(--text-muted)]"
                />
              ) : (
                <p className="font-medium text-[var(--text-color)]">
                  {student.class || "Not specified"}
                </p>
              )}
            </div>

            <div className="bg-[var(--bg)] rounded-lg p-4 border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Status
                </span>
              </div>
              <div className="inline-block bg-transparent border border-[var(--border-color)] text-[var(--text-color)] px-2 py-1 rounded text-xs font-medium">
                {student.status || "Active"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-color)] bg-transparent border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-hover)] transition-colors"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--bg)] bg-[var(--text-color)] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--text-color)] bg-transparent border border-[var(--border-color)] rounded-lg hover:bg-[var(--border-hover)] transition-colors"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <div className="bg-[var(--bg)] px-6 py-4 border-t border-[var(--border-color)] flex justify-between">
        <div className="text-sm text-[var(--text-muted)]">
          Last updated: Today at 14:32
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-medium text-[var(--text-color)] hover:text-[var(--text-muted-hover)] transition-colors">
            View Attendance
          </button>
          <button className="text-sm font-medium text-[var(--text-color)] hover:text-[var(--text-muted-hover)] transition-colors">
            View Grades
          </button>
        </div>
      </div>
    </div>
  );
}
