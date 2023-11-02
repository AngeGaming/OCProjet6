const api = "http://localhost:5678/api";
const loginBtn = document.querySelector('.login-form');
loginBtn.addEventListener('submit', (e)=> loginForm(e));

async function loginForm(e) {
    e.preventDefault()
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password}) 
        })
        console.log(response)
        if (response.status===200){
            console.log('test')
            const data = await response.json()
            localStorage.setItem('token', data.token)
            window.location.href='./index.html'
        }else {
            const errorMsg = document.querySelector('.error-msg')
            errorMsg.textContent='Mots de passe et/ou email incorrectes'
        }
    }catch (err){
        console.log(err);
    }
};