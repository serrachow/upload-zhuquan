const h5ad_input = document.getElementById('h5ad_input');
const selected_file = document.getElementById('selected_file');

h5ad_input.addEventListener('change', (event) => {
    selected_file.textContent = "File selected: " + event.target.files[0].name;
});



const UNS_column = document.getElementById('UNS_column');
const colors_JSON = document.getElementById('colors_JSON');

const celltype_label = document.getElementById('celltype_label');
const celltype_hidden = document.querySelectorAll('.celltype_hidden');
const celltype_label_text = document.getElementById('celltype_label_text');
celltype_label.addEventListener('click', (event) => {
    if (celltype_label.checked) {
        // Make options unhidden
        celltype_hidden.forEach((element) => {
            element.classList.add('show');
        });

        celltype_label_text.required = true;

        // Remove disabled
        celltype_label_text.disabled = false;
    }

    if (!celltype_label.checked) {
        // Make options unhidden
        celltype_hidden.forEach((element) => {
            element.classList.remove('show');
        });

        celltype_label_text.required = false;

        // Add disabled to everything nested
        UNS_column.disabled = true;
        colors_JSON.disabled = true;
        celltype_label_text.disabled = true;
    }
});

const auto_generated_colors = document.getElementById('auto_generated_colors');
const colors_hidden = document.querySelectorAll('.colors_hidden');
auto_generated_colors.addEventListener('click', (event) => {
    if (!auto_generated_colors.checked) {
        // Make options unhidden
        colors_hidden.forEach((element) => {
            element.classList.add('show');
        });

        UNS_column.required = true;
        colors_JSON.required = true;
        UNS_column.disabled = false;
        colors_JSON.disabled = false;
    }

    if (auto_generated_colors.checked) {
        // Make options unhidden
        colors_hidden.forEach((element) => {
            element.classList.remove('show');
        });

        UNS_column.required = false;
        colors_JSON.required = false;
        UNS_column.disabled = true;
        colors_JSON.disabled = true;
    }
});


const raw_gene_counts = document.getElementById('raw_gene_counts');
const raw_gene_hidden = document.querySelectorAll('.raw_gene_hidden');
const raw_gene_counts_text = document.getElementById('raw_gene_counts_text');

raw_gene_counts.addEventListener('click', (event) => {
    if (raw_gene_counts.checked) {
        // Make options unhidden
        raw_gene_hidden.forEach((element) => {
            element.classList.add('show');
            raw_gene_counts_text.required = true;
        });
    }

    if (!raw_gene_counts.checked) {
        // Make options unhidden
        raw_gene_hidden.forEach((element) => {
            element.classList.remove('show');
            raw_gene_counts_text.required = false;
        });
    }
});