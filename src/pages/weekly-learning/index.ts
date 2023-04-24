import "../../config/config.axios";
import { GET_attendance_items } from "../../apis/attendance_items";
import { GET_modules } from "../../apis/modules";
import { WeeklyLearningItems } from "./types";

const courseId = location.pathname.split("/")[2];
// const iframe = document.querySelector(".tool_launch");
// const iframeDocument = iframe.contentWindow.document;

if (location.pathname.split("/").pop() === "71") {
  setTimeout(async () => {
    const attendanceData = await GET_attendance_items(courseId);
    const modulesData = await GET_modules(courseId);

    // Object.values(attendanceData["attendance_summaries"]).forEach(
    //   (elem, index) => {
    //     document.querySelector(".tool_content_wrapper").innerHTML += `<div>
    //       ${elem["item_id"]} ${elem["attendance_status"]}
    //     </div>`;
    //   }
    // );

    const weeklyLearningItems: WeeklyLearningItems = [];
    modulesData.forEach((module) => {
      module["module_items"].forEach((module_item) => {
        console.log(attendanceData.attendance_summaries);
        console.log(module_item.content_id);
        weeklyLearningItems.push({
          title: module_item.title,
          url: `/${location.pathname
            .split("/")
            .slice(1, 3)
            .join("/")}/modules/items/${module_item.module_item_id}`,
          content_id: module_item.content_id,
          content_type: module_item.content_type,
          module_item_id: module_item.module_item_id,
          attendance_status:
            module_item.content_type == "attendance_item"
              ? attendanceData.attendance_summaries[module_item.content_id]
                  .attendance_status
              : "해당없음",
          use_attendance: module_item.content_data.use_attendance,
          due_at: module_item.content_data.due_at,
          late_at: module_item.content_data.late_at,
        });
      });
    });

    const weeklyLearningItemElems = [];
    const titles = [
      "동영상 (출석 미완료)",
      "동영상 (출석 완료)",
      "동영상 (유고결석)",
      "동영상 (결석)",
      "과제",
      "학습자료",
    ];

    // 출석체크 대상 && 출석 미완료
    weeklyLearningItemElems.push(
      weeklyLearningItems.map((item) => {
        if (item.use_attendance && item.attendance_status === "none") {
          return `<div onclick=location.href='${item.url}'>
          <h4>${item.title}</h4>
          <h5>${new Date(item.due_at).toLocaleString(
            "ko-KR"
          )}까지 출석이 인정됩니다.</h5>
          <h5>${new Date(item.late_at).toLocaleString(
            "ko-KR"
          )}까지 지각이 인정됩니다.</h5>
          </div>`;
        } else {
          return "";
        }
      })
    );

    // 출석체크 대상 && 출석 완료
    weeklyLearningItemElems.push(
      weeklyLearningItems.map((item) => {
        if (item.use_attendance && item.attendance_status === "attendance") {
          return `<div onclick=location.href='${item.url}'><h4>${item.title}</h4></div>`;
        } else {
          return "";
        }
      })
    );

    // 출석체크 대상 && 유고결석
    weeklyLearningItemElems.push(
      weeklyLearningItems.map((item) => {
        if (item.use_attendance && item.attendance_status === "excused") {
          return `<div onclick=location.href='${item.url}'>${item.title}</div>`;
        } else {
          return "";
        }
      })
    );

    // 출석체크 대상 && 결석
    weeklyLearningItemElems.push(
      weeklyLearningItems.map((item) => {
        if (item.use_attendance && item.attendance_status === "absent") {
          return `<div onclick=location.href='${item.url}'>${item.title}</div>`;
        } else {
          return "";
        }
      })
    );

    // 과제
    weeklyLearningItemElems.push(
      weeklyLearningItems.map((item) => {
        if (item.content_type === "assignment") {
          return `<div onclick=location.href='${item.url}'>${item.title}
          <div>${new Date(item.due_at).toLocaleString(
            "ko-KR"
          )}까지 출석이 인정됩니다.</div>
          </div>`;
        } else {
          return "";
        }
      })
    );

    // 학습자료
    weeklyLearningItemElems.push(
      weeklyLearningItems.map((item) => {
        if (item.content_type === "attendance_item" && !item.use_attendance) {
          return `<div onclick=location.href='${item.url}'>${item.title}</div>`;
        } else {
          return "";
        }
      })
    );

    for (let i = 0; i < 6; i++) {
      document.querySelector("#content").innerHTML +=
        "<div id=weekly-learning-items></div>";
      document.querySelector("#content").childNodes[
        i
      ].innerHTML += `<h1>${titles[i]}</h1>`;

      if (weeklyLearningItemElems.length) {
        weeklyLearningItemElems[i].forEach((elem) => {
          document.querySelector("#content").childNodes[i].innerHTML += elem;
        });
      } else {
        document.querySelector("#content").childNodes[i].innerHTML +=
          "해당 사항이 없습니다.";
      }
    }
  }, 1000);
}

// .then((res) => res.text())
// const data = JSON.parse(res.substring(9));
// let body = document.querySelector("body");
// body.innerHTML += `<div>${data.calendar.ics}</div>`;
