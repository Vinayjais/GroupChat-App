

async function GetResponse(){
    const email  = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  await axios.post('http://localhost:4000/validiate-user',{email,password})
  .then( async (response) =>{
           localStorage.setItem('token', response.data.token);
               

            window.location.href = '/vchat';
           
         
           
  })
  .catch((err) =>{
    console.log(err)
  })
}