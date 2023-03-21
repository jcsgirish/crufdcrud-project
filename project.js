async function save(event) {
  try {
    event.preventDefault()
    var myprice = event.target.price.value
    var mydish = event.target.dish.value
    var mytable = event.target.table.value
    var object = {
      myprice,
      mydish,
      mytable,
    }
    const response = await axios.post("https://crudcrud.com/api/04658d8c7a17454b8c0e2d971270924c/orders", object)
    onscreen(response.data)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

window.document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("https://crudcrud.com/api/04658d8c7a17454b8c0e2d971270924c/orders")
    console.log(response)
    for (var i = 0; i < response.data.length; i++) {
      onscreen(response.data[i])
    }
  } catch (error) {
    console.log(error)
  }
})

function onscreen(object) {
  try {
    var parentele;
    if (object.mytable === 'Table 1') {
      parentele = document.getElementById('table1Orders');
    } else if (object.mytable === 'Table 2') {
      parentele = document.getElementById('table2Orders');
    } else if (object.mytable === 'Table 3') {
      parentele = document.getElementById('table3Orders');
    }

    var childele = document.createElement('li')
    childele.textContent = (object.mytable + "--" + object.mydish + '--' + object.myprice + '--')

    parentele.appendChild(childele)

    const delbutton = document.createElement('input')
    delbutton.style.border = '1px solid red'
    delbutton.type = 'button'
    delbutton.value = 'Delete'
    delbutton.className = 'deletebutton'
    delbutton.onclick = async () => {
      try {
        const response = await axios.delete(`https://crudcrud.com/api/04658d8c7a17454b8c0e2d971270924c/orders/${object._id}`)
        console.log(response)
        parentele.removeChild(childele)
      } catch (error) {
        console.log(error)
      }
    }
    childele.appendChild(delbutton)

    const editbutton = document.createElement('input')
    editbutton.style.border = '1px solid blue'
    editbutton.type = 'button'
    editbutton.value = 'Edit'
    editbutton.className = 'editbutton'

    editbutton.onclick = async () => {
      try {
        const response = await axios.delete(`https://crudcrud.com/api/04658d8c7a17454b8c0e2d971270924c/orders/${object._id}`)
        console.log(response)
        parentele.removeChild(childele)
        document.getElementById('prices').value = object.myprice
        document.getElementById('dishes').value = object.mydish
        document.getElementById('Tables').value = object.mytable
      } catch (error) {
        console.log(error)
      }
    }
    childele.appendChild(editbutton)
  } catch (error) {
    console.log(error)
  }
}