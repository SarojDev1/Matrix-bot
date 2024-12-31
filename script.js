// Replace with your own values
const sheetID = '141Ea_xHBXPi6rItn07EiJMrUjVU7m9AFP8HFJi-Dm8I'; // Your Sheet ID
const apiKey = 'AIzaSyCGAeE8tIC7tz0fHvUfVQdb36-v8htnd7k'; // Your API Key
const range = 'MATCH MVP!A2:E'; // Adjust range to your sheet's data

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

    const container = document.getElementById('mvp-container');

    rows.forEach(row => {
      // Assuming your columns are in the order: Name, Elims, Damage, Logo URL, Photo URL
      const [playerName, elims, damage, logoURL, photoURL] = row;

      // Create player card
      const playerCard = document.createElement('div');
      playerCard.classList.add('mvp-card');

      // Add content to the card
      playerCard.innerHTML = `
        <img src="${logoURL}" alt="Player Logo">
        <h2>${playerName}</h2>
        <img src="${photoURL}" alt="Player Image">
        <div class="stats">
          <p><strong>Elims:</strong> ${elims}</p>
          <p><strong>Damage:</strong> ${damage}</p>
        </div>
      `;

      // Append card to the container
      container.appendChild(playerCard);
    });
  })
  .catch(error => {
    console.error('Error fetching data from Google Sheets:', error);
  });
