$(document).ready(function(){
    // showHello()
    // alert('test')
    // $(`#main-page`).show()
})

function showHello(){
    console.log("masuk func")
    $.ajax({
        type: "GET",
        url: "https://aqueous-tor-07770.herokuapp.com/",
        success: function(result){
            console.log(result)
            $(`#hello`).append(result)
        },
        error: function(err){
            console.log(err)
            $(`#hello`).append(err)
        } 
    })
}