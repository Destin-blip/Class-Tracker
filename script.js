let students = [
    {
        name:"David okafor",
        admission:"G1A001"
    },
    {
        name:"Chidera Eze",
        admission:"G1A002"
    },
    {
        name:"Caleb Chucks",
        admission:"G1A003"
    },
    {
        name:"David Oluwatayo",
        admission:"G1A004"
    },
    {
        name:"Anyanwoke Destine",
        admission:"G1A005"
    },
    {
        name:"Grace Nwosu",
        admission:"G1A006"
    },
    {
        name:"Blessing Okeke",
        admission:"G1A007"
    },
    {
        name:"Samuel Bello",
        admission:"G1A008"
    }
];

const studentList = document.getElementById("studentList");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentModal = document.getElementById("studentModal");
const closeModal = document.getElementById("closeModal");
const confirmAddStudent = document.getElementById("confirmAddStudent");
const studentName = document.getElementById("studentName");
const admissionNumber = document.getElementById("admissionNumber");
const saveAttendance = document.getElementById("saveAttendance");

function displayStudents(list = students){
    studentList.innerHTML = "";
    list.forEach((student,index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <span class="student-name">${student.name}</span>
                <span class="admission">ADM:${student.admission}</span>
            </td>
            <td>
                <input type="checkbox" class="attendance-checkbox present" data-student="${student.admission}" data-status="Present">
            </td>
            <td>
                <input type="checkbox" class="attendance-checkbox absent"data-student="${student.admission}" data-status="Absent">
            </td>
            `;
        studentList.appendChild(row);
    });
    activateCheckboxes();
}

// make sure one checkbox for each student
function activateCheckboxes(){
    const checkboxes = document.querySelectorAll(".attendance-checkbox");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener(
            "change",function(){
                if (this.checked) {
                    const studentID = this.dataset.student;
                    const otherCheckboxes = document.querySelectorAll(
                        `[data-student="${studentID}"]`
                    );
                    otherCheckboxes.forEach(
                        other => {
                            if (other !== this) {
                                other.checked = false;
                            }
                        }
                    );
                }
            }
        );
    });
}

// modal buttons
addStudentBtn.addEventListener(
    "click",function(){
        studentModal.style.display = "flex";
        studentName.focus();
    }
);
closeModal.addEventListener(
    "click",
    function (){
        studentModal.style.display = "none";
    }
);
// stop

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1)
        .padStart(2, "0");
    const day = String(today.getDate())
        .padStart(2,"0");
    
    document.getElementById("attendanceDate").value = `
    ${year}-${month}-${day}
    `;

    confirmAddStudent.addEventListener(
        "click", function(){
            const name = studentName.value.trim();
            const admission = admissionNumber.value.trim();
            if (name === ""){
                alert ("Please enter the student's name.");
                return;
            }
            let newAdmission = admission;
            if (admission === ""){
                newAdmission = "G1A" + String(students.length +1)
                    .padStart(3,"0");
            }
            students.push({
                name: name,
                admission: newAdmission
            });
            displayStudents();
            studentName.value = "";
            admissionNumber.value = "";

            studentModal.style.display = "none";

            alert(
                `${name} has been added successfully` 
            );
        }
    );
displayStudents();