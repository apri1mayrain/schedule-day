$(document).ready(function () {
  // Display the current date in the header of the page
  var currentDay = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(`Today is ${currentDay}`);

  // Global DOM Selectors
  var timeblock = $('.time-block');
  var saveBtn = $('.saveBtn');
  var clearBtn =$('.clearBtn');

  // Apply Class:
  // Apply the past, present, or future class to each timeblock
  // by comparing the timeblock's hour to the current hour
  function applyClass() {
    // Utilize the Day.js library to get the current hour, a number data type
    var currentHour = dayjs().hour();

    // Iterate each timeblock element
    timeblock.each(function () {
      // Get the timeblocks ID, or hour, and convert from string to number data type
      var hour = Number($(this).attr('id'));
      // Add past class to timeblock if the timeblocks hour is less than the current hour
      if (hour < currentHour) {
        $(this).addClass('past');
      }
      // Add present class to timeblock if the timeblocks hour is equal to the current hour
      if (hour === currentHour) {
        $(this).addClass('present');
      }
      // Add future class to timeblock if the timeblocks hour is greater than the current hour
      if (hour > currentHour) {
        $(this).addClass('future');
      }
    });
  }

  // Show Description:
  // Show any existing timeblock descriptions
  function showDescription() {
    // Iterate each timeblock element
    timeblock.each(function () {
      // Get the timeblock ID, or hour
      var hour = $(this).attr('id');
      // Get the hours' key value from local storage
      var description = localStorage.getItem(hour);
      console.log(`Hour: ${hour} Description: ${description}`);
      // Set the textarea text, to the description
      $(this).children('.description').text(description);
    });
  }

  // Save Description:
  // Save the timeblocks description to local storage
  // and notify user of saved schedule
  function saveDescription() {
    // Get the timeblock ID, or hour
    var hour = $(this).parent().attr('id');
    // Get the textarea input value, or timeblock description
    var description = $(this).siblings('.description').val();
    // Save key pair to local storage
    localStorage.setItem(hour, description);
    // Get the timeblock text, or hour AM/PM
    var displayHour = $(this).siblings('.hour').text();
    // Selects a paragraph element with ID = saved
    var savedAppt = $('#saved');
    // Add class to show successful action / change text to green
    savedAppt.addClass('text-success');
    // Set text to saved appointment notice
    savedAppt.text(`Saved ${displayHour} schedule \u2713`);
  }

  // Clear Schedule:
  // Reset local storage and page
  function clearSchedule() {
    // Clear local storage
    localStorage.clear();
    // Reload page
    location.reload();
  }

  // Save timeblock description when its save button is clicked
  saveBtn.on('click', saveDescription);

  // Clear schedule when button is clicked
  clearBtn.on('click', clearSchedule);

  // Call remaining functions
  applyClass();
  showDescription();
}); // End of document ready