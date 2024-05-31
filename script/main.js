
//get
// $.get('data/1.json').done(function(r){
//     console.table(r)
// })
// .fail(function(err){
//     console.error('file not exits',err)
// })

//Lamado de multiples ajax
$.when($.get('data/1.json'), $.get('data/2.json'))
    .then((response1, response2) => {

        const { nombre } = response1[0][0];

        const { mensaje } = response2[0];

        console.log(`${mensaje} ${nombre}`)

    })