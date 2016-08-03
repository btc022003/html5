> 由于某些原因,现在需要重拾angular.js,很早之前使用过一段时间。然后放弃了

```
相关资料:https://github.com/angular/angular.js
```

1. angular是一个数据双向绑定的前端框架
2. angular路由
  ```
  $routeProvider.when(url, {
    template: string,
    templateUrl: string,
    controller: string, function 或 array,
    controllerAs: string,
    redirectTo: string, function,
    resolve: object<key, function>
    });

    template:
      如果我们只需要在 ng-view 中插入简单的 HTML 内容，则使用该参数：
      .when('/computers',{template:'这是电脑分类页面'})

    templateUrl:
      如果我们只需要在 ng-view 中插入 HTML 模板文件，则使用该参数：
      $routeProvider.when('/computers', {
          templateUrl: 'views/computers.html',
      });
      以上代码会从服务端获取 views/computers.html 文件内容插入到 ng-view 中。

    controller:
      function、string或数组类型，在当前模板上执行的controller函数，生成新的scope。

    controllerAs:
      string类型，为controller指定别名。

    redirectTo:
      重定向的地址。

    resolve:
      指定当前controller所依赖的其他模块。

  ```

3. 通过yo快速生成一个angularjs项目框架
