(function ($) {
    Items = Backbone.Model.extend({
        item: null
    });

    Items = Backbone.Collection.extend({
        initialize: function (options) {
            this.bind("add", options.view.addToDoList);            
        }
    });

    window.AppView = Backbone.View.extend({
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
            this.items_model = new Items({'item': item_title});
            this.items.add(this.items_model);
            alert(item_title);
        },
        addToDoList: function (model) {
            $("#to_do_list").append("<li style='margin-top:5px;'>Item name: " + model.get('item') + " <button class='btn delete'>Delete Item</button></li>");
        }
    });
    var appview = new AppView;
})(jQuery);