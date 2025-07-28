# 🐙 Octopus Agile Prices to Google Calendar

This Google Apps Script automatically fetches **Octopus Energy Agile tariff prices** every day at **4:30 PM UK time** (shortly after Octopus publishes the rates at 4 PM) and adds them to a dedicated Google Calendar.  

This is perfect for Agile tariff customers who want to easily see half-hourly electricity prices in their calendar.

---

## ✨ Features
- Fetches Agile tariff prices daily using the **Octopus Energy public API** (no API key required).
- Adds price slots as calendar events (e.g., "Agile: £0.15/kWh").
- Automatically runs every day at **4:30 PM UK time**.
- Clears old events daily to keep your calendar clean.
- 
---

## 📋 Prerequisites
- A Google account.
- Access to [Google Apps Script](https://script.google.com/).
- An [Octopus Energy Agile tariff](https://octopus.energy/agile/).
- Your **region’s tariff code** from the Octopus API.

---

## 🚀 Setup Instructions

### 1. Create a Google Calendar
1. Open [Google Calendar](https://calendar.google.com/).
2. Create a new calendar named **`Octopus Agile Prices`**.

---

### 2. Open Google Apps Script
1. Go to [https://script.google.com](https://script.google.com).
2. Click **New Project** and rename it (e.g., `Octopus Agile Calendar`).

---

### 3. Paste the Script
Copy the script from [`octopus-agile-calendar.gs`](octopus-agile-calendar.gs) in this repo and paste it into your Apps Script editor.

---

### 4. Find Your Tariff Code
1. Go to [https://api.octopus.energy/v1/products/](https://api.octopus.energy/v1/products/).
2. Find the current **Agile product** (e.g., `AGILE-24-10-01`).
3. Open it and find your **region tariff code** under `"single_register_electricity_tariffs"`.  
   Example:  
   - London: `E-1R-AGILE-24-10-01-L`  
   - Midlands: `E-1R-AGILE-24-10-01-M`

4. Replace the `apiUrl` in the script with your region's tariff code.

---

### 5. Authorize and Run
1. Click **Save**.
2. Select the function `createDailyTrigger` and click **Run**.
3. Authorize permissions when prompted.

This will:
- Set up a daily trigger at **4:30 PM UK time**.
- Automatically fetch Agile rates and populate your calendar.

