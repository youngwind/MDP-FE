var Vue = require('vue');

new Vue({

    el: "#app",
    data: {
        msg: "youngwind",
        selected: 'A',
        options: [
            {text: 'One', value: 'A'},
            {text: 'Two', value: 'B'},
            {text: 'Three', value: 'C'}
        ],
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    },
    methods: {
        addComponent: function () {
            // 添加组件
        }
    }
});