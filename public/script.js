const h5ad_input = document.getElementById('h5ad_input');
const selected_file = document.getElementById('selected_file');
const celltype_label = document.getElementById('celltype_label');
const auto_generated_colors = document.getElementById('auto_generated_colors');
const celltype_hidden = document.querySelectorAll('.celltype_hidden');
const not_auto_colors = document.querySelectorAll('.not_auto_colors');
const raw_gene_counts = document.getElementById('raw_gene_counts');
const raw_gene_hidden = document.querySelectorAll('.raw_gene_hidden');

h5ad_input.addEventListener('change', (event) => {
    selected_file.textContent = "File selected: " + event.target.files[0].name;
});

celltype_label.addEventListener('click', (event) => {
    if (celltype_label.checked) {
        // Make options unhidden
        celltype_hidden.forEach((element) => {
            element.classList.add('show');
        });
    }

    if (!celltype_label.checked) {
        // Make options unhidden
        celltype_hidden.forEach((element) => {
            element.classList.remove('show');
        });
    }
});

auto_generated_colors.addEventListener('click', (event) => {
    if (auto_generated_colors.checked) {
        // Make options unhidden
        not_auto_colors.forEach((element) => {
            element.style = "display: none;";
        });
    }

    if (!auto_generated_colors.checked) {
        // Make options unhidden
        not_auto_colors.forEach((element) => {
            element.style = "";
        });
    }
});

raw_gene_counts.addEventListener('click', (event) => {
    if (raw_gene_counts.checked) {
        // Make options unhidden
        raw_gene_hidden.forEach((element) => {
            element.classList.add('show');
        });
    }

    if (!raw_gene_counts.checked) {
        // Make options unhidden
        raw_gene_hidden.forEach((element) => {
            element.classList.remove('show');
        });
    }
});