export default function (courseRecord: any) {
  courseRecord.instructorIds = courseRecord.course_instructors.map((ci: any) => ci.instructor.id)
  courseRecord.contentIds = courseRecord.course_contents.map((cc: any) => cc.content.id)
  return courseRecord
}