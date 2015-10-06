(function ($) {
    var Item = Backbone.Model.extend({
        name: null
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
            //this.addToDoList(ItemModel);
           
        },
        addToDoList: function (model) {
            $("#to_do_list").append("<li style='margin-top:5px;'>Item name: " + model.get('item') + " <button class='btn delete'>Delete Item</button></li>");
        }
    });
    var appview = new AppView();
})(jQuery);