angular.module('TodoApp', []).controller('TodoCtrl', function($scope) {
    var todos = $scope.todos = angular.fromJson(localStorage.getItem('todos') || '[]');

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 1 : 0;
        });
        return count;
    };

    $scope.$watch('todos', function (oldTodos, newTodos) {
        if (oldTodos != newTodos) {
            localStorage.setItem('todos', angular.toJson(todos));
        }
    }, true);

    $scope.addTodo = function() {
        var text = $scope.todoText.trim();
        if (text.length) {
            todos.push({
                text: text,
                done: false
            });
        }
        $scope.todoText = '';
    };

    $scope.removeTodo = function(todo) {
        todos.splice(todos.indexOf(todo), 1)
    };

    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) {
                $scope.todos.push(todo);
            };
        });
    };
});
