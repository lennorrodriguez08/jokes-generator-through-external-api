const getJokesBtn = document.querySelector('.get-jokes');

getJokesBtn.addEventListener('click', generateJokes);

function showMessage(message, error) {

    if (error === true) {

        const error = document.createElement('p');
        error.textContent = message;
        error.id = 'error-message';
        error.style.color = 'red';

        document.querySelector('form').append(error);
    }   
}

function generateJokes(e) {

    e.preventDefault();

    const numberOfJokes = document.querySelector('#number').value;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}?firstName=Ronnel&lastName=Rodriguez`, true);

    if (numberOfJokes === '' || numberOfJokes === '0') {

        showMessage('Please input a number of jokes to be generated.', true);

        setTimeout(function() {
            document.querySelector('#error-message').remove();
        }, 3000);

    }   else {
        xhr.onload = function() {

            const response = JSON.parse(this.responseText);

            let output = '';

            if (response.type === 'success') {

                console.log(response);

                response.value.forEach(function(joke) {

                    output += `
                    
                    <li>${joke.joke}</li>

                    `;

                });


            }   else {
                console.log('Something went wrong.');
            }

            document.querySelector('.jokes').innerHTML = output;
    
        }
    }

    xhr.send();

}