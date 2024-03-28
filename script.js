const form = document.getElementById('form');
const closeBtn = document.getElementById('close-btn');
const submitBtn = document.getElementById('submit-btn');
const createFormBtn = document.getElementById('create-form');

const firstName = document.getElementById('validateCustom01');
const firstNameError = document.getElementById('validateCustom01Error');
const lastName = document.getElementById('validateCustom02');
const lastNameError = document.getElementById('validateCustom02Error');
const email = document.getElementById('validateCustom03');
const emailError = document.getElementById('validateCustom03Error');
const address = document.getElementById('validateCustom04');
const addressError = document.getElementById('validateCustom04Error');
const dob = document.getElementById('validateCustom05');
const dobError = document.getElementById('validateCustom05Error');
const graduationYear = document.getElementById('validateCustom06');
const graduationYearError = document.getElementById('validateCustom06Error');

let setUsers = (users) =>{
    localStorage.setItem('users', JSON.stringify(users));
}

let getUsers = () =>{
    return JSON.parse(localStorage.getItem('users')) || [];
}

createFormBtn.addEventListener('click', ()=>{
    setDefaultRow();
    form.reset();
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation();
})

const formValidation = ()=>{
    resetForm();
    const firstName = document.getElementById('validateCustom01');
    const firstNameError = document.getElementById('validateCustom01Error');
    const lastName = document.getElementById('validateCustom02');
    const lastNameError = document.getElementById('validateCustom02Error');
    const email = document.getElementById('validateCustom03');
    const emailError = document.getElementById('validateCustom03Error');
    const address = document.getElementById('validateCustom04');
    const addressError = document.getElementById('validateCustom04Error');
    const dob = document.getElementById('validateCustom05');
    const dobError = document.getElementById('validateCustom05Error');
    const graduationYear = document.getElementById('validateCustom06');
    const graduationYearError = document.getElementById('validateCustom06Error');

    let isValid=true;   

    const textFieldCheck = (param1, param2)=>{
        if(param1.value.trim()===''){
            param1.classList.add('is-invalid');
            param2.innerHTML="Can't be empty!";
            isValid=false;
        }
    }

    const emailCheck = (param1, param2) => {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(param1.value)){
            param1.classList.add('is-invalid');
            param2.innerHTML='Invalid input!';
            isValid=false;
        }
    }

    const dobCheck = (param1, param2, yearDiff) => {
        const dobYear = new Date(param1.value).getFullYear();
        const CurrentYear = new Date().getFullYear();
        const dobDiff = CurrentYear-dobYear;

        if(param1.value===''){
            param1.classList.add('is-invalid');
            param2.innerHTML="Can't be empty!";
            isValid=false;
        }else if(dobDiff<yearDiff){
            param1.classList.add('is-invalid');
            param2.innerHTML="Min age should be 18!";
            isValid=false;
        }
    }

    const graduationCheck = (param1, param2, errorMsg1, errorMsg2, param3) => {
        const dobYear = new Date(param3.value).getFullYear();
        const graduationYear = new Date(param1.value).getFullYear();
        const currentYear = new Date().getFullYear();
        if(param1.value===''){
            param1.classList.add('is-invalid');
            param2.innerHTML="Can't be empty!";
            isValid=false;
        }
        if(graduationYear<dobYear){
            param1.classList.add('is-invalid');
            param2.innerHTML=errorMsg1;
            isValid=false;
        }else if(graduationYear>currentYear){
            param1.classList.add('is-invalid');
            param2.innerHTML=errorMsg2;
            isValid=false;
        }
    }

    const sessionStartError = (param1, param2, param3, param4) => {
        const dobYear = new Date(param3.value).getFullYear();
        const StartYear = new Date(param1.value).getFullYear();
        const passoutYear = new Date(param4.value).getFullYear();
        const CurrentYear = new Date().getFullYear();

        if(param1.value===''){
            param1.classList.add('is-invalid');
            param2.innerHTML="Can't be empty";
            isValid=false;
        }else if(StartYear<dobYear){
            param1.classList.add('is-invalid');
            param2.innerHTML="Must after dob year!";
            isValid=false;
        }else if(StartYear>passoutYear){
            param1.classList.add('is-invalid');
            param2.innerHTML="Must before passout year!";
            isValid=false;
        }else if(StartYear>CurrentYear){
            param1.classList.add('is-invalid');
            param2.innerHTML="Must before current year!";
            isValid=false;
        }
    }
    const sessionPassoutError = (param1, param2, param3) => {
        const StartYear = new Date(param3.value).getFullYear();
        const passoutYear = new Date(param1.value).getFullYear();
        const CurrentYear = new Date().getFullYear();

        if(param1.value===''){
            param1.classList.add('is-invalid');
            param2.innerHTML="Can't be empty";
            isValid=false;
        }else if(StartYear>passoutYear){
            param1.classList.add('is-invalid');
            param2.innerHTML="Must be after start year!";
            isValid=false;
        }else if(passoutYear>CurrentYear){
            param1.classList.add('is-invalid');
            param2.innerHTML="Must before current year!";
            isValid=false;
        }
    }

    textFieldCheck(firstName, firstNameError);
    textFieldCheck(lastName, lastNameError);
    textFieldCheck(address, addressError);
    emailCheck(email, emailError);
    dobCheck(dob, dobError, 18);
    graduationCheck(graduationYear, graduationYearError, "Can't be before dob year!", "Can't be on or after current year!", dob);

    let rows = document.querySelectorAll('#secondary-tbody tr');

    for(const row of rows){

        const university = row.querySelector('.university');
        const universityError = row.querySelector('.universityError');
        const college = row.querySelector('.college');
        const collegeError = row.querySelector('.collegeError');
        const startYear = row.querySelector('.startYear');
        const startYearError = row.querySelector('.startYearError');
        const passoutYear = row.querySelector('.passoutYear');
        const passoutYearError = row.querySelector('.passoutYearError');

        textFieldCheck(university, universityError);
        textFieldCheck(college, collegeError);
        sessionStartError(startYear, startYearError, dob, passoutYear);
        sessionPassoutError(passoutYear, passoutYearError, startYear);
    }    


    if(isValid){
        if(submitBtn.getAttribute('data-bs-action')==='update'){
            updateUserToList();
            alert('user updated successfully!');
        }else {
            addUser();
            alert('user added successfully!');
        }
        renderUsers();
        closeBtn.click();
    }else {
        console.log('not valid')
    }
}

