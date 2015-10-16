$(document).ready(function(){ 
    (function ($) {
        var Item = Backbone.Model.extend({
            // item_name: null;        
            
        });    

        var Items = Backbone.Collection.extend({
            model: Item,

            initialize: function (items, options) {
            	// console.log(options);
                var view = options.view;
                //this.bind("add", view.addToDoList.bind(view));   
                this.bind("add", options.addHandler);
            }   
        });

        var AppView = Backbone.View.extend({
//            el: $("body"),
            
            initialize: function () {
                // this.items = new Items({ view: this });
                //this.items = new Items(null, {view: this});

                var item;
                var items = [];
                for (x in localStorage) {
                    //item = new Item({
                    //    id: x,
                    //    item: localStorage[x]
                    //});
                    //this.items.add(item);
                    items.push({
                        id: x,
                        item: localStorage[x]
                    });
                }
                // debugger;
                this.items = new Items(items, {addHandler: this.addToDoList.bind(this)});
                // debugger;
                items.forEach(this.renderItem);
                console.log("items", this.items);
            },
            events: {
                "click #add_list":  "addItem",
                "click .delete":  "deleteItem",                
            },
            deleteItem: function(event) {
                var $target = $(event.currentTarget);
                var $parent = $target.parent();
                var id = $parent.attr('id');

                $parent.remove();
                this.items.remove(id);
                localStorage.removeItem(id);
                console.log("deleteItem",this.items);
            },
            addItem: function () {
                var item_title = $("input[name=item_title]").val() || "";            
                var item = new Item({'item': item_title});
                // debugger            
                this.items.add(item);
                console.log("addItem",this.items);
                       
            },
            renderItem: function(attrs) {

                $("#to_do_list").append("<li style='margin-top:5px;' id='"+attrs.id+"'>Item name: <a href='./detail.html#"+attrs.id+"' class='detail'>" + attrs.item + "</a> <button class='btn delete'>Delete Item</button></li>"); 
            },
            addToDoList: function (model) {

                console.log("addToDoList model",model);         
                // _.each(model.get('item'), function(val, key) {       
                // console.log( model.get('item'));
                // console.log(model.cid);          
                debugger;
                localStorage.setItem(model.cid, model.get('item'));
                var item = model.toJSON();
                item.id = item.id || model.cid;
                this.renderItem(item);
                // });
            }            
        });
        var appview = new AppView({el: $("body")});

    })(jQuery);
}); 