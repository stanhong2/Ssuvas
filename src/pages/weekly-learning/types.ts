export interface WeeklyLearningItem {
  title: string;
  url: string | null; // content_type 이 attendance_item 일때만 url 존재
  module_item_id: number;
  content_id: number;
  content_type: "assignment" | "attendance_item";
  attendance_status: "attendance" | "absent" | "excused" | "none";
  use_attendance: boolean;
  due_at: string;
  late_at: string;
}

export type WeeklyLearningItems = Array<WeeklyLearningItem>;