const addUser = () => {
    let users = getUsers();
    let educations = [];
    let rows = document.querySelectorAll('#secondary-tbody tr');

    for(const row of rows){

        const university = row.querySelector('.university').value;
        const college = row.querySelector('.college').value;
        const startYear = row.querySelector('.startYear').value;
        const passoutYear = row.querySelector('.passoutYear').value;
        const percentage = row.querySelector('.percentage').value;
        const backlog = row.querySelector('.backlog').value;
        let education = {
            university,
            college,
            startYear,
            passoutYear,
            percentage,
            backlog
        }
        educations.push(education);
    } 

    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        dob: dob.value,
        graduationYear: graduationYear.value,
        educations: educations
    }
    users.push(user);  
    setUsers(users);    
}

const renderUsers = () => {
    let users = getUsers();
    let table = new DataTable('#main-table');
    table.clear();
    users.forEach((element, index)=> {
        table.row.add([
            element.firstName,
            element.lastName,
            element.email,
            element.address,
            element.dob,
            element.graduationYear,
            `<button class="btn btn-outline-warning" onclick="updateUser(${index})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>`
            ,
            `<button class="btn btn-outline-danger" onclick="deleteUser(${index})">
                <i class="fa-solid fa-trash-can"></i>
            </button>`
    ]).draw();
    })
};

const updateUser = (index) => {
    createFormBtn.click();
    let users = getUsers();
    let currentUser = users[index];
    firstName.value= currentUser.firstName;
    lastName.value= currentUser.lastName;
    email.value= currentUser.email;
    address.value= currentUser.address;
    dob.value= currentUser.dob;
    graduationYear.value= currentUser.graduationYear;
    
    let tBody = document.getElementById('secondary-tbody');
    tBody.innerHTML= currentUser.educations.map((element, index)=>{
        return `
        <tr>
            <td>
                <input type="text" class="form-control university" placeholder="university" value="${element.university}"/>
                <div class="text-danger mt-1 error universityError"></div>
            </td>
            <td>
                <input type="text" class="form-control college" placeholder="college"  value="${element.college}"/>
                <div class="text-danger mt-1 error collegeError"></div>
            </td>
            <td>
                <input type="date" class="form-control startYear"  value="${element.startYear}"/>
                <div class="text-danger mt-1 error startYearError"></div>
            </td>
            <td>
                <input type="date" class="form-control passoutYear"  value="${element.passoutYear}"/>
                <div class="text-danger mt-1 error passoutYearError"></div>
            </td>
            <td>
                <input type="number" class="form-control percentage" min="45" max="100" step="0.01"  value="${element.percentage}" required/>
                <div class="text-danger mt-1 error percentageError"></div>
            </td>
            <td>
                <input type="number" class="form-control backlog" min="0" max="50"  value="${element.backlog}" required/>
                <div class="text-danger mt-1 error backlogError"></div>
            </td>
            <td>
                <button onclick="removeEducationRow(this)" type="button" class="btn btn-outline-danger" ${index<2? 'disabled': ''}>
                    <i class="fa-solid fa-minus"></i>
                </button>
            </td>
        </tr>
        `
    }).join('');

    submitBtn.setAttribute('data-bs-action', 'update');
    submitBtn.setAttribute('data-bs-index', index);
    
}

