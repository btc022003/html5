new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        students: [
            { name: "小明", age: 18 },
            { name: "小红", age: 17 },
            { name: "小强", age: 20 },
            { name: "Tom", age: 19 }
        ]
    },
    methods: {
        addFun: function (e) {
            //alert(this.name);
            console.log(this);
            if (!!this.name) {
                var obj = {};
                obj.name = this.name;
                obj.age = this.age;
                this.students.push(obj);
            }
        },
        removeStudent:function(index){
            this.students.splice(index,1);
        }
    }
})