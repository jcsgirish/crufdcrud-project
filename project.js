function save(event)
{
  event.preventDefault()
  var myprice=event.target.price.value
  var mydish=event.target.dish.value
  var mytable=event.target.table.value
var object={
  myprice,
  mydish,
  mytable,
}
axios.post("https://crudcrud.com/api/7ba38e8643424f8fb360361f33857e27/orders",object)
.then((respone)=>{
    onscreen(respone.data)
    console.log(respone)
})
.catch((err)=>{
    console.log(err)
})
}
window.document.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/7ba38e8643424f8fb360361f33857e27/orders")
    .then((response)=>{
        console.log(response)
        for(var i=0;i<response.data.length;i++){
            onscreen(response.data[i])
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})
function onscreen(object)
{

var  parentele=document.getElementById('listofusers')
  var parentele;
  if (object.mytable === 'Table 1') {
    parentele = document.getElementById('table1Orders');
  } else if (object.mytable === 'Table 2') {
    parentele = document.getElementById('table2Orders');
  } else if (object.mytable === 'Table 3') {
    parentele = document.getElementById('table3Orders');
  }

var childele=document.createElement('li')
childele.textContent=(object.mytable+"--"+object.mydish+'--'+object.myprice+'--')

parentele.appendChild(childele)

const delbutton =document.createElement('input')
delbutton.style.border='1px solid red'
delbutton.type='button'
delbutton.value='Delete'
delbutton.className='deletebutton'
delbutton.onclick = ()=>{
        axios.delete(`https://crudcrud.com/api/7ba38e8643424f8fb360361f33857e27/orders/${object._id}`)
          .then((response) => {
            console.log(response)
            parentele.removeChild(childele)
          })
          .catch((error) => {
            console.log(error)
          })
}
childele.appendChild(delbutton)


const editbutton =document.createElement('input')
editbutton.style.border='1px solid blue'
editbutton.type='button'
editbutton.value='Edit'
editbutton.className='editbutton'

editbutton.onclick = ()=>{
        axios.delete(`https://crudcrud.com/api/7ba38e8643424f8fb360361f33857e27/orders/${object._id}`)
          .then((response) => {
            console.log(response)
            parentele.removeChild(childele)
          })
          .catch((error) => {
            console.log(error)
          })
          parentele.removeChild(childele)
          document.getElementById('prices').value=object.myprice
          document.getElementById('dishes').value=object.mydish
          document.getElementById('Tables').value=object.mytable
        
}
childele.appendChild(editbutton)

}