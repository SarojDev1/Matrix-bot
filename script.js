// Replace these with your own values
const sheetID = '141Ea_xHBXPi6rItn07EiJMrUjVU7m9AFP8HFJi-Dm8I'; // Your Google Sheet ID
const apiKey = 'AIzaSyCGAeE8tIC7tz0fHvUfVQdb36-v8htnd7k'; // Your Google API Key
const range = 'MATCH MVP!A1:E'; // Data range in the sheet

// Google Sheets API URL
const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// Fetch data from the Google Sheet
fetch(sheetURL)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;

    // Skip the header row (rows[0]) and use the first data row (rows[1])
    const [playerName, elims, damage, logoURL, photoURL] = rows[1];

    // Update the HTML elements with the fetched data
    document.getElementById('player-name').textContent = playerName;
    document.getElementById('player-elims').textContent = elims;
    document.getElementById('player-damage').textContent = damage;
    document.getElementById('player-logo').src = logoURL;
    document.getElementById('player-image').src = photoURL;
  })
  .catch(error => {
    console.error('Error fetching data from Google Sheets:', error);
  });
