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

export default function StudentDetailCard({ student }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ ...student });
  
  const handleChange = (field, value) => {
    setEditedStudent(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    // In a real app, you would send this data to your backend
    console.log("Saving student data:", editedStudent);
    setIsEditing(false);
    // Here you would typically call a parent component's update function
    // e.g., onSave(editedStudent);
  };
  
  const handleCancel = () => {
    setEditedStudent({ ...student });
    setIsEditing(false);
  };
  
  // Field components to reduce repetition
  const Field = ({ icon, label, fieldName, value, isEditing }) => (
    <div className="flex items-start gap-3 py-2 border-b border-gray-200">
      <div className="mt-1 text-gray-500">{icon}</div>
      <div className="flex-1">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </div>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        ) : (
          <div className="font-medium py-1">{value || "—"}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Card Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
            <UserCircle className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-xl font-bold border border-gray-300 rounded px-2 py-1 mb-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            ) : (
              <h1 className="text-xl font-bold">{student.name}</h1>
            )}
            <div className="flex gap-2">
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                Roll No: {student.rollNo}
              </span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                Admission: {student.admissionNo}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" /> Edit
            </button>
          )}
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
              Personal Information
            </h2>
            <Field 
              icon={<UserCircle className="w-5 h-5" />}
              label="Full Name"
              fieldName="name"
              value={editedStudent.name}
              isEditing={isEditing}
            />
            <Field 
              icon={<Landmark className="w-5 h-5" />}
              label="Roll Number"
              fieldName="rollNo"
              value={editedStudent.rollNo}
              isEditing={isEditing}
            />
            <Field 
              icon={<Shield className="w-5 h-5" />}
              label="Admission Number"
              fieldName="admissionNo"
              value={editedStudent.admissionNo}
              isEditing={isEditing}
            />
            <Field 
              icon={<Shield className="w-5 h-5" />}
              label="Student Type"
              fieldName="type"
              value={editedStudent.type}
              isEditing={isEditing}
            />
          </div>
          
          {/* Contact Information */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
              Contact Information
            </h2>
            <Field 
              icon={<Smartphone className="w-5 h-5" />}
              label="Phone"
              fieldName="phone"
              value={editedStudent.phone}
              isEditing={isEditing}
            />
            <Field 
              icon={<Phone className="w-5 h-5" />}
              label="Parent's Phone"
              fieldName="parentPhone"
              value={editedStudent.parentPhone}
              isEditing={isEditing}
            />
            <Field 
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              fieldName="email"
              value={editedStudent.email}
              isEditing={isEditing}
            />
            <Field 
              icon={<MapPin className="w-5 h-5" />}
              label="Address"
              fieldName="address"
              value={editedStudent.address}
              isEditing={isEditing}
            />
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Date of Birth</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full py-1 px-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              ) : (
                <p className="font-medium">{student.dob || "Not specified"}</p>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <School className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Class & Section</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.class}
                  onChange={(e) => handleChange("class", e.target.value)}
                  className="w-full py-1 px-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              ) : (
                <p className="font-medium">{student.class || "Not specified"}</p>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Status</span>
              </div>
              <div className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                {student.status || "Active"}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
        <div className="text-sm text-gray-500">
          Last updated: Today at 14:32
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
            View Attendance
          </button>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
            View Grades
          </button>
        </div>
      </div>
    </div>
  );
}

