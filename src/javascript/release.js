var Vue = require('vue');
var $ = require('jquery');
var config = require('../config');

var app = new Vue({

    el: "#app",
    data: {
        msg: "youngwind",
        selected: '',
        options: [],
        items: []
    },
    methods: {
        addComponent: function () {
            // 添加组件
            var componentName = prompt("请输入组件名称", "");
            if (!componentName) {
                alert('组件名称不能为空');
                return;
            }
            $.ajax({
                url: config.api + '/component/add',
                method: 'POST',
                ContentType: 'application/json',
                data: {
                    name: componentName
                }
            }).done(function (res) {
                console.log(res);
                init();
            })
        },

        uploadRelease: function () {
            var formData = new FormData($("#frmUploadFile")[0]);
            $.ajax({
                url: config.api + '/release/upload?componentId=' + app.selected,
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
            }).done(function (res) {
                console.log(res);
                getReleaseByComponentId(app.selected);
            });
        }
    }
});

app.$watch('selected', function (val) {
    getReleaseByComponentId(val);
});

init();


function getReleaseByComponentId(componentId) {
    $.ajax({
        url: config.api + '/release/' + componentId
    }).done(function (res) {
        app.items = res.data;
    })
}

function init() {

    $.ajax({
        url: config.api + '/component/all'
    }).done(function (res) {
        app.options = res.data;
        app.selected = res.data[0].id;

        getReleaseByComponentId(app.selected);

    });

}

