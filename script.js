// Replace with your own values
const sheetID = '141Ea_xHBXPi6rItn07EiJMrUjVU7m9AFP8HFJi-Dm8I'; // Your Sheet ID
const apiKey = 'AIzaSyCGAeE8tIC7tz0fHvUfVQdb36-v8htnd7k'; // Your API Key
const range = 'MATCH MVP!A2:F'; // Adjust range to include necessary columns

// Google Sheets API URL
const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// Default reset values
const defaultValues = {
  playerName: 'Team Name',
  elims: '0',
  damage: '0',
  logoURL: '',
  photoURL: '',
};

// Function to update the frontend
function updateFrontend(data) {
  const { playerName, elims, damage, logoURL, photoURL } = data;

  // Update fields or reset to default
  document.getElementById('player-name').textContent = playerName;
  document.getElementById('player-elims').textContent = elims;
  document.getElementById('player-damage').textContent = damage;
  document.getElementById('player-logo').src = logoURL || 'placeholder-logo.png'; // Add placeholder if empty
  document.getElementById('player-image').src = photoURL || 'placeholder-photo.png'; // Add placeholder if empty
}

// Function to fetch data from the Google Sheet
function fetchDataAndUpdate() {
  fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;

      if (!rows || rows.length === 0) {
        console.log('No data found in the sheet. Resetting fields.');
        updateFrontend(defaultValues); // Reset fields
        return;
      }

      // Assuming your columns are in this order: Team Name, Elims, Damage, Logo URL, Photo URL
      const [teamName, elims, damage, logoURL, photoURL] = rows[0];

      // Update the frontend with the fetched data
      updateFrontend({
        playerName: teamName || defaultValues.playerName,
        elims: elims || defaultValues.elims,
        damage: damage || defaultValues.damage,
        logoURL: logoURL || defaultValues.logoURL,
        photoURL: photoURL || defaultValues.photoURL,
      });
    })
    .catch(error => {
      console.error('Error fetching data from Google Sheets:', error);
      updateFrontend(defaultValues); // Reset fields in case of error
    });
}

// Fetch data every 1 second
setInterval(fetchDataAndUpdate, 1000);

// Initial fetch
fetchDataAndUpdate();

