document.addEventListener('DOMContentLoaded', function() {
    const featuresPool = document.querySelector('.features-pool');
    const dropZone = document.querySelector('.drop-zone');
    const dropSlots = document.querySelectorAll('.drop-slot');
    let draggedCard = null;

    function isDuplicate(card) {
        const existingCards = dropZone.querySelectorAll('.feature-card');
        return Array.from(existingCards).some(existingCard => 
            existingCard.querySelector('h3').textContent === card.querySelector('h3').textContent
        );
    }

    function createEmptySlot() {
        const slot = document.createElement('div');
        slot.className = 'drop-slot empty';
        return slot;
    }

    function createDeleteButton() {
        const button = document.createElement('button');
        button.className = 'delete-btn';
        button.innerHTML = '×';
        return button;
    }

    function updateDropSlots() {
        const cards = dropZone.querySelectorAll('.feature-card');

        if (cards.length === 0) {
            dropZone.innerHTML = '';
            dropZone.appendChild(createEmptySlot());
            return;
        }
    }

    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('dragstart', function(e) {
            draggedCard = this;
            this.style.opacity = '0.4';
        });

        card.addEventListener('dragend', function(e) {
            this.style.opacity = '1';
            draggedCard = null;
        });
    });

    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
        const emptySlot = this.querySelector('.drop-slot.empty');
        if (emptySlot) {
            emptySlot.classList.add('drag-over');
        }
    });

    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        const emptySlot = this.querySelector('.drop-slot.empty');
        if (emptySlot) {
            emptySlot.classList.remove('drag-over');
        }
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        const emptySlot = this.querySelector('.drop-slot.empty');
        if (emptySlot) {
            emptySlot.classList.remove('drag-over');
        }

        if (draggedCard && !isDuplicate(draggedCard)) {
            const clone = draggedCard.cloneNode(true);
            clone.draggable = true;

            const deleteBtn = createDeleteButton();
            deleteBtn.addEventListener('click', function() {
                clone.remove();
                updateDropSlots();
            });
            clone.appendChild(deleteBtn);

            clone.addEventListener('dragstart', function(e) {
                draggedCard = this;
                this.style.opacity = '0.4';
            });

            clone.addEventListener('dragend', function(e) {
                this.style.opacity = '1';
                draggedCard = null;
            });

            if (emptySlot) {
                emptySlot.replaceWith(clone);
            } else {
                this.appendChild(clone);
            }
        } else if (isDuplicate(draggedCard)) {
            alert('Эта функция уже добавлена в конфигурацию');
        }
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.feature-card');
            card.remove();
            updateDropSlots();
        });
    });
});