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
axios.post("https://crudcrud.com/api/a5833f973f6943a5ace73c498c33111b/orders",object)
.then((respone)=>{
    onscreen(respone.data)
    console.log(respone)


})
.catch((err)=>{
    console.log(err)
})

}
window.document.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/a5833f973f6943a5ace73c498c33111b/orders")
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
var childele=document.createElement('li')
childele.textContent=(object.mytable+"--"+object.mydish+'--'+object.myprice+'--')
parentele.appendChild(childele)


const delbutton =document.createElement('input')
delbutton.style.border='1px solid red'
delbutton.type='button'
delbutton.value='Delete'
delbutton.className='deletebutton'

delbutton.onclick = ()=>{

        axios.delete(`https://crudcrud.com/api/a5833f973f6943a5ace73c498c33111b/orders/${object._id}`)
          .then((response) => {
            console.log(response)
            parentele.removeChild(childele)
          })
          .catch((error) => {
            console.log(error)
          })
}
childele.appendChild(delbutton)

}



