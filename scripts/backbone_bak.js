(function ($) {
    var Item = Backbone.Model.extend({
        item_name: null
    });

    var Items = Backbone.Collection.extend({
        initialize: function (options) {
        	console.log(options);
            this.bind("add", options.view.addToDoList);            
        }
    });

    var AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            this.items = new Items({ view: this });
        },
        events: {
            "click #add_list":  "showPrompt",
            "click .delete":  "delete_li"
        },
        delete_li: function(e) {
            $(e.currentTarget).parent().remove();
        },
        showPrompt: function () {
            var item_title = $("input[name=item_title]").val() || "";            
            var item = new Item({'item': item_title});            
            this.items.add(item);                       
        },
        addToDoList: function (model) {
            console.log(model);         
            // _.each(model.get('item'), function(val, key) {       
            // console.log( model.get('item'));
            // console.log(model.cid);                
            $("#to_do_list").append("<li style='margin-top:5px;'>Item name: <a href='./detail.html#/"+model.cid+"'>" + model.get('item') + "</a> <button class='btn delete'>Delete Item</button></li>");
            // });
        }
    });
    var appview = new AppView();
})(jQuery);