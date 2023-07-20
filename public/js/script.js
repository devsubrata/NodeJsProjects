const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');
const msgThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msgOne.innerHTML = 'Loading...';
    msgTwo.innerHTML = '';
    msgThree.innerHTML = '';

    const location = searchTerm.value;
    const url = `http://localhost:3000/weather?address=${location}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.error);
                msgOne.innerHTML = `<strong>${data.error}</strong>`;
            }else{
                let msg1 = data.location;
                let msg2 = data.forecast;
                let msg3 = `<strong>Latitude: </strong>${data.coordinates.latitude}<br />
                            <strong>longitude: </strong>${data.coordinates.longitude}`

                msgOne.innerHTML = `<strong>Location:</strong> ${msg1}`;
                msgTwo.innerHTML = `<strong>Weather Information:</strong><br><hr>${msg2}`;
                msgThree.innerHTML = `<strong>Coordinates:</strong><br><hr>${msg3}`;
            }
        })
});

document.getElementById('clear').addEventListener('click', () => {
    searchTerm.value = "";
    msgOne.innerHTML = '';
    msgTwo.innerHTML = '';
    msgThree.innerHTML = '';
});
