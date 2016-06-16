js原型链部分详细使用说明案例

1. 'index.html'文件

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>js原型讲解</title>
  </head>
  <body>
      <script src='js/person.js'></script>
      <script src='js/student.js'></script>
      <script src='js/coder.js'></script>
      <script>
          var person = new Person('Jack',18,'男');
          person.sleep();
          person.dating();
          person.eat('蛋炒饭');
          person.birthday();

          /////student实例化对象
          /***
           * 实例化后的对象在查找属性或者方法的时候
           * 首先在 this 自己内部查找
           *  如果没有找到 就会到原型中查找
           *      如果原型中没有，那么就会去原型的原型继续查找
           *          ...
           *  直到找到为止  如果没有找到那么返回undefined或者报错
           */
          var student = new Student('小明',15,'男','县一中');        
          console.dir(student);
          student.sleep();
          student.dating();
          student.eat('蛋炒饭');
          student.birthday();
          student.goSchool();

          var coder = new Coder('Jerry',25,'男','MS');
          coder.sleep();
          coder.work();
          console.log(coder);
      </script>
  </body>
  </html>
  ```
2. 'js/person.js'文件

  ```javascript
  /****
   * 定义一个Person对象
   * 包含 name age gender 三个属性
   */
  function Person(name, age,gender) {
      this.name = name;
      this.age = age;
      this.gender = gender;
  }
  ////Person的原型
  Person.prototype = {
      /////睡觉
      sleep:function(){
          console.log(this.name + '每天睡觉八小时');
      },
      ////吃饭 传入参数food
      eat:function(food){
          console.log(this.name+'特别爱吃'+food);
      },
      ////不需要参数
      dating:function(){
          console.log('单身狗');
      },
      ////出生年份，根据年龄计算 不需要参数
      birthday:function(){
          var birthYear = (new Date()).getFullYear()-this.age;
          console.log(this.name+'的出生在'+birthYear+'年');
      }
  }
  ```
3. 'js/student.js'文件

  ```javascript
  function Student(name,age,gender,school){
    this.school = school;
    Person.apply(this,[name,age,gender]);
  }

  // function EmptyFun(){}
  // ///设置空对象的原型为Person的原型
  // EmptyFun.prototype = Person.prototype;

  // var temEmptyFun = new EmptyFun(); ////实例化的一个空对象
  // Student.prototype = temEmptyFun; ///设置学生的原型为实例化的空对象

  // Student.prototype.constructor = Person

  //Object.create()可以通过你提供的原型创建一个新对象，
  //这个新对象的原型就是create()的第一个参数
  Student.prototype = Object.create(Person.prototype);

  Student.prototype.constructor = Student

  ////为学生原型定义一个方法 goSchool
  Student.prototype.goSchool = function(){
      console.log(this.name + '每天早上八点准时去'+this.school);
  }


  /////为学生创建一个dating方法
  Student.prototype.dating = function(){
      console.log('学校禁止早恋!');
  }
  ```

4. 'js/coder.js'文件

  ```javascript
  function Coder(name,age,gender,company){
  	Student.apply(this,[name,age,gender,company]);
  }

  Coder.prototype = Object.create(Student.prototype);

  Coder.prototype.work = function(){
  	console.log('writing code ....../n fix bugs');
  }
  ```
