(function() {
var CommandChain = function() {
    var _commands = [];
    return {
        addCommand: function(command) {
            _commands.push(command);
            return this;
        },
        runCommand: function(args) {
            for (var i in _commands) {
                _commands[i].onCommand(args);
            }
        }
    };
};
 
var PageMetadata = (function() {
    return {
        onCommand: function(args) {
            console.log('Page title is set to ' + args.title);
        }
    };
}());
var PageMainNavigation = (function() {
    return {
        onCommand: function(args) {
            console.log('Menu refreshed to hihlight page ' + args.pageId);
        }
    };
}());
var PageContent = (function() {
    return {
        onCommand: function(args) {
            console.log('Article title changed to ' + args.title);
            console.log('Article content changed to ' + args.content);
        }
    };
}());
var DataAccess = (function() {
    return {
        get: function(pageId, chain) {
            // Here we request data, let's say it's done
            var data = {
                title: "In the Seven Kingdoms",
                content: "The novel begins with Lord Eddard Stark (Ned) in Winterfell, ancestral home of House Stark, a noble house of the Seven Kingdoms of Westeros and rulers of the North.",
                pageId: pageId
            };
            chain.runCommand(data);
        }
    };
}());
var PageSiblingNavigation = (function() {
    var pageId = 1;
    return {
        getNext : function() {
            var chain = new CommandChain();
            chain.addCommand(PageMetadata)
                .addCommand(PageMainNavigation)
                .addCommand(PageContent);
 
            DataAccess.get(pageId + 1, chain);
        }
    };
}());
 
/**
 * Usage
 */
PageSiblingNavigation.getNext();
 
// Output:
// Page title is set to In the Seven Kingdoms
// Menu refreshed to hihlight page 2
// Article title changed to In the Seven Kingdoms
// Article content changed to The novel begins ...
 
}());