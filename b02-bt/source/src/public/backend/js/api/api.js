
function changeStatus(el) {
    let data = {
        id: el.closest('tr').getAttribute('item-id'),
        newStatus: el.getAttribute('item-status') === 'active' ? 'inactive' : 'active',
        title: document.querySelector('h1').innerText
    }
    Http
        .put('/api/changeStatus', data)
        .then(() => {
            renderStatusElement(el, data)
            Toastify({
                text: "Change status successfully",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                //   background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        })
}

function renderStatusElement(el, data) {
    let element = getStatusElement(el, data)
    el.parentElement.innerHTML = element
}

function getStatusElement(el, data) {
    if (el.getAttribute('item-status') === 'inactive') {
        return (
            `<span class="rounded-circle btn btn-sm btn-success" item-status="${data.newStatus}" onclick="changeStatus(this)">
                <i class="fas fa-check"></i>
            </span>`
        )
    } else if (el.getAttribute('item-status') === 'active') {
        return (
            `<span class="rounded-circle btn btn-sm btn-danger" item-status="${data.newStatus}" onclick="changeStatus(this)">
                <i class="fas fa-ban"></i>
            </span>` 
        )
    }
}

function changeOrdering(el) {
    let data = {
        id: el.closest('tr').getAttribute('item-id'),
        newOrdering: el.value,
        title: document.querySelector('h1').innerText
    }
    console.log(data)
    Http
        .put('/api/changeOrdering', data)
        .then(() => {
            Toastify({
                text: "Change ordering successfully",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        })
}

function removeItem(el) {
    let data = {
        id: el.closest('tr').getAttribute('item-id'),
        title: document.querySelector('h1').innerText
    }
    Http
        .delete('/api/removeItem', data)
        .then(() => {
            el.closest('tr').remove()
            Toastify({
                text: "Delete item successfully",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b07b, #29c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        })
        .catch((err) => console.log(err))
}