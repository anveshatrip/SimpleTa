function getTasks() 
{
  var stored=localStorage.getItem("taskmate_tasks");
  return stored?JSON.parse(stored):[];
}
function saveTasks(tasks) 
{
  localStorage.setItem("taskmate_tasks", JSON.stringify(tasks));
}
function deleteTask(id) {
  var tasks = getTasks().filter(function(t) { return t.id !== id; });
  saveTasks(tasks);
  Tasktable();
}


function addTask() 
{
  var input= document.getElementById("taskTitle");
  var title= input.value.trim();
  var tasks = getTasks();
  tasks.push({ id: Date.now(), title: title, done: false});
  saveTasks(tasks);
  input.value = "";
  Tasktable();
}
function markDone(id) 
{
  var tasks = getTasks().map(function(t) {
    if (t.id===id) { t.done = !t.done; }
    return t;
  });
  saveTasks(tasks);
  Tasktable();
}

function Tasktable() {
  var allTasks= getTasks();
  var tbody= document.getElementById("taskTableBody");
  var emptyMsg = document.getElementById("emptyMsg");

  var done= allTasks.filter(function(t) { return t.done; }).length;
  document.getElementById("totalCount").textContent= allTasks.length;
  document.getElementById("doneCount").textContent= done;
  document.getElementById("pendingCount").textContent= allTasks.length-done;

  if (allTasks.length === 0) {
    tbody.innerHTML = "";
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  var html = "";
  for (var i = 0; i < allTasks.length; i++) 
{
    var t= allTasks[i];
    var rowCls = t.done ? "done-row" : "";
    var status = t.done ? "Completed" : "Ongoing";
    html += "<tr class='" + rowCls + "' onclick='markDone(" + t.id + ")' title='Click to toggle'>";
    html += "<td>" + (i + 1) + "</td>";
    html += "<td class='task-title-cell'>" + escapeHtml(t.title) + "</td>";
    html += "<td>" + status + "</td>";
    html += "<td><button onclick='deleteTask(" + t.id + ")'> &#128465; </button></td>";
    html += "</tr>";
  }
  tbody.innerHTML = html;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

