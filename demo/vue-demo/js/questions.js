$.getJSON('http://localhost:3000/questions/getlist',function(res){
    new Vue({
        el:"#app",
        data:{
            questions:res.data
        }
    });
})
