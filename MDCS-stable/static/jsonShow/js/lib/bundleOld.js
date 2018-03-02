'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonContent = function () {
    function JsonContent(json, urlPrefix) {
        _classCallCheck(this, JsonContent);

        var data = null;
        this.urlPrefix = urlPrefix || '';
        console.log(urlPrefix);
        if (Object.keys(json).length == 1) {
            data = json[Object.keys(json)[0]];
        } else {
            data = json;
        }
        this.rootData = data;
        //images弹窗，button ID 与 images对象
        this.id2data = new Map();
        this.data2id = new Map();

        this.render(data, $('#content'), true);

        this.bindEvent();
        this.appendImageModel();

        this.bindImageClickEvent();
    }

    _createClass(JsonContent, [{
        key: 'bindEvent',
        value: function bindEvent() {
            $('#content').on('click', 'div.key', function (e) {
                // console.log(e);
                $(e.currentTarget).children('i.expandIcon').toggleClass('expandedIcon');
                $(e.currentTarget).next().toggle('fast');
            });
        }
    }, {
        key: 'bindImageClickEvent',
        value: function bindImageClickEvent() {
            $('body').on('click', 'button.image, img.image', function (e) {
                // console.log(123);
                // console.log(e.currentTarget);
                $('#imgModel img').attr('src', $(e.currentTarget).attr('src'));
                // console.log($('#imgModel'));
                $('#imgModel').css({
                    display: 'block'
                });
            });

            $('#imgModel').on('click', function (e) {

                $('#imgModel img').attr('src', '');
                $('#imgModel').css({
                    display: 'none'
                });
            });

            $('.view-images-button').click(function (e) {
                var id = $(e.target).attr('id');
                var data = this.id2data.get(id);
                $("#imagesModel").empty().append(this.getImagesArrayTableDom(data, true)).toggle();
            }.bind(this));

            $('#imagesModel').on('click', function (e) {
                if (e.currentTarget === e.target) {
                    $(e.target).toggle();
                }
            });
        }
    }, {
        key: 'appendImageModel',
        value: function appendImageModel() {
            var modelHtml = '\n    <div id="imgModel" style="display: none; position:fixed; background-color: rgba(0,0,0,.7); top:0; left:0; z-index: 100; width:100%; height: 100%;">\n      <img  style="width: 600px; height: auto; position:absolute; left: calc(50% - 300px); top:0;"/>\n    </div>';
            $('body').append($(modelHtml));

            modelHtml = '<div id="imagesModel" style="display: none; position:fixed; background-color: rgba(0,0,0,.7); top:0; left:0; z-index: 50; width:100%; height: 100%; overflow: auto;">\n    </div>';
            $('body').append($(modelHtml));
        }

      /*
       json ：要展示的数据
       $container ：将构造的dom节点所追加进的容器
       isRoot ：是一个布尔值，用于判断将要循环的json数据是不是在第一层，如果是在第一层的话，会加一个ID值。非对象、数组的键值对的渲染结果也不同。
       */

    }, {
        key: 'render',
        value: function render(json, $container, isRoot) {
            var typeToString = Object.prototype.toString;
            for (var key in json) {
                var $dom = null;
                switch (typeToString.call(json[key])) {
                    case '[object Object]':
                        if (key === 'array') {
                            var table = json[key];
                            if (Object.keys(table).length !== 1) {
                                console.error('array 数据格式不正确', table);
                                alert('array 数据格式不正确\n打开log可以看到详细错误');
                            }
                            $dom = this.getTemplateDom();
                            var arrayKey = Object.keys(table)[0];
                            if (isRoot === true) {
                                $dom.attr('id', arrayKey);
                                // console.log($dom.children()[0]);
                                $($dom.children()[0]).addClass('first-level-key');
                            }
                            $dom.find('div.key_text').html(arrayKey);
                            $dom.find('div.value').append(this.getArrayTablePaginatorDom(table[arrayKey], 'table'));
                            $container.append($dom);
                        } else if (key === 'images-array') {
                            var images = json[key];
                            if (Object.keys(images).length !== 1) {
                                console.error('images 数据格式不正确', images);
                                alert('images 数据格式不正确\n打开log可以看到详细错误');
                            }
                            $dom = this.getTemplateDom();
                            var _arrayKey = Object.keys(images)[0];

                            if (isRoot === true) {
                                $dom.attr('id', _arrayKey);
                                // console.log($dom.children()[0]);
                                $($dom.children()[0]).addClass('first-level-key');
                            }
                            $dom.find('div.key_text').html(_arrayKey);
                            $dom.find('div.value').append(this.getArrayTablePaginatorDom(images[_arrayKey], 'image'));
                            $container.append($dom);
                        } else {
                            // 与case '[object Array]':中的代码相同
                            $dom = this.getTemplateDom();
                            if (isRoot === true) {
                                $dom.attr('id', key);
                                // console.log($dom.children()[0]);
                                $($dom.children()[0]).addClass('first-level-key');
                            }
                            $dom.find('div.key_text').html(key);
                            $dom.find('div.value').append(this.getObjectTableDom(json[key]));
                            this.render(json[key], $dom.find('div.value'), false);
                            $container.append($dom);
                        }

                        break;

                    case '[object Array]':
                        $dom = this.getTemplateDom();
                        if (isRoot === true) {
                            $dom.attr('id', key);
                            // console.log($dom.children()[0]);
                            $($dom.children()[0]).addClass('first-level-key');
                        }
                        $dom.find('div.key_text').html(key);
                        if (/.+-File/.test(key)) {
                            // console.log(key);
                            $dom.find('div.value').append(this.getFilesArrayTableDom(json[key], false));
                            // this.render(json[key], $dom.find('div.value'), false);
                        } else {

                            $dom.find('div.value').append(this.getArrayTablePaginatorDom(json[key], 'table'));
                            // this.render(json[key], $dom.find('div.value'), false);
                        }

                        $container.append($dom);
                        break;

                    default:
                        if (isRoot === false) {
                            // 只有根结点的不为数组和对象的数据被渲染，其他节点的的不为数组和对象的数据会在相应case中直接渲染成表格
                            break;
                        }
                        $dom = this.getTemplateDom();
                        if (isRoot === true) {
                            // console.log($dom.children()[0]);
                            $($dom.children()[0]).addClass('first-level-key');
                        }

                        $dom.attr('id', key);
                        $dom.find('div.key_text').html(key);

                        var $span = $('<span></span>');
                        $span.html(json[key]);
                        $dom.find('div.value').append($span);
                        $container.append($dom);
                }
            }
        }
    }, {
        key: 'getTemplateDom',
        value: function getTemplateDom() {
            var template = '<div class="key-value">\n      <div class="key">\n        <i class="expandIcon"></i>\n        <div class="key_text"></div>\n      </div>\n      <div class="value"></div>\n    </div>';
            return $(template);
        }

        // 由一个对象返回这个对象的非对象、数组键值对组成的table节点

    }, {
        key: 'getObjectTableDom',
        value: function getObjectTableDom(json) {
            var tableData = [];
            for (var key in json) {
                var type = Object.prototype.toString.call(json[key]);
                if (type !== '[object Object]' && type !== '[object Array]') {
                    tableData.push({
                        key: key,
                        value: json[key]
                    });
                }
            }

            if (tableData.length === 0) {
                return null;
            }

            var tableTemplate = '<table class="object-table">\n      ' + tableData.map(function (currentValue, index, array) {
                    if (index % 2 === 0 && index !== array.length - 1) {
                        return '<tr><td>' + currentValue.key + '</td><td>' + currentValue.value + '</td>';
                    } else if (index % 2 === 1) {
                        return '<td></td><td>' + currentValue.key + '</td><td>' + currentValue.value + '</td></tr>';
                    } else {
                        return '<tr><td>' + currentValue.key + '</td><td>' + currentValue.value + '</td></tr>';
                    }
                }).join('') + '\n    </table>';
            return $(tableTemplate);
        }

        // array对象是一个数组,返回一个包括table和 paginator的dom节点

    }, {
        key: 'getArrayTablePaginatorDom',
        value: function getArrayTablePaginatorDom(array, type) {
            if (Object.prototype.toString.call(array) == '[object Object]') {
                array = [array];
            }
            var getArrayDom = null;
            // if(type === 'table'){
            //   getArrayDom = this.getArrayTableDom
            // }else{
            //   getArrayDom = this.getImagesArrayTableDom
            // }
            type === 'table' ? getArrayDom = this.getArrayTableDom.bind(this) : getArrayDom = this.getImagesArrayTableDom.bind(this);
            var tableID = this.getRandomID();
            var paginatorID = this.getRandomID();
            var pageSize = 6;

            var tablePaginatorHtml = '<div>\n        <div id=' + ('table' + tableID) + '></div>\n        <div>\n          <ul id=' + ('paginator' + paginatorID) + ' tableID=' + ('table' + tableID) + ' class="pagination"></ul>\n          <div class="resetPageSize">\n            <span>pageSize:</span>\n            <input type="text" value=' + pageSize + ' />\n            <button class="resetPageSizeButton">\u91CD\u7F6E</button>\n          </div>\n        </div>\n      </div>';

            var tablePaginator = $(tablePaginatorHtml);
            // 插入表格 分页器
            function fillDom(pageSize) {
                tablePaginator.find('#table' + tableID).empty().append(getArrayDom(array.filter(function (item, index) {
                    if (index < pageSize) {
                        return true;
                    } else {
                        return false;
                    }
                })));
                var flag = false;
                tablePaginator.find('#paginator' + paginatorID).empty().jqPaginator({
                    totalCounts: array.length,
                    pageSize: pageSize,
                    currentPage: 1,
                    visiblePages: 6,
                    onPageChange: function onPageChange(num, type) {
                        if (flag == false) {
                            flag = true;
                            return;
                        }
                        var start = (num - 1) * pageSize;
                        var end = num * pageSize - 1;
                        $('#table' + tableID).empty().append(getArrayDom(array.filter(function (item, index) {
                            if (index >= start && index <= end) {
                                return true;
                            } else {
                                return false;
                            }
                        })));
                    }
                });
            }
            tablePaginator.find('button.resetPageSizeButton').click(function () {
                // console.log($(this).prev().val());
                var pageSize = parseInt($(this).prev().val());
                if (isNaN(pageSize) == false && pageSize > 0) {
                    fillDom(pageSize);
                } else {
                    alert('请输入大于0的整数');
                }
            });
            fillDom(pageSize);
            return tablePaginator;
        }
        // array对象是一个数组,返回一个table的dom节点
      /*
       "Thermo-ChemicalPropertyRows": [
       {
       "T": 0,
       "C_P": 0,
       "S": 0,
       "G-H298": "INFINITE",
       "H-H298": -4.498,
       "deltaH_f": 0,
       "deltaG_f": 0,
       "logK_f": 0
       },
       {
       "T": 100,
       "C_P": 15.762,
       "S": 9.505,
       "G-H298": 53.066,
       "H-H298": -4.356,
       "deltaH_f": 0,
       "deltaG_f": 0,
       "logK_f": 0
       }
       ]
       */

    }, {
        key: 'getArrayTableDom',
        value: function getArrayTableDom(array) {

            if (Object.prototype.toString.call(array) == '[object Object]') {
                array = [array];
            }
            if (array.length === 0) {
                return null;
            }

            var getTR = function (currentValue) {
                var _this = this;

                var tr = '<tr>\n        ' + Object.keys(currentValue).map(function (key) {
                        if (key === 'images') {

                            // debugger
                            // 使用map数据结构， 值是键，ID为要渲染的数组对象。ID放到button中的属性中去。
                            // 点击下一页，重置按钮时，相应的数据要删除，因为，dom会重新创建，要更新键值对中的值
                            // button的点击事件，通过值ID拿到要渲染的数据
                            // console.log(currentValue[key][Object.keys(currentValue[key])[0]])
                            var data = currentValue[key][Object.keys(currentValue[key])[0]];
                            var id = _this.getRandomID();

                            var oldID = _this.data2id.get(data);
                            _this.data2id.set(data, id);

                            _this.id2data.delete(oldID);
                            _this.id2data.set(id, data);

                            return '<td><button id=' + id + ' class="view-images-button" type="button">detail</button></td>';
                        } else {
                            return '<td>' + currentValue[key] + '</td>';
                        }
                    }).join('') + '\n      </tr>';
                return tr;
            }.bind(this);
            var tableTemplate = '<table class="array-table">\n      <tr>\n        ' + Object.keys(array[0]).map(function (currentValue, index, array) {
                    return '<th>' + currentValue + '</th>';
                }).join('') + '\n      </tr>\n      ' + array.map(function (currentValue) {

                    return getTR(currentValue);
                }).join('') + '\n\n    </table>';

            return $(tableTemplate);
        }
    }, {
        key: 'getImagesArrayTableDom',
        value: function getImagesArrayTableDom(array, isModel) {
            if (Object.prototype.toString.call(array) == '[object Object]') {
                array = [array];
            }
            if (array.length === 0) {
                return null;
            }
            // console.log(this);
            var urlPrefix = this.urlPrefix;
            var getTR = function getTR(currentValue) {
                var tr = '<tr>\n        ' + Object.keys(currentValue).map(function (key, index, array) {
                        if (index === 2) {
                            // console.log(isModel)
                            if (isModel === true) {
                                return '\n                <td>\n                  <img class="image" src="' + (urlPrefix + currentValue[key]) + '" />\n                </td>';
                            } else {
                                return '\n                <td>\n                  <button class="image view-image-button" src="' + (urlPrefix + currentValue[key]) + '" >view</button>\n                </td>';
                            }
                        }
                        return '<td>' + currentValue[key] + '</td>';
                    }).join('') + '\n      </tr>';
                return tr;
            };
            var tableTemplate = '<table class="array-table">\n      <tr>\n        ' + Object.keys(array[0]).map(function (currentValue, index, array) {
                    if (index === 2) {
                        return '<th>image</th>';
                    }
                    return '<th>' + currentValue + '</th>';
                }).join('') + '\n      </tr>\n      ' + array.map(function (currentValue) {
                    return getTR(currentValue);
                }).join('') + '\n    </table>';

            return $(tableTemplate);
        }
    }, {
        key: 'getFilesArrayTableDom',
        value: function getFilesArrayTableDom(array, isModel) {
            if (Object.prototype.toString.call(array) == '[object Object]') {
                array = [array];
            }
            if (array.length === 0) {
                return null;
            }
            var fileUrlIndex = null;
            for (var i = 0; i < Object.keys(array[0]).length; i++) {
                if (Object.keys(array[0])[i] == 'fileUrl') {
                    fileUrlIndex = i;
                    break;
                }
            }
            var urlPrefix = this.urlPrefix;
            console.log(123);
            console.log(this.urlPrefix);
            var getTR = function getTR(currentValue) {
                var tr = '<tr>\n        ' + Object.keys(currentValue).map(function (key, index, array) {
                        if (index === fileUrlIndex) {
                            // console.log(isModel)
                            if (isModel === true) {
                                return '\n                <td>\n                  <img class="image" src="' + (urlPrefix + currentValue[key]) + '" />\n                </td>';
                            } else {
                                return '\n                <td>\n                  <button class="image view-image-button" src="' + (urlPrefix + currentValue[key]) + '" >view</button>\n                </td>';
                            }
                        }
                        return '<td>' + currentValue[key] + '</td>';
                    }).join('') + '\n      </tr>';
                return tr;
            };
            var tableTemplate = '<table class="array-table">\n      <tr>\n        ' + Object.keys(array[0]).map(function (currentValue, index, array) {
                    if (index === 1) {
                        return '<th>' + currentValue + '</th>';
                    }
                    return '<th>' + currentValue + '</th>';
                }).join('') + '\n      </tr>\n      ' + array.map(function (currentValue) {
                    return getTR(currentValue);
                }).join('') + '\n    </table>';

            return $(tableTemplate);
        }
    }, {
        key: 'getRandomID',
        value: function getRandomID() {
            var time = String(new Date().getTime());
            var random = String(Math.random().toFixed(6)).slice(2);
            return time + random;
        }
    }]);

    return JsonContent;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonNavigation = function () {
    function JsonNavigation(json) {
        _classCallCheck(this, JsonNavigation);

        var data = null;
        if (Object.keys(json).length == 1) {
            data = json[Object.keys(json)[0]];
        } else {
            data = json;
        }
        this.render(data, $('#navigation'));
        this.bindEvent();
    }

    _createClass(JsonNavigation, [{
        key: 'render',
        value: function render(json, $container) {
            var html = '' + Object.keys(json).map(function (currentKey, index, keyArray) {
                    var key = currentKey;
                    if (key === 'array') {
                        key = Object.keys(json['array'])[0];
                    }
                    if (key === 'images') {
                        key = Object.keys(json['images'])[0];
                    }
                    if (index === 0) {
                        return '<a class="navigation-item navigation-item-selected" href="#' + key + '">' + key + '</a>';
                    } else {
                        return '<a class="navigation-item" href="#' + key + '">' + key + '</a>';
                    }
                }).join('');
            $container.append(html);
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            $('#navigation').on('click', 'a.navigation-item', function (e) {
                // console.log(e);
                $(e.currentTarget).siblings().removeClass('navigation-item-selected');
                $(e.currentTarget).addClass('navigation-item-selected');
            });
        }
    }]);

    return JsonNavigation;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonShow = function JsonShow(json, urlPrefix) {
    _classCallCheck(this, JsonShow);

    new JsonNavigation(json);
    new JsonContent(json, urlPrefix);
};


$(document).ready(function(){
    $('#navigation').css({
        left: $('.container').offset().left + 'px'
    });
    $(window).resize(function () {
        $('#navigation').css({
            left: $('.container').offset().left + 'px'
        });
    });
})
