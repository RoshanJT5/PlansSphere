document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");
  const navLinks = document.querySelectorAll(".nav-link");

  // --- Instructor Data (Our simple database) ---
  const instructorsData = {
    "eleanor-vance": {
      name: "Dr. Astha Singh",
      department: "Mathematics Dept.",
      email: "astha123@example.edu",
      phone: "9879123456",
      office: "Room 301, Science Building",
      imgSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCH6qJDSMphDfcZ8TdnNHuSBNn1Iyna49YKdP--kWNpPvFtcDuYzaUDbdDNx2EK3u1WM5RegF0-xmxAMS8Dlwo3p8WDINnlec1IFIqB-mLpaWtQaEzVR1XGwQYn9IiAUYsY4CvEownXW_NNFnwkSSFGd4ow0ivPi2mI0YtcRKeQHHKw56Fwdjb51m1dveSiMf9LSN6MQyvK5XFoX3hqTaB2cKtINBiKPSn-0_X06-Ok9ZlYKNB9NilnUFLMXrNjEn6ZGD9AdZYgwrg",
      courses: [
        { code: "MATH101", name: "Calculus I", credits: 4 },
        { code: "MATH201", name: "Linear Algebra", credits: 3 },
        { code: "MATH301", name: "Differential Equations", credits: 3 },
      ],
    },
    "samuel-reed": {
      name: "Dr. Atharva Kamble",
      department: "Physics Dept.",
      email: "atharva123@example.edu",
      phone: "9876543210",
      office: "Room 305, Science Building",
      imgSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLUBAuh9N7keG6T6cQ1rj7NTi9QC1J-pW-zzca-yvFzqkhqkTg1_EPe1f0xnEIAFdWcBY3kSGfkL3PGrTn5B8mRYpuTMFqw9nsAszxx8eTNfnhly4x4iNmMthJb2r4m5zrO7vnUKbYuFdaKgwjjIGTgOceKSSwm6xofP6GllytqocOMeXa_aAWziA2aIGvxsmcdQi7EOP-gcVNuWwQdcjgUT_rfoZbe5q5EkDUPnW1L7vcWvqvEQuD-9qDU59IkwOn6dMClvBu68I",
      courses: [
        { code: "PHYS101", name: "General Physics I", credits: 4 },
        { code: "PHYS210", name: "Modern Physics", credits: 3 },
      ],
    },
    "olivia-bennett": {
      name: "Dr. Shreya Sharma",
      department: "Chemistry Dept.",
      email: "shreya05@example.edu",
      phone: "8123456789",
      office: "Room 210, Chemistry Hall",
      imgSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3g89ByGvD7t5W1Jtgbg_C_tmvssc5JeXAOBO7QEQ2qp9x_0uOkSz6ViP-k-CRmFDUsknF2WrFSP14g2q-X5UWVjkr3NOoyw1BGCRanlzJOnpvR0RYUCyhmq0MSlsD64QENwDy0M5D6yUYAByJgjgtUtXgauj6LyRyLTw_jovYUvARUdmFW7EVlhUP-N97U33aYBu61I5-npfBrFJax-Ozv3ATC7YsdZftWO4zAGw2-qVv3bCYiKdTk_trET-dtRjLs7FZW8SpXI0",
      courses: [
        { code: "CHEM101", name: "Intro to Chemistry", credits: 4 },
        { code: "CHEM220", name: "Organic Chemistry I", credits: 4 },
        { code: "CHEM221", name: "Organic Chemistry Lab", credits: 1 },
        { code: "CHEM350", name: "Biochemistry", credits: 3 },
      ],
    },
    "ethan-carter": {
      name: "Dr. Aditya Jaiswal",
      department: "Biology Dept.",
      email: "aditya21@example.edu",
      phone: "6344456789",
      office: "Room 112, Life Sciences Building",
      imgSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCprC3K-q2U0Up7ijK1sNrUXT3502MZH7vIrwRxYJ3qIfmrNEmCltCR3dcjdXgWR7v2Yln7NcfazqTrWF24sC_MP-1Sx7lFiSh4QSpHVh6CsIxERu3_vNaS-7ItqtTpkdYy4Jt6U9b3zG4FPHcUtz5WeVx9vxWccqaXDpsGQ82lxtIfrZEqi5H7_d4KBIcX9GCh-hkivrqQuLmERVESjNRX6QMoJ3zXrkrxdibgDADuJvzjGxr7GhdvQ2WcZJUyvYD8-RJzfE3saXQ",
      courses: [
        { code: "BIO101", name: "General Biology", credits: 4 },
        { code: "BIO205", name: "Genetics", credits: 3 },
        { code: "BIO310", name: "Cell Biology", credits: 3 },
      ],
    },
  };

  // --- Timetable Data Management ---
  let timetableData = {};
  const saveData = () => {
    localStorage.setItem("timetableData", JSON.stringify(timetableData));
  };
  const loadData = () => {
    const data = localStorage.getItem("timetableData");
    if (data) {
      timetableData = JSON.parse(data);
    } else {
      timetableData = {
        structure: {
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          numPeriods: 8,
          numBreaks: 2,
          breaks: [{ afterPeriod: 3 }, { afterPeriod: 6 }],
        },
        timings: {
          startTime: "08:00",
          periodDuration: 45,
          breakDurations: [{ duration: 15 }, { duration: 20 }],
          layout: {}, // Will store day-specific overrides
        },
        coreData: {
          subjects: [
            "Math",
            "Physics",
            "Chemistry",
            "English",
            "History",
            "Art",
            "Music",
          ],
          teachers: ["Mr. Smith", "Ms. Jones", "Dr. Evans", "Mrs. Davis"],
          classes: ["Grade 10-A", "Grade 10-B", "Grade 11-A"],
        },
        classConfigs: {},
      };
    }
  };

  // --- Color definitions and page mapping ---
  const colors = {
    active: { bg: "#2563eb", text: "#eff6ff" },
    hover: { bg: "#f1f5f9", text: "#2563eb" },
    default: { bg: "transparent", text: "#334155" },
  };
  const pageToSectionMap = {
    dashboard: "dashboard",
    "timetables-list": "timetables-list",
    structure: "timetables-list",
    timings: "timetables-list",
    "data-setup": "timetables-list",
    "class-editor": "timetables-list",
    timetable: "timetables-list",
    courses: "courses",
    instructors: "instructors",
    classrooms: "classrooms",
    settings: "settings",
    "nep-feature": "nep-feature",
  };

  // --- Logic for Instructor Profile Modal ---
  const initializeInstructorsPage = () => {
    const modal = document.getElementById("instructor-modal");
    if (!modal) return;
    const closeBtn = document.getElementById("modal-close-btn");
    const viewProfileBtns = document.querySelectorAll(".view-profile-btn");
    viewProfileBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const instructorId = btn.dataset.instructorId;
        const data = instructorsData[instructorId];
        if (data) {
          document.getElementById("modal-img").src = data.imgSrc;
          document.getElementById("modal-name").textContent = data.name;
          document.getElementById("modal-department").textContent =
            data.department;
          document.getElementById("modal-email").textContent = data.email;
          document.getElementById("modal-phone").textContent = data.phone;
          document.getElementById("modal-office").textContent = data.office;
          const coursesTableBody = document.getElementById(
            "modal-courses-table"
          );
          coursesTableBody.innerHTML = "";
          data.courses.forEach((course) => {
            const row = `<tr><td class="px-4 py-3 font-medium text-secondary-900">${course.code}</td><td class="px-4 py-3">${course.name}</td><td class="px-4 py-3">${course.credits}</td></tr>`;
            coursesTableBody.innerHTML += row;
          });
          modal.classList.remove("hidden");
        }
      });
    });
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target.id === "instructor-modal") modal.classList.add("hidden");
    });
  };

  // --- TIMETABLE SETUP LOGIC (4 STEPS) ---

  const initializeStructurePage = () => {
    loadData();
    const daysList = document.getElementById("working-days-list");
    const numPeriodsInput = document.getElementById("num-periods");
    const numBreaksInput = document.getElementById("num-breaks");
    const breakConfigContainer = document.getElementById(
      "break-config-container"
    );
    const nextBtn = document.getElementById("next-btn");
    numPeriodsInput.value = timetableData.structure.numPeriods;
    numBreaksInput.value = timetableData.structure.numBreaks;
    daysList.querySelectorAll("input").forEach((cb) => {
      cb.checked = timetableData.structure.workingDays.includes(cb.value);
    });
    const renderBreakInputs = () => {
      breakConfigContainer.innerHTML =
        '<h3 class="text-base font-semibold text-gray-900">Break Placement</h3><p class="text-sm text-gray-500">Define after which period each break occurs.</p>';
      const count = parseInt(numBreaksInput.value, 10) || 0;
      for (let i = 0; i < count; i++) {
        const breakInfo = timetableData.structure.breaks[i] || {};
        breakConfigContainer.innerHTML += `<div class="flex items-center gap-4 mt-2"><label class="font-medium">Break ${
          i + 1
        }</label><span>after Period</span><input type="number" value="${
          breakInfo.afterPeriod || ""
        }" data-index="${i}" class="break-after-period w-24 rounded-md border-gray-300"></div>`;
      }
    };
    renderBreakInputs();
    numBreaksInput.addEventListener("input", renderBreakInputs);

    // [FIXED] Next button logic to robustly sync Step 1 changes to Step 2
    nextBtn.addEventListener("click", () => {
      // 1. Get new values from the form
      const newNumPeriods = parseInt(numPeriodsInput.value, 10);
      const newWorkingDays = Array.from(
        daysList.querySelectorAll("input:checked")
      ).map((cb) => cb.value);

      // 2. Update the main structure data
      timetableData.structure.workingDays = newWorkingDays;
      timetableData.structure.numPeriods = newNumPeriods;
      timetableData.structure.numBreaks = parseInt(numBreaksInput.value, 10);
      timetableData.structure.breaks = Array.from(
        breakConfigContainer.querySelectorAll(".break-after-period")
      ).map((input, i) => ({ afterPeriod: parseInt(input.value, 10) }));

      // 3. Get all days that currently have a layout configuration
      const allLayoutDays = Object.keys(timetableData.timings.layout);

      // 4. Clean up days that are no longer working days to prevent stale data
      allLayoutDays.forEach((day) => {
        if (!newWorkingDays.includes(day)) {
          delete timetableData.timings.layout[day];
        }
      });

      // 5. Update the period count for all *current* working days
      newWorkingDays.forEach((day) => {
        if (!timetableData.timings.layout[day]) {
          timetableData.timings.layout[day] = {};
        }
        timetableData.timings.layout[day].numPeriods = newNumPeriods;
      });

      // 6. Save the fully updated data
      saveData();
    });
  };

  // --- Timings Page Logic ---
  const initializeTimingsPage = () => {
    loadData();

    const defaultStartTimeInput = document.getElementById("start-time");
    const defaultPeriodDurationInput =
      document.getElementById("period-duration");
    const breakDurationContainer = document.getElementById(
      "break-duration-container"
    );
    const gridHead = document.getElementById("layout-grid-head");
    const gridBody = document.getElementById("layout-grid-body");
    const nextBtn = document.getElementById("next-btn");

    const formatTime = (date) => date.toTimeString().slice(0, 5);
    const addMinutes = (date, minutes) =>
      new Date(date.getTime() + minutes * 60000);

    const updateAndRender = (event) => {
      const sourceElement = event ? event.target : null;

      // --- 1. Read All DOM Inputs and Update Data Object ---
      timetableData.timings.startTime = defaultStartTimeInput.value;
      timetableData.timings.periodDuration =
        parseInt(defaultPeriodDurationInput.value, 10) || 0;
      timetableData.timings.breakDurations = Array.from(
        breakDurationContainer.querySelectorAll(".break-duration")
      ).map((input) => ({ duration: parseInt(input.value, 10) || 0 }));

      gridHead
        .querySelectorAll(".day-periods-override, .day-duration-override")
        .forEach((input) => {
          const day = input.dataset.day;
          if (!timetableData.timings.layout[day])
            timetableData.timings.layout[day] = {};
          const value = parseInt(input.value, 10);
          if (input.classList.contains("day-periods-override")) {
            timetableData.timings.layout[day].numPeriods = value;
          } else {
            timetableData.timings.layout[day].periodDuration = value;
          }
        });

      gridBody
        .querySelectorAll(".period-checkbox, .period-duration")
        .forEach((input) => {
          const day = input.dataset.day;
          const periodIndex = parseInt(input.dataset.periodIndex, 10) - 1;
          if (!timetableData.timings.layout[day])
            timetableData.timings.layout[day] = {};
          if (!timetableData.timings.layout[day].periods)
            timetableData.timings.layout[day].periods = [];
          if (!timetableData.timings.layout[day].periods[periodIndex])
            timetableData.timings.layout[day].periods[periodIndex] = {};
          if (input.type === "checkbox") {
            timetableData.timings.layout[day].periods[periodIndex].enabled =
              input.checked;
          } else {
            timetableData.timings.layout[day].periods[periodIndex].duration =
              parseInt(input.value, 10);
          }
        });

      // --- 2. Apply Cascading Logic Based on Event Source ---
      if (sourceElement) {
        if (sourceElement.id === "period-duration") {
          const newDefaultDuration = timetableData.timings.periodDuration;
          timetableData.structure.workingDays.forEach((day) => {
            if (!timetableData.timings.layout[day])
              timetableData.timings.layout[day] = {};
            timetableData.timings.layout[day].periodDuration =
              newDefaultDuration;
            const numPeriods =
              (timetableData.timings.layout[day] || {}).numPeriods ||
              timetableData.structure.numPeriods;
            if (!timetableData.timings.layout[day].periods)
              timetableData.timings.layout[day].periods = [];
            for (let i = 0; i < numPeriods; i++) {
              if (!timetableData.timings.layout[day].periods[i])
                timetableData.timings.layout[day].periods[i] = {};
              timetableData.timings.layout[day].periods[i].duration =
                newDefaultDuration;
            }
          });
        } else if (sourceElement.classList.contains("day-duration-override")) {
          const day = sourceElement.dataset.day;
          const newDayDuration =
            timetableData.timings.layout[day].periodDuration;
          const numPeriods =
            (timetableData.timings.layout[day] || {}).numPeriods ||
            timetableData.structure.numPeriods;
          if (!timetableData.timings.layout[day].periods)
            timetableData.timings.layout[day].periods = [];
          for (let i = 0; i < numPeriods; i++) {
            if (!timetableData.timings.layout[day].periods[i])
              timetableData.timings.layout[day].periods[i] = {};
            timetableData.timings.layout[day].periods[i].duration =
              newDayDuration;
          }
        }
      }

      renderAll();
    };

    const renderBreakDurationInputs = () => {
      let html = '<h3 class="text-lg font-medium">Default Break Durations</h3>';
      for (let i = 0; i < timetableData.structure.numBreaks; i++) {
        const durationInfo = timetableData.timings.breakDurations[i] || {
          duration: 15,
        };
        html += `
          <div>
            <label class="block text-sm font-medium text-gray-700">Break ${
              i + 1
            } Duration (minutes)</label>
            <input type="number" value="${
              durationInfo.duration
            }" data-index="${i}" class="break-duration mt-1 block w-full rounded-md border-gray-300">
          </div>`;
      }
      breakDurationContainer.innerHTML = html;
    };

    const renderLayoutGrid = () => {
      const {
        workingDays,
        numPeriods: defaultNumPeriods,
        breaks,
      } = timetableData.structure;
      const {
        periodDuration: defaultPeriodDuration,
        startTime,
        breakDurations,
      } = timetableData.timings;

      let headHtml = `<tr class="bg-gray-50"><th class="p-2 font-semibold w-32">Time Slot</th>${workingDays
        .map((day) => `<th class="p-2 font-semibold">${day}</th>`)
        .join("")}</tr>`;
      const dayControlsHtml = workingDays
        .map((day) => {
          const dayLayout = timetableData.timings.layout[day] || {};
          const numPeriods = dayLayout.numPeriods || defaultNumPeriods;
          const periodDuration =
            dayLayout.periodDuration || defaultPeriodDuration;
          return `<td class="p-1 space-y-1 bg-gray-50">
                  <div class="flex items-center"><label class="text-xs mr-1">Periods:</label><input type="number" class="day-periods-override w-12 border-gray-300 rounded-sm p-0.5 text-xs text-center" value="${numPeriods}" data-day="${day}"></div>
                  <div class="flex items-center"><label class="text-xs mr-1">Duration:</label><input type="number" class="day-duration-override w-12 border-gray-300 rounded-sm p-0.5 text-xs text-center" value="${periodDuration}" data-day="${day}"></div>
                </td>`;
        })
        .join("");
      headHtml += `<tr class="border-b"><td class="p-1 font-medium bg-gray-100">Day Controls</td>${dayControlsHtml}</tr>`;
      gridHead.innerHTML = headHtml;

      let bodyHtml = "";
      const dailyCurrentTimes = {};
      workingDays.forEach((day) => {
        dailyCurrentTimes[day] = new Date(`1970-01-01T${startTime}:00`);
      });

      const maxPeriods = Math.max(
        0,
        ...workingDays.map(
          (day) =>
            (timetableData.timings.layout[day] || {}).numPeriods ||
            defaultNumPeriods
        )
      );

      for (let periodNum = 1; periodNum <= maxPeriods; periodNum++) {
        let periodRowCells = "";
        let timeSlotHtml = "";
        let periodExistsInThisRow = false;

        workingDays.forEach((day, dayIndex) => {
          const dayLayout = timetableData.timings.layout[day] || {};
          const dayNumPeriods = dayLayout.numPeriods || defaultNumPeriods;

          if (periodNum <= dayNumPeriods) {
            periodExistsInThisRow = true;
            const periodStartTime = new Date(dailyCurrentTimes[day]);
            const periodSpecificLayout =
              (dayLayout.periods || [])[periodNum - 1] || {};
            const periodDuration =
              periodSpecificLayout.duration ||
              dayLayout.periodDuration ||
              defaultPeriodDuration;
            const isEnabled = periodSpecificLayout.enabled !== false;
            const periodEndTime = addMinutes(periodStartTime, periodDuration);

            if (dayIndex === 0) {
              timeSlotHtml = `<td class="p-2 font-bold text-gray-600 bg-gray-50 align-middle">${formatTime(
                periodStartTime
              )} - ${formatTime(periodEndTime)}</td>`;
            }

            periodRowCells += `<td class="p-1">
                                <div class="flex items-center justify-center gap-1 bg-white rounded p-1 border">
                                  <input type="checkbox" data-day="${day}" data-period-index="${periodNum}" class="period-checkbox h-4 w-4" ${
              isEnabled ? "checked" : ""
            }>
                                  <input type="number" data-day="${day}" data-period-index="${periodNum}" value="${periodDuration}" class="period-duration w-12 p-0.5 text-xs text-center border-gray-300 rounded-sm">
                                </div>
                              </td>`;
            dailyCurrentTimes[day] = periodEndTime;
          } else {
            periodRowCells += `<td class="p-1 bg-gray-50"></td>`;
          }
        });

        if (periodExistsInThisRow) {
          bodyHtml += `<tr>${timeSlotHtml}${periodRowCells}</tr>`;
        }

        const breakInfo = breaks.find((b) => b.afterPeriod === periodNum);
        if (breakInfo) {
          const breakIndex = breaks.indexOf(breakInfo);
          const breakDuration = (breakDurations[breakIndex] || { duration: 15 })
            .duration;
          let breakTimeSlotHtml = "";

          workingDays.forEach((day, dayIndex) => {
            const breakStartTime = new Date(dailyCurrentTimes[day]);
            const breakEndTime = addMinutes(breakStartTime, breakDuration);
            if (dayIndex === 0) {
              breakTimeSlotHtml = `<td class="p-2 font-bold text-blue-800 bg-blue-100 align-middle">${formatTime(
                breakStartTime
              )} - ${formatTime(breakEndTime)}</td>`;
            }
            dailyCurrentTimes[day] = breakEndTime;
          });

          bodyHtml += `<tr>
                          ${breakTimeSlotHtml}
                          <td colspan="${workingDays.length}" class="p-2"><div class="timetable-cell bg-gray-200 text-gray-600 font-medium h-full flex items-center justify-center rounded-lg">Break</div></td>
                      </tr>`;
        }
      }
      gridBody.innerHTML = bodyHtml;
    };

    const renderAll = () => {
      renderBreakDurationInputs();
      renderLayoutGrid();
    };

    // --- Event Listeners ---
    defaultStartTimeInput.addEventListener("input", updateAndRender);
    defaultPeriodDurationInput.addEventListener("input", updateAndRender);
    breakDurationContainer.addEventListener("input", updateAndRender);
    gridHead.addEventListener("input", updateAndRender);
    gridBody.addEventListener("input", updateAndRender);

    nextBtn.addEventListener("click", () => {
      saveData();
    });

    defaultStartTimeInput.value = timetableData.timings.startTime;
    defaultPeriodDurationInput.value = timetableData.timings.periodDuration;
    renderAll();
  };

  const initializeDataSetupPage = () => {
    loadData();
    const container = document.getElementById("data-setup-container");
    if (!container) return;
    const lists = {
      subject: document.getElementById("subject-list"),
      teacher: document.getElementById("teacher-list"),
      class: document.getElementById("class-list"),
    };
    const inputs = {
      subject: document.getElementById("new-subject"),
      teacher: document.getElementById("new-teacher"),
      class: document.getElementById("new-class"),
    };
    const buttons = {
      subject: document.getElementById("add-subject-btn"),
      teacher: document.getElementById("add-teacher-btn"),
      class: document.getElementById("add-class-btn"),
    };
    const renderList = (type) => {
      const listEl = lists[type];
      const dataKey = type === "class" ? "classes" : type + "s";
      listEl.innerHTML = "";
      timetableData.coreData[dataKey].forEach((item) => {
        const li = document.createElement("li");
        li.className =
          "flex justify-between items-center bg-gray-50 p-2 rounded-md border text-sm";
        li.innerHTML = `<span>${item}</span><button data-item="${item}" class="remove-btn text-red-500 hover:text-red-700 font-bold">×</button>`;
        listEl.appendChild(li);
      });
    };
    const addItem = (type) => {
      const dataKey = type === "class" ? "classes" : type + "s";
      const value = inputs[type].value.trim();
      if (value && !timetableData.coreData[dataKey].includes(value)) {
        timetableData.coreData[dataKey].push(value);
        inputs[type].value = "";
        renderList(type);
        saveData();
      }
    };
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const item = e.target.dataset.item;
        const type = e.target.closest("ul").id.replace("-list", "");
        const dataKey = type === "class" ? "classes" : type + "s";
        timetableData.coreData[dataKey] = timetableData.coreData[
          dataKey
        ].filter((i) => i !== item);
        renderList(type);
        saveData();
      }
    });
    Object.keys(buttons).forEach((type) => {
      buttons[type].addEventListener("click", () => addItem(type));
      inputs[type].addEventListener("keyup", (e) => {
        if (e.key === "Enter") addItem(type);
      });
      renderList(type);
    });
  };

  const initializeClassEditorPage = () => {
    loadData();
    const container = document.getElementById("class-cards-container");
    if (!container) return;
    const { subjects, teachers, classes } = timetableData.coreData;

    const modal = document.getElementById("teacher-select-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const modalSaveBtn = document.getElementById("modal-save-btn");
    const modalCancelBtn = document.getElementById("modal-cancel-btn");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    const renderAllCards = () => {
      container.innerHTML = "";
      classes.forEach((className) => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-sm border flex flex-col";
        card.innerHTML = `<div class="p-4 border-b"><h3 class="text-xl font-bold text-gray-800">${className}</h3></div><div class="flex-grow p-4"><table class="w-full text-sm"><thead><tr class="border-b"><th class="text-left font-semibold p-2">Subject</th><th class="text-left font-semibold p-2">Periods / Week</th><th class="text-left font-semibold p-2">Assigned Teachers</th><th class="w-10"></th></tr></thead><tbody class="class-subject-list divide-y" data-class-name="${className}"></tbody></table></div><div class="p-4 bg-gray-50/70 border-t"><div class="flex gap-2"><select class="new-subject-select block w-full rounded-md border-gray-300 text-sm"><option value="">-- Assign Subject --</option>${subjects
          .map((s) => `<option value="${s}">${s}</option>`)
          .join(
            ""
          )}</select><button class="add-class-subject-btn px-4 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-700" data-class-name="${className}">Add</button></div></div>`;
        container.appendChild(card);
        renderClassSubjects(
          className,
          card.querySelector(".class-subject-list")
        );
      });
    };

    const renderClassSubjects = (className, tbody) => {
      tbody.innerHTML = "";
      const configs = timetableData.classConfigs[className] || [];
      if (configs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-gray-400">No subjects assigned yet.</td></tr>`;
      }
      configs.forEach((config, index) => {
        const row = document.createElement("tr");
        const teacherTokens = (config.teachers || [])
          .map(
            (teacher) =>
              `<span class="inline-flex items-center gap-1.5 bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">${teacher}<button class="remove-teacher-btn" data-class-name="${className}" data-index="${index}" data-teacher="${teacher}">×</button></span>`
          )
          .join("");

        row.innerHTML = `<td class="p-2 font-medium align-top">${config.subject}</td><td class="p-2 align-top"><input type="number" value="${config.periods}" class="periods-input w-20 border-gray-300 rounded-md p-1 text-sm" data-class-name="${className}" data-index="${index}"></td><td class="p-2 align-top"><div class="flex flex-wrap gap-1 items-center teacher-tokens-container">${teacherTokens}<button class="add-teacher-btn text-blue-600 hover:text-blue-800" data-class-name="${className}" data-index="${index}"><span class="material-symbols-outlined text-xl">add_circle</span></button></div></td><td class="p-2 text-center align-top"><button class="remove-class-subject-btn text-gray-400 hover:text-red-500" data-class-name="${className}" data-index="${index}"><span class="material-symbols-outlined">delete</span></button></td>`;
        tbody.appendChild(row);
      });
    };

    const openTeacherModal = (className, subjectIndex) => {
      const config = timetableData.classConfigs[className][subjectIndex];
      modalTitle.textContent = `Assign Teachers for ${config.subject}`;
      modalBody.innerHTML = "";

      teachers.forEach((teacher) => {
        const isChecked = (config.teachers || []).includes(teacher);
        modalBody.innerHTML += `<label class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"><input type="checkbox" value="${teacher}" class="h-4 w-4 rounded border-gray-300 text-blue-600" ${
          isChecked ? "checked" : ""
        }><span>${teacher}</span></label>`;
      });

      modal.classList.remove("hidden");

      modalSaveBtn.onclick = () => {
        const selectedTeachers = Array.from(
          modalBody.querySelectorAll("input:checked")
        ).map((cb) => cb.value);

        config.teachers = selectedTeachers;
        saveData();
        renderAllCards();
        modal.classList.add("hidden");
      };
    };

    const closeTeacherModal = () => {
      modal.classList.add("hidden");
    };

    container.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      const { className, index, teacher } = button.dataset;

      if (button.classList.contains("add-class-subject-btn")) {
        const subjectName = button.previousElementSibling.value;
        if (subjectName) {
          if (!timetableData.classConfigs[className])
            timetableData.classConfigs[className] = [];
          if (
            !timetableData.classConfigs[className].find(
              (s) => s.subject === subjectName
            )
          ) {
            timetableData.classConfigs[className].push({
              subject: subjectName,
              periods: 4,
              teachers: [],
            });
            saveData();
            renderAllCards();
          }
        }
      } else if (button.classList.contains("remove-class-subject-btn")) {
        timetableData.classConfigs[className].splice(index, 1);
        saveData();
        renderAllCards();
      } else if (button.classList.contains("add-teacher-btn")) {
        openTeacherModal(className, parseInt(index, 10));
      } else if (button.classList.contains("remove-teacher-btn")) {
        const config = timetableData.classConfigs[className][index];
        const teacherIndex = (config.teachers || []).indexOf(teacher);
        if (teacherIndex > -1) {
          config.teachers.splice(teacherIndex, 1);
          saveData();
          renderAllCards();
        }
      }
    });

    container.addEventListener("change", (e) => {
      if (e.target.classList.contains("periods-input")) {
        const { className, index } = e.target.dataset;
        timetableData.classConfigs[className][index].periods = parseInt(
          e.target.value,
          10
        );
        saveData();
      }
    });

    modalCancelBtn.addEventListener("click", closeTeacherModal);
    modalCloseBtn.addEventListener("click", closeTeacherModal);
    modal.addEventListener("click", (e) => {
      if (e.target.id === "teacher-select-modal") closeTeacherModal();
    });

    document.getElementById("generate-btn")?.addEventListener("click", () => {
      saveData();
      window.location.hash = "timetable";
    });
    renderAllCards();
  };

  const initializeTimetablePage = () => {
    loadData();
    const classSelector = document.getElementById("class-selector");
    const timetableHead = document.getElementById("timetable-head");
    const timetableBody = document.getElementById("timetable-body");

    if (!classSelector) return;

    const subjectColors = [
      { bg: "bg-blue-100", text: "text-blue-800" },
      { bg: "bg-green-100", text: "text-green-800" },
      { bg: "bg-yellow-100", text: "text-yellow-800" },
      { bg: "bg-purple-100", text: "text-purple-800" },
      { bg: "bg-red-100", text: "text-red-800" },
      { bg: "bg-indigo-100", text: "text-indigo-800" },
      { bg: "bg-pink-100", text: "text-pink-800" },
      { bg: "bg-teal-100", text: "text-teal-800" },
    ];
    const getColorForSubject = (subject) => {
      const subjectIndex = timetableData.coreData.subjects.indexOf(subject);
      return subjectColors[subjectIndex % subjectColors.length];
    };

    const generateScheduleForClass = (className) => {
      const classConfig = timetableData.classConfigs[className] || [];
      const { workingDays } = timetableData.structure;
      const layout = timetableData.timings.layout;
      const schedule = {};

      const periodsToSchedule = [];
      classConfig.forEach((config) => {
        for (let i = 0; i < config.periods; i++) {
          periodsToSchedule.push({
            subject: config.subject,
            teacher: (config.teachers || [])[0] || "N/A",
          });
        }
      });

      let availableSlots = [];
      workingDays.forEach((day) => {
        const dayLayout = layout[day] || {};
        const numPeriods =
          dayLayout.numPeriods || timetableData.structure.numPeriods;
        for (let i = 1; i <= numPeriods; i++) {
          const periodLayout = (dayLayout.periods || [])[i - 1] || {};
          if (periodLayout.enabled !== false) {
            availableSlots.push(`${day}-${i}`);
          }
        }
      });

      periodsToSchedule.sort(() => Math.random() - 0.5);
      availableSlots.forEach((slot, index) => {
        if (index < periodsToSchedule.length) {
          schedule[slot] = periodsToSchedule[index];
        }
      });
      return schedule;
    };

    const renderTimetable = (className) => {
      const schedule = generateScheduleForClass(className);
      const { workingDays, breaks } = timetableData.structure;

      timetableHead.innerHTML = `<tr><th class="w-40 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Time</th>${workingDays
        .map(
          (day) =>
            `<th class="w-1/5 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">${day}</th>`
        )
        .join("")}</tr>`;

      timetableBody.innerHTML = "";
      let currentTime = new Date(
        `1970-01-01T${timetableData.timings.startTime}:00`
      );
      const maxPeriods = Math.max(
        0,
        ...workingDays.map(
          (day) =>
            timetableData.timings.layout[day]?.numPeriods ||
            timetableData.structure.numPeriods
        )
      );

      for (let i = 1; i <= maxPeriods; i++) {
        let rowHtml = "";
        let timeSlotHtml = "";
        let periodHappensThisRow = false;
        let firstDayDuration = timetableData.timings.periodDuration;

        workingDays.forEach((day, dayIndex) => {
          const dayLayout = timetableData.timings.layout[day] || {};
          const numPeriods =
            dayLayout.numPeriods || timetableData.structure.numPeriods;

          if (i <= numPeriods) {
            periodHappensThisRow = true;
            const periodLayout = (dayLayout.periods || [])[i - 1] || {};
            const duration =
              periodLayout.duration ||
              dayLayout.periodDuration ||
              timetableData.timings.periodDuration;
            if (dayIndex === 0) firstDayDuration = duration;

            const slotId = `${day}-${i}`;
            const scheduledPeriod = schedule[slotId];

            if (scheduledPeriod) {
              const colors = getColorForSubject(scheduledPeriod.subject);
              rowHtml += `<td class="p-2 align-top"><div class="timetable-cell ${colors.bg} ${colors.text} h-full p-3 rounded-lg flex flex-col justify-center"><p class="font-bold text-sm">${scheduledPeriod.subject}</p><p class="text-xs">${scheduledPeriod.teacher}</p></div></td>`;
            } else {
              rowHtml += `<td class="p-2 align-top"><div class="h-full"></div></td>`;
            }
          } else {
            rowHtml += `<td class="p-2 align-top bg-gray-50"></td>`;
          }
        });

        if (periodHappensThisRow) {
          const startTime = new Date(currentTime);
          const endTime = new Date(
            startTime.getTime() + firstDayDuration * 60000
          );
          timeSlotHtml = `<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 align-top">${startTime
            .toTimeString()
            .slice(0, 5)} - ${endTime.toTimeString().slice(0, 5)}</td>`;
          timetableBody.innerHTML += `<tr class="h-24">${timeSlotHtml}${rowHtml}</tr>`;
          currentTime = endTime;
        }

        const breakInfo = breaks.find((b) => b.afterPeriod === i);
        if (breakInfo) {
          const breakDuration =
            (
              timetableData.timings.breakDurations[breaks.indexOf(breakInfo)] ||
              {}
            ).duration || 15;
          const startTime = new Date(currentTime);
          const endTime = new Date(startTime.getTime() + breakDuration * 60000);
          timetableBody.innerHTML += `<tr class="h-16 bg-gray-50"><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">${startTime
            .toTimeString()
            .slice(0, 5)} - ${endTime
            .toTimeString()
            .slice(0, 5)}</td><td colspan="${
            workingDays.length
          }" class="p-2"><div class="timetable-cell bg-gray-200 text-gray-600 font-medium h-full flex items-center justify-center rounded-lg">Break</div></td></tr>`;
          currentTime = endTime;
        }
      }
    };

    classSelector.innerHTML = timetableData.coreData.classes
      .map((c) => `<option value="${c}">${c}</option>`)
      .join("");
    classSelector.addEventListener("change", () => {
      renderTimetable(classSelector.value);
    });

    if (timetableData.coreData.classes.length > 0) {
      renderTimetable(timetableData.coreData.classes[0]);
    } else {
      timetableBody.innerHTML = `<tr><td colspan="${
        timetableData.structure.workingDays.length + 1
      }" class="text-center p-10 text-gray-500">No classes found. Please set up classes in Step 3.</td></tr>`;
    }
  };

  const initializeNEPFeaturePage = () => {
    // This function will be called when the hash changes to #nep-feature
    // Placeholder for NEP-specific logic and UI rendering
    // No action needed for this step as we are only creating the file
  };

  // --- Core Application Logic ---
  const loadContent = async (page) => {
    pageContent.innerHTML =
      '<p class="text-center text-secondary-500">Loading...</p>';
    try {
      const response = await fetch(`${page}.html`);
      if (!response.ok) throw new Error("Page not found.");
      const content = await response.text();
      pageContent.innerHTML = content;

      if (page === "instructors") {
        initializeInstructorsPage();
      } else if (page === "structure") {
        initializeStructurePage();
      } else if (page === "timings") {
        initializeTimingsPage();
      } else if (page === "data-setup") {
        initializeDataSetupPage();
      } else if (page === "class-editor") {
        initializeClassEditorPage();
      } else if (page === "timetable") {
        initializeTimetablePage();
      } else if (page === "nep-feature") {
        initializeNEPFeaturePage();
      }
    } catch (error) {
      pageContent.innerHTML = `<p class="text-center text-red-500">Error: Could not load page. ${error.message}</p>`;
    }
  };

  const updateNavStyles = () => {
    const currentPage = window.location.hash.substring(1) || "dashboard";
    const activeSection = pageToSectionMap[currentPage] || "";
    navLinks.forEach((link) => {
      const linkPage = new URL(link.href).hash.substring(1);
      const linkSection = pageToSectionMap[linkPage] || "";
      if (linkSection === activeSection) {
        link.style.backgroundColor = colors.active.bg;
        link.style.color = colors.active.text;
        link.style.fontWeight = "600";
      } else {
        link.style.backgroundColor = colors.default.bg;
        link.style.color = colors.default.text;
        link.style.fontWeight = "500";
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const currentPage = window.location.hash.substring(1) || "dashboard";
      const activeSection = pageToSectionMap[currentPage] || "";
      const linkPage = new URL(link.href).hash.substring(1);
      const linkSection = pageToSectionMap[linkPage] || "";
      if (linkSection !== activeSection) {
        link.style.backgroundColor = colors.hover.bg;
        link.style.color = colors.hover.text;
      }
    });
    link.addEventListener("mouseleave", () => {
      const currentPage = window.location.hash.substring(1) || "dashboard";
      const activeSection = pageToSectionMap[currentPage] || "";
      const linkPage = new URL(link.href).hash.substring(1);
      const linkSection = pageToSectionMap[linkPage] || "";
      if (linkSection !== activeSection) {
        link.style.backgroundColor = colors.default.bg;
        link.style.color = colors.default.text;
      }
    });
  });

  const handleRouteChange = () => {
    const page = window.location.hash.substring(1) || "dashboard";
    loadContent(page);
    updateNavStyles();
  };

  window.addEventListener("hashchange", handleRouteChange);
  handleRouteChange();
});
