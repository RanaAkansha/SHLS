// Load existing data or initialize
let userData = JSON.parse(localStorage.getItem('shlsUserData')) || {};
const today = new Date().toISOString().split('T')[0]; // e.g., "2025-08-15"

// Index.html logic (user registration)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form && window.location.pathname.includes('index.html')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const hostel = document.getElementById('hostel').value;
      const block = document.getElementById('block').value;
      const floor = document.getElementById('floor').value;
      const room = document.getElementById('room').value.trim();

      if (!name || !email || !hostel || !block || !floor || !room) {
        alert('Please fill all fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email.');
        return;
      }

      userData = { name, email, hostel, block, floor, room, date: today, activities: {} };
      localStorage.setItem('shlsUserData', JSON.stringify(userData));
      window.location.href = 'main.html';
    });
  }

  // Main.html logic (activity review)
  const mainForm = document.querySelector('form');
  if (mainForm && window.location.pathname.includes('main.html')) {
    // Reset activities if it's a new day
    if (userData.date !== today) {
      userData.activities = {};
      userData.date = today;
      localStorage.setItem('shlsUserData', JSON.stringify(userData));
    }

    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const activities = {
        morning_prayer: document.getElementById('task_1').value,
        yoga: document.getElementById('task_2').value,
        yagya: document.getElementById('task_3').value,
        shramdaan: document.getElementById('task_4').value,
        naad_yog: document.getElementById('task_5').value,
        evening_prayer: document.getElementById('task_6').value,
        feedback: document.getElementById('feedback').value.trim(),
        health: document.getElementById('agree').checked
      };

      if (!Object.values(activities).some(val => val === 'yes' || val)) {
        alert('Please select at least one activity or provide feedback.');
        return;
      }

      userData.activities = activities;
      localStorage.setItem('shlsUserData', JSON.stringify(userData));
      window.location.href = 'final.html';
    });
  }

  // final.html logic (confirmation)
  const content = document.getElementById('content');
  if (content && window.location.pathname.includes('final.html')) {
    userData = JSON.parse(localStorage.getItem('shlsUserData')) || {};
    const totalTasks = 6; // Number of activity selects
    const completedTasks = Object.values(userData.activities)
      .filter(val => val === 'yes').length;
    document.getElementById('task-count').textContent = completedTasks;
    document.getElementById('total-tasks').textContent = totalTasks;
  }
});