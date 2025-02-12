// const fileUpload = document.getElementById('fileUpload');
// const content = document.getElementById('content');
// const uploadForm = document.getElementById('uploadForm');
// const submitButton = document.getElementById('submitButton');

// fileUpload.addEventListener('change', (event) => {
//     if (event.target.files[0]) {
//         const newDiv = document.createElement('div');
//         newDiv.id = "selectedFile";
//         newDiv.textContent = "You selected " + event.target.files[0].name;
//         uploadForm.insertBefore(newDiv, uploadForm.firstChild);
//     }
// });

// submitButton.addEventListener('click', (event) => {
//     if (!fileUpload.files[0]) {
//         alert('Select a file please.');
//     }
//     fileUpload.reset();
// })

const h5ad_input = document.getElementById('h5ad_input');
const selected_file = document.getElementById('selected_file');

h5ad_input.addEventListener('change', (event) => {
    selected_file.textContent = "File selected: " + event.target.files[0].name;
});

