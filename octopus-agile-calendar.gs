function addAgileRatesToCalendar() {
  const calendarName = "Octopus Agile Prices"; // Name of the calendar (create it in Google Calendar)
  const calendar = CalendarApp.getCalendarsByName(calendarName)[0];

  if (!calendar) {
    Logger.log("Calendar not found. Please create a calendar named 'Octopus Agile Prices'");
    return;
  }

  // Your Agile tariff endpoint (replace tariff code for your region)
  const apiUrl = "https://api.octopus.energy/v1/products/AGILE-24-10-01/electricity-tariffs/E-1R-AGILE-24-10-01-L/standard-unit-rates/";

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const periodFrom = today.toISOString();
  const periodTo = tomorrow.toISOString();

  const response = UrlFetchApp.fetch(apiUrl + "?period_from=" + periodFrom + "&period_to=" + periodTo);
  const data = JSON.parse(response.getContentText()).results;

  // Clear today's existing events (optional cleanup)
  const existingEvents = calendar.getEventsForDay(today);
  for (const event of existingEvents) {
    event.deleteEvent();
  }

  // Create new events for Agile rates
  data.forEach(item => {
    const startTime = new Date(item.valid_from);
    const endTime = new Date(item.valid_to);
    const price = item.value_inc_vat.toFixed(2);

    calendar.createEvent(`Agile: £${price}/kWh`, startTime, endTime, {
      description: `Octopus Agile rate: £${price}/kWh`
    });
  });

  Logger.log("Agile rates updated in calendar successfully!");
}

function createDailyTrigger() {
  // Delete any old triggers for clean setup
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === "addAgileRatesToCalendar") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create a new daily trigger at 4:30 PM UK time
  ScriptApp.newTrigger("addAgileRatesToCalendar")
    .timeBased()
    .everyDays(1)
    .atHour(16) // 16 = 4 PM UTC winter, but adjust for UK timezone below
    .nearMinute(30)
    .inTimezone("Europe/London") // Ensure UK time (BST/GMT)
    .create();
}
