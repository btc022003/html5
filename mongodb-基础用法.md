### 安装部分
1. mongodb配置方法

2. mongodb的安装目录

    C:\MongoDB\Server\3.2\bin

3. 创建以下目录

    c:\mongo\log
    c:\mongo\db

4. 创建mongodb的配置文件

    ```
    c:\mongo\mongod.cfg

    文件内容为:
    logpath=c:\mongo\log\mongod.log  
    dbpath=c:\mongo\db

    说明 logpath:mongodb日志文件路径,dbpath:数据库内容保存路径

    ```

5. 安装为windows服务

    ```
    进入 C:\MongoDB\Server\3.2\bin
    运行 mongod --config c:\mongo\mongod.cfg --install
    安装成功后在windows的系统服务中会包含MongoDB系统服务
    ```
6. mac下安装就很简单了

  ```
  brew install mongodb /////安装
  brew info mongodb ////查看安装信息以及如何运行
  ```


### 基本命令

mongodb基础操作命令

    ```
    mongo	MongoDB的客户端程序（命令行程序shell）
    show dbs  ////列出当前数据库服务中包含的数据库
    use db_name /////切换到db_name这个数据库,如果不存在则创建
    db  /////显示当前被选中的数据库
    show collections /////列出当前数据库的所有数据集合(数据表)
    db.cats.insert({"name":"Tom","age":18}) ///创建cats集合,加入一条记录
    db.cats.find(); /////返回cats集合中所有的数据
    db.cats.find().pretty(); ///对返回结果进行格式化输出
    db.cats.find({"name":"Tom"}); ////查找名字为Tom的cat数据，区分大小写
    db.cats.find({"name":/t/}); ///查找所有name包含t的数据
    db.cats.find({"name":/t/,"age":18}); ///查找所有name包含t的age=18的数据

    //select * from cats where name like '%t%' and age<20
    // $lt 表示小于,$lte 表示小于等于
    // $gt 表示大于,$gte 表示大于等于
    // $ne 表示不等于
    db.cats.find({"name":/t/,"age":{$lt:20}}) /////查找所有name包含t并且age<20的数据

    //// select * from cats where name = 'Tom' or name = 'Kitty'
    db.cats.find({$or:[{"name":"Tom"},{"name":"Kitty"}]})

    //////limit集合skip实现分页效果
    /*
    分页效果举例：
    我有12条记录
    每条记录的名字为(1,2,3,4,5,6,7,8,9,10,11,12)
    我想把这12条记录分多次显示，每次显示5条数据
    1,2,3,4,5
    6,7,8,9,10
    11,12

    */
    // skipNum = (pageNum-1)*pageCount ///页码减一*每页显示的数量
    //第一页
    //  db.cats.find().limit(5).skip(0)
    //第二页
    //  db.cats.find().limit(5).skip(5)
    //第三页
    //  db.cate.find().limit(5).skip(10)
    db.cats.find().limit(2); /////查询所有的数据，但是只返回前两条
    db.cats.find().skip(2); ///表示跳过两条
    db.cats.find().sort({"age":1}) ////按照age的升序进行排列
    db.cats.find().sort({"age":-1}) ////按照age的降序进行排列

    /////修改name为Tom的猫,年龄为81,添加属性friends值为Jerry
    db.cats.update({"name":"Tom"},{$set:{"age":81,"friends":"Jerry"}})/////参数一 query,参数二 修改的内容和值

    db.cats.remove({"name":"BlackCat"}) ; ////删除name为BlackCat的猫

    ///mongodb聚合运算参考链接
    http://www.runoob.com/mongodb/mongodb-aggregate.html
    ```


### nodejs中间件

[http://mongoosejs.com/](http://mongoosejs.com/)