const updateUserToList = () => {
    const currentIndex = submitBtn.getAttribute('data-bs-index');
    let users = getUsers();
    let educations = [];
    let rows = document.querySelectorAll('#secondary-tbody tr');

    for(const row of rows){
        
        const university = row.querySelector('.university').value;
        const college = row.querySelector('.college').value;
        const startYear = row.querySelector('.startYear').value;
        const passoutYear = row.querySelector('.passoutYear').value;
        const percentage = row.querySelector('.percentage').value;
        const backlog = row.querySelector('.backlog').value;
        let education = {
            university,
            college,
            startYear,
            passoutYear,
            percentage,
            backlog
        }
        educations.push(education);
    } 

    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        dob: dob.value,
        graduationYear: graduationYear.value,
        educations: educations
    }

    users[currentIndex]=user;
    setUsers(users);
}

const deleteUser = (index) => {
    let result = confirm('Are you sure you want to delete?')
    if(result){
        let users = getUsers();
        users.splice(index,1);  
        setUsers(users); 
    }
    renderUsers();
}

const addEducationRow = ()=>{
    const tBody = document.getElementById('secondary-tbody');
    const row = `
    <tr>
        <td>
            <input type="text" class="form-control university" placeholder="university"/>
            <div class="text-danger mt-1 error universityError"></div>
        </td>
        <td>
            <input type="text" class="form-control college" placeholder="college"/>
            <div class="text-danger mt-1 error collegeError"></div>
        </td>
        <td>
            <input type="date" class="form-control startYear" />
            <div class="text-danger mt-1 error startYearError"></div>
        </td>
        <td>
            <input type="date" class="form-control passoutYear"/>
            <div class="text-danger mt-1 error passoutYearError"></div>
        </td>
        <td>
            <input type="number" class="form-control percentage" min="45" max="100" step="0.01"/>
            <div class="text-danger mt-1 error percentageError"></div>
        </td>
        <td>
            <input type="number" class="form-control backlog" min="0" max="50"/>
            <div class="text-danger mt-1 error backlogError"></div>
        </td>
        <td>
            <button onclick="removeEducationRow(this)" type="button" class="btn btn-outline-danger">
                <i class="fa-solid fa-minus"></i>
            </button>
        </td>
    </tr>
    `
    tBody.insertAdjacentHTML('beforeend',row);
}

const removeEducationRow = (button) => {
    const row = button.closest('tr');
    row.remove();
}

const setDefaultRow = ()=>{
    
    let tBody = document.getElementById('secondary-tbody');
    tBody.innerHTML= `
    <tr>
        <td>
            <input type="text" class="form-control university" placeholder="university"/>
            <div class="text-danger mt-1 error universityError"></div>
        </td>
        <td>
            <input type="text" class="form-control college" placeholder="college"/>
            <div class="text-danger mt-1 error collegeError"></div>
        </td>
        <td>
            <input type="date" class="form-control startYear" />
            <div class="text-danger mt-1 error startYearError"></div>
        </td>
        <td>
            <input type="date" class="form-control passoutYear"/>
            <div class="text-danger mt-1 error passoutYearError"></div>
        </td>
        <td>
            <input type="number" class="form-control percentage" min="45" max="100" step="0.01" required/>
            <div class="text-danger mt-1 error percentageError"></div>
        </td>
        <td>
            <input type="number" class="form-control backlog" min="0" max="50" required/>
            <div class="text-danger mt-1 error backlogError"></div>
        </td>
        <td>
            <button onclick="removeEducationRow(this)" type="button" class="btn btn-outline-danger" disabled >
                <i class="fa-solid fa-minus"></i>
            </button>
        </td>
    </tr>
    <tr>
        <td>
            <input type="text" class="form-control university" placeholder="university"/>
            <div class="text-danger mt-1 error universityError"></div>
        </td>
        <td>
            <input type="text" class="form-control college" placeholder="college"/>
            <div class="text-danger mt-1 error collegeError"></div>
        </td>
        <td>
            <input type="date" class="form-control startYear" />
            <div class="text-danger mt-1 error startYearError"></div>
        </td>
        <td>
            <input type="date" class="form-control passoutYear"/>
            <div class="text-danger mt-1 error passoutYearError"></div>
        </td>
        <td>
            <input type="number" class="form-control percentage" min="45" max="100" step="0.01" required/>
            <div class="text-danger mt-1 error percentageError"></div>
        </td>
        <td>
            <input type="number" class="form-control backlog" min="0" max="50" required/>
            <div class="text-danger mt-1 error backlogError"></div>
        </td>
        <td>
            <button onclick="removeEducationRow(this)" type="button" class="btn btn-outline-danger" disabled >
                <i class="fa-solid fa-minus"></i>
            </button>
        </td>
    </tr>
    `
}

const resetForm = ()=>{
    const errorTexts = document.querySelectorAll('.error');
    const allInputs = document.querySelectorAll('input');

    for(const errorText of errorTexts){
        errorText.innerHTML='';
    }
    for(const input of allInputs){
        input.classList.remove('is-invalid');
    }
}

renderUsers();