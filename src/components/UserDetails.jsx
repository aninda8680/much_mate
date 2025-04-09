import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Utensils,
  AlertTriangle,
  CheckCircle,
  User,
  School,
  Phone,
  BookOpen
} from "lucide-react";
import { auth, db } from "../config"; // Adjust path as needed
import { doc, setDoc } from "firebase/firestore";
import Aurora from "./Aurora"; // Import the Aurora component

const UserDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    course: "",
    section: "",
    semester: "",
    rollNumber: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);

  // Comprehensive list of departments and courses
  const departmentsWithCourses = {
    "Department of Computer Science and Engineering": [
      "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
      "Master of Technology (M.Tech) in Computer Science and Engineering"
    ],
    "Department of Electrical and Electronics Engineering": [
      "Bachelor of Technology (B.Tech) in Electrical and Electronics Engineering",
      "Master of Technology (M.Tech) in Electrical and Electronics Engineering"
    ],
    "Department of Civil Engineering": [
      "Bachelor of Technology (B.Tech) in Civil Engineering",
      "Master of Technology (M.Tech) in Structural Engineering"
    ],
    "Department of Mechanical Engineering": [
      "Bachelor of Technology (B.Tech) in Mechanical Engineering",
      "Master of Technology (M.Tech) in Mechanical Engineering"
    ],
    "Department of Physics": [
      "Bachelor of Science (B.Sc) in Physics",
      "Master of Science (M.Sc) in Physics"
    ],
    "Department of Chemistry": [
      "Bachelor of Science (B.Sc) in Chemistry",
      "Master of Science (M.Sc) in Chemistry"
    ],
    "Department of Mathematics": [
      "Bachelor of Science (B.Sc) in Mathematics",
      "Master of Science (M.Sc) in Mathematics"
    ],
    "Department of Forensic Science": [
      "Bachelor of Science (B.Sc) in Forensic Science",
      "Master of Science (M.Sc) in Forensic Science"
    ],
    "Department of Biological Sciences": [
      "Bachelor of Science (B.Sc) in Biological Sciences",
      "Master of Science (M.Sc) in Biological Sciences"
    ],
    "Department of Biotechnology": [
      "Bachelor of Science (B.Sc) in Biotechnology",
      "Master of Science (M.Sc) in Biotechnology"
    ],
    "Department of English Language and Literature": [
      "Bachelor of Arts (B.A) in English Language and Literature",
      "Master of Arts (M.A) in English Language and Literature"
    ],
    "Department of Bengali Language and Literature": [
      "Bachelor of Arts (B.A) in Bengali Language and Literature",
      "Master of Arts (M.A) in Bengali Language and Literature"
    ],
    "Department of History": [
      "Bachelor of Arts (B.A) in History",
      "Master of Arts (M.A) in History"
    ],
    "Department of Political Science": [
      "Bachelor of Arts (B.A) in Political Science",
      "Master of Arts (M.A) in Political Science"
    ],
    "Department of Sociology": [
      "Bachelor of Arts (B.A) in Sociology",
      "Master of Arts (M.A) in Sociology"
    ],
    "Department of Geography": [
      "Bachelor of Arts (B.A) in Geography",
      "Master of Arts (M.A) in Geography"
    ],
    "Department of Management": [
      "Bachelor of Business Administration (BBA)",
      "Master of Business Administration (MBA)"
    ],
    "Department of Commerce and Economics": [
      "Bachelor of Commerce (B.Com)",
      "Master of Commerce (M.Com)"
    ],
    "Department of Law": [
      "Bachelor of Arts and Bachelor of Laws (BA LL.B. Hons.)",
      "Bachelor of Business Administration and Bachelor of Laws (BBA LL.B. Hons.)",
      "Master of Laws (LL.M.)",
      "Doctor of Philosophy (Ph.D.) in Law"
    ],
    "Department of Education": [
      "Bachelor of Education (B.Ed)",
      "Master of Education (M.Ed)",
      "Doctor of Philosophy (Ph.D.) in Education"
    ],
    "Department of Journalism and Mass Communication": [
      "Bachelor of Arts (B.A) in Journalism and Mass Communication",
      "Master of Arts (M.A) in Journalism and Mass Communication"
    ],
    "Department of Films and Animation": [
      "Bachelor of Fine Arts (BFA) in Films and Animation",
      "Master of Fine Arts (MFA) in Films and Animation"
    ],
    "Department of Allied Health Sciences": [
      "Bachelor of Science (B.Sc) in Allied Health Sciences",
      "Master of Science (M.Sc) in Allied Health Sciences"
    ],
    "Department of Pharmaceutical Technology": [
      "Bachelor of Pharmacy (B.Pharm)",
      "Diploma in Pharmacy (D.Pharm)"
    ],
    "Department of Smart Agriculture": [
      "Bachelor of Science (B.Sc) in Smart Agriculture",
      "Master of Science (M.Sc) in Smart Agriculture"
    ]
  };

  // Get all department names for the dropdown
  const departments = Object.keys(departmentsWithCourses);

  // Update courses when department changes
  useEffect(() => {
    if (formData.department) {
      setAvailableCourses(departmentsWithCourses[formData.department] || []);
      // Reset course selection when department changes
      setFormData(prevState => ({
        ...prevState,
        course: ""
      }));
    } else {
      setAvailableCourses([]);
    }
  }, [formData.department]);

  const sections = ["A", "B", "C", "D", "E"];

  const semesters = [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester"
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = "Please select your department";
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = "Please select your course";
    }

    // Section validation
    if (!formData.section) {
      newErrors.section = "Please select your section";
    }

    // Semester validation
    if (!formData.semester) {
      newErrors.semester = "Please select your semester";
    }

    // Roll Number validation
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }

    // Contact Number validation
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid 10-digit contact number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (validateForm()) {
      setIsLoading(true);
      try {
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated");
        }

        // Save user details to Firestore
        await setDoc(doc(db, "userProfiles", user.uid), {
          uid: user.uid,
          email: user.email,
          name: formData.name,
          department: formData.department,
          course: formData.course,
          section: formData.section,
          semester: formData.semester,
          rollNumber: formData.rollNumber,
          contactNumber: formData.contactNumber,
          createdAt: new Date(),
        });

        // Set submission successful
        setIsSubmitted(true);
        console.log("User details saved:", formData);
      } catch (error) {
        console.error("Error saving user details:", error);
        setSubmitError("Failed to save your details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Aurora component props with orange color scheme
  const auroraProps = {
    colorStops: ["#FF8C00", "#FF4500", "#FF8C00"], // Orange color scheme
    amplitude: 0.8,
    blend: 0.6,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative p-6">
      {/* Aurora background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Aurora {...auroraProps} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-black rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10 border border-orange-500"
      >
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <CheckCircle className="mx-auto text-orange-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Your profile is complete!
            </h2>
            <p className="text-gray-300">
              Thanks for providing your details. You're all set to use
              MunchMate!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/signin")}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Sign In Now
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-center">
              <User className="mx-auto text-black" size={48} />
              <h2 className="text-3xl font-bold text-white mt-2">
                Complete Your Profile
              </h2>
              <p className="text-white text-opacity-90 mt-1">
                We need a few more details
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 pt-4">
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start"
                >
                  <AlertTriangle
                    size={20}
                    className="mr-2 flex-shrink-0 mt-0.5"
                  />
                  <span>{submitError}</span>
                </motion.div>
              )}

              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-lg mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full p-3 pl-10 rounded-lg border bg-gray-900 text-white ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-orange-500"
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.name}
                  </div>
                )}
              </motion.div>

              {/* Department Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-lg mb-2">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <School size={18} className="text-gray-400" />
                  </div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 rounded-lg border appearance-none bg-gray-900 text-white ${
                      errors.department
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-orange-500"
                    } focus:outline-none focus:ring-2`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.department && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.department}
                  </div>
                )}
              </motion.div>

              {/* Course Dropdown - Dynamic based on department selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-lg mb-2">
                  Course
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen size={18} className="text-gray-400" />
                  </div>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={!formData.department}
                    className={`w-full p-3 pl-10 rounded-lg border appearance-none bg-gray-900 text-white ${
                      errors.course
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-orange-500"
                    } focus:outline-none focus:ring-2 ${
                      !formData.department ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select Course</option>
                    {availableCourses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.course && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.course}
                  </div>
                )}
                {formData.department && availableCourses.length === 0 && (
                  <div className="text-yellow-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    No courses available for this department
                  </div>
                )}
              </motion.div>

              {/* Section Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-lg mb-2">
                  Section
                </label>
                <div className="relative">
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border appearance-none bg-gray-900 text-white ${
                      errors.section
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-orange-500"
                    } focus:outline-none focus:ring-2`}
                  >
                    <option value="">Select Section</option>
                    {sections.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.section && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.section}
                  </div>
                )}
              </motion.div>

              {/* Semester Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-lg mb-2">
                  Semester
                </label>
                <div className="relative">
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg border appearance-none bg-gray-900 text-white ${
                      errors.semester
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-orange-500"
                    } focus:outline-none focus:ring-2`}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.semester && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.semester}
                  </div>
                )}
              </motion.div>

              {/* Roll Number Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-lg mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter your Full Roll Number"
                  className={`w-full p-3 rounded-lg border bg-gray-900 text-white ${
                    errors.rollNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-orange-500"
                  } focus:outline-none focus:ring-2`}
                />
                {errors.rollNumber && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.rollNumber}
                  </div>
                )}
              </motion.div>

              {/* Contact Number Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mb-6"
              >
                <label className="block text-gray-300 text-lg mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                    className={`w-full p-3 pl-10 rounded-lg border bg-gray-900 text-white ${
                      errors.contactNumber
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-orange-500"
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
                {errors.contactNumber && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.contactNumber}
                  </div>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                className={`w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving Details...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default UserDetails;