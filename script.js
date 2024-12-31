// Replace with your own values
const sheetID = '141Ea_xHBXPi6rItn07EiJMrUjVU7m9AFP8HFJi-Dm8I'; // Your Sheet ID
const apiKey = 'AIzaSyCGAeE8tIC7tz0fHvUfVQdb36-v8htnd7k'; // Your API Key
const range = 'MATCH MVP!A2:F'; // Adjust range to include Team Name

// Google Sheets API URL
const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// Fetch data from the Google Sheet
fetch(sheetURL)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;

    if (!rows || rows.length === 0) {
      console.error('No data found in the sheet.');
      return;
    }

    // Assuming your columns are in this order: Team Name, Elims, Damage, Logo URL, Photo URL
    const [teamName, elims, damage, logoURL, photoURL] = rows[0];

    // Update the frontend with the fetched data
    document.getElementById('player-name').textContent = teamName;
    document.getElementById('player-elims').textContent = elims;
    document.getElementById('player-damage').textContent = damage;
    document.getElementById('player-logo').src = logoURL;
    document.getElementById('player-image').src = photoURL;
  })
  .catch(error => {
    console.error('Error fetching data from Google Sheets:', error);
  });
