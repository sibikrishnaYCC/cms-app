import file from './file.png';
import paper from './paper.png';
import timetable from './timetable.png';
import marksheet from './marksheet.png';
import studentdetails from './studentdetails.png';
import graph from './graph.png';
import percentage from './percentage.png';

const assets = [
  {
    name: file,
    width: 180,
    height: 180,
    x: -25,
    y: -30,
    title: "Course File",
    description: "PDF, Sheets, Docx, Images & more",
    route: "CourseFile"              // changed to page key format
  },
  {
    name: paper,
    width: 300,
    height: 240,
    x: -90,
    y: -40,
    title: "Question & Answer",
    description: "An image representing a question and answer sheet.",
    route: "QuestionAnswer"
  },
  {
    name: timetable,
    width: 300,
    height: 240,
    x: -80,
    y: -50,
    title: "TimeTable",
    description: "A visual representation of a class or student's timetable.",
    route: "TimeTable"
  },
  {
    name: marksheet,
    width: 250,
    height: 188,
    x: -70,
    y: -25,
    title: "Marksheet",
    description: "A student's academic performance marksheet.",
    route: "Marksheet"
  },
  {
    name: studentdetails,
    width: 220,
    height: 160,
    x: -20,
    y: -25,
    title: "Student Details",
    description: "Detailed personal and academic information of a student.",
    route: "StudentDetails"
  },
  {
    name: graph,
    width: 150,
    height: 150,
    x: -20,
    y: -20,
    title: "Student Performance",
    description: "Graphical representation of a student's academic performance.",
    route: "StudentPerformance"
  },
  {
    name: percentage,
    width: 170,
    height: 170,
    x: -20,
    y: -25,
    title: "Attendance Percentage",
    description: "Visual summary of attendance percentage statistics.",
    route: "AttendancePercentage"
  }
];

export default assets;
